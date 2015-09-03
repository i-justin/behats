games = new Mongo.Collection('games');

startGame= function() {
  Uid=getUid();
  Meteor.call('newGame', Uid, function(err,response) {
  			console.log(response);
        storeGame(response);
  });
}

joinGame= function(game_code) {
  Uid=getUid();
  Meteor.call('joinGame', Uid, game_code, function(err, response) {
     console.log('jc call');
     console.log(response);
     if (response) {
         storeGame(response);
         sAlert.closeAll();
     } else {
        serror=sAlert.warning('Game not found.  Please check/re-enter', {timeout: 'none'});
     }
     return response;
  });
}

rejoinGame= function(game_code, user,pin) {
   console.log(game_code+"/"+user+"/"+pin)
   Meteor.call('reenterGame', game_code, user, pin, function(err, response) {
     console.log('resp rec');
     console.log(response);
     if (response) {
       console.log(response);
       Session.set("UID",response[0]);
       Session.set("game_id",response[1]);
       user=getUser();
       game=games.findOne();
       storeGame(game);
       return game;
     }
     else {
       serror=sAlert.warning('Game Code/ Name / PIN combination did not match', {timeout: 'none'});
     }
   });
}

storeGame = function(game) {
  console.log('store_game:'+game);
  if (game) {
    Session.set("game_id", game._id);
    Session.set("game_code", game.game_code);
    user=getUser();
    users.update(user._id,{$set:{game_id:game._id, status:'A'}});
    Session.set("username", user.name);
  }
}

getGame = function(game_id) {
  if (!game_id) {
     game_id=Session.get("game_id");
  }
  return  games.findOne(game_id);
}

gameStatus = function (game_id) {
  game=getGame(game_id);
  if (game && game.status) {
    return game.status;
  }
  else {
    return 'NOT_STARTED';
  }
}

getUsers = function() {
  return users.find().fetch();
}

getIsReadyToStart = function() {
  gid=Session.get("game_id");
  ucount=users.find({game_id:gid});
  if (ucount>2) {
     return true;
  }
}
