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
  games.update({_id:game_id}, {$set:{uuid:status}});
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
  game=games.insert({"black":black, "white":white, "leader_id":leaderid,"game_code":newCode(),"leader_id":leaderid,"code":code});
  set_game_user_status(game._id, leaderid,'A');
  console.log('GC');

  //return game;
  return games.findOne({"_id":game});
}

joinGame=function(values) {
   uid=values[0];
   game_code=values[1];
   game=games.findOne({"game_code":game_code});
   if (game) {
      user=getUser();
      users.update()
      if (user.game_id) {
        set_game_user_status(game_id, user._id,'I')
      }
      users.update({_id:user._id},{$set:{game_id:game._id}});
      set_game_user_status(game._id, user._id,'A');
      return game;
   }
}

rejoinGame=function(values) {
  game_code=values[0];
  name=values[1];
  pin=values[2];
  game=games.findOne({"game_code":game_code});
  if (game.users) {
     for (each in game.users) {
       user=users.findOne(game.users.each);
       if (user) {
         if (user.name==name) {
             if (!user.pin || user.pin==pin ) {
               Session.set("UID",user._id);
               return game;
             }
         }
       }
     }
  }
}
