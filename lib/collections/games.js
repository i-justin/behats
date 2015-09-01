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
        Session("errorgnf",serror);
     }
     return response;
  });
}

rejoinGame= function(game_code, user, pin) {
  Uid=getUid();
  Meteor.call('rejoinGame', [game_code,user,pin], function(err, response) {
     storeGame(response);
  });
}

storeGame = function(game) {
  console.log(game);
  if (game) {
    Session.set("game_id", game._id);
    Session.set("game_code", game.game_code);
    user=getUser();
    users.update(user._id,{$set:{game_id:game._id}});
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
  if (game.status) {
    return game.status;
  }
  else {
    return 'NOT_STARTED';
  }
}

getUsers = function() {
  return users.find().fetch();
}
