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
  game=games.insert({"black":black, "white":white, "leader_id":leaderid,"game_code":newCode(),"leader_id":leaderid,"code":code,"active": 'Y'});
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
