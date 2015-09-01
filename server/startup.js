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
      getUsers: function(game_id) {
        return svrgetUsers(game_id);
      }

    }
  );


});
