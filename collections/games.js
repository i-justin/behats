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
  Meteor.call('joinGame', [Uid, game_code], function(err, response) {
     storeGame(response);
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
  }
}
