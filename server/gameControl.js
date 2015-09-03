shuffle = function (array) {
   var currentIndex = array.length, temporaryValue, randomIndex ;
   // While there remain elements to shuffle...
   while (0 !== currentIndex) {
     // Pick a remaining element...
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
     // And swap it with the current element.
     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
   }
   return array;
}

getNewWhite = function() {
   allcards=wcards.find().fetch();
   cardids=[]
   for (each in allcards) {
      cardids.push(allcards[each]._id);
   }
   cardids=shuffle(cardids);
  // console.log(cardids);
   return cardids;
}

getNewBlack = function() {
   allcards=bcards.find().fetch();
   cardids=[]
   for (each in allcards) {
      cardids.push(allcards[each]._id);
   }
   cardids=shuffle(cardids);
  // console.log(cardids);
   return cardids;
}

newCode= function() {
   cvs=['A','Y','W','Q','R','U','2','3','4','5','6','7','8','9'];
   cdstr='';
   len=cvs.length;
   for (i=0; cdstr.length<5; i++) {
     newchar=cvs[Math.round(Math.random()*len-1)];
     if (newchar) {
        cdstr=cdstr+newchar;
     }
   }
   return cdstr;
}

set_game_user_status= function(game_id, user_id, status) {
  uuid='users.'+user_id;
  hsh={};
  hsh[uuid]=status;
  games.update({_id:game_id}, {$set:hsh});
}

newGame= function (leaderid) {
  white=getNewWhite();
  black=getNewBlack();
  code=newCode();
  exists=games.findOne({"game_code":code});
  while (exists) {
    code=newCode();
    exists=games.findOne({"code":code});
  }
  game=games.insert({"black":black, "white":white, "leader_id":leaderid,"game_code":newCode(),"leader_id":leaderid,"code":code,"status": 'New',pointers:{black:-1,white:-1,player_idx:0,playorder:0}});
  set_game_user_status(game._id, leaderid,'A');
  console.log('GC');
  return games.findOne({"_id":game});
}

joinGame=function(uid,game_code) {
   game_code=game_code.toUpperCase();
   game=games.findOne({"game_code":game_code});
   //console.log(game);
   if (game) {
      if (game._id) {
        set_game_user_status(game._id, uid,'I')
      }
      users.update({_id:uid},{$set:{game_id:game._id, status:"A"}});
      set_game_user_status(game._id, uid,'A');
      return game;
   }
}

reenterGame=function(game_code, name,pin) {
  gc=game_code.toUpperCase();
  game=games.findOne({'game_code':gc});
  if (game) {
      user=users.findOne({"name": name,"pin":pin, "game_id":game._id });
      if (user) {
         users.update(user._id,{$set: {status:'A'}});
         return [user._id,game._id];
      }
  }
}


updatePointers=function(game) {
  games.update(game._id, {$set:{pointers:game.pointers}});
}

nextPointer=function(curpointer, array) {
  if (curpointer<array.length-1) {
    return curpointer+1;
  }
  return 0;
}


nextCard=function(game, cardType) {
  pointer=game.pointers[cardType];
  retval=game[cardType][pointer];
  game.pointers[cardType]=nextPointer(pointer, game[cardType]);
  updatePointers(game);
  return retval;
}


//Make sure that the user has 10 cards

dealCards=function(game, user) {
  cards=[];
  if (user.cards) {
    cards=user.cards;
  }
  while (cards.length<10) {
     cards.push(nextCard(game,"white"));
  }
  users.update(user._id, {$set:{'cards':cards}});
}

// Add player's game play order

setUserOrder= function (game, user) {
  game.pointers.playorder=game.pointers.playorder++;
  updatePointers(game);
  users.update(user._id, {$set:{'order':playorder}});
}

startGame=function(game) {
   if (game.status='New') {
        ulist=users.find({status:'A',name: {$exists:true}},{sort: {lp:1}}).fetch();
        for (each in ulist ) {
          setUserOrder(game, ulist[each]);
          users.update(ulist[each]._id,{$set: {game_status:'A'}});
        }
        games.update(game._id,{$set:{status:'STARTED'}});
   }
}

startRound=function(game) {
   piset=false;   //player index set
   firstpi=null;  //first player pointer (used when it's time to start back at the top of the order)
   ulist=users.find({status:'A',name: {$exists:true}},{sort: {order:1}}).fetch();
   for (each in ulist ) {
      if (!ulist[each].game_status || ulist[each.game_status]!='A') {
           users.update(ulist[each]._id,{$set: {game_status:'A'}});
      }
      dealCards(game, ulist[each]);
      if (!firstpi) {
        firstpi=ulist[each].order
      }
      if (!piset && ulist[each].order>game.pointers.player_idx){
          piset=true;
          game.pointers.player_idx=ulist[each].order;
      }
   }
   if (!piset) {
     game.pointers.player_idx=firstpi;
   }
   game.pointers.black=nextPointer(game.pointers.black, game.black);
   updatePointers(game);
}
