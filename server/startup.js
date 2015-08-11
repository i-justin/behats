Meteor.startup(function () {
  // code to run on server at startup
  Meteor.methods (
    {
      newGame: function(leaderid) {
        return newGame(leaderid);
      },
      joinGame: function(uid, game_code) {
        return joinGame(uid, game_code);
      }
    }
  )

});
