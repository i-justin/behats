


Meteor.startup(function () {
  // code to run on server at startup
  Meteor.methods (
    {
      newGame: function(leaderid) {
        return newGame(leaderid);
      },
      joinGame: function(uid, game_code) {
        return joinGame(uid, game_code);
      },
      reenterGame: function(game_code, user, pin) {
        return reenterGame(game_code, user, pin)
      },
      startGame: function(game_id) {
        game=games.findOne(game_id);
        startGame(game);
      }
    }
  );

  Meteor.setInterval( idleMonitor,30000);


});
