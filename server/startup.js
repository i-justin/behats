Meteor.startup(function () {
  // code to run on server at startup
  Meteor.methods (
    {
      newGame: function(leaderid) {
        return newGame(leaderid);
      },
      joinGame: function(uid, game_code) {
        console.log(game_code);
        return joinGame(uid, game_code);
      },
      reenterGame: function(game_code, user, pin) {
        console.log('guidfl');
        return reenterGame(game_code, user, pin)
      }

    }
  );

  Meteor.setInterval( idleMonitor,30000);


});
