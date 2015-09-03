
sessionGame = function() {
  game_id=Session.get("game_id");
  if (game_id) {
    return games.findOne({"_id":game_id});
  }
}

needsGame = function() {
  if (getGame()) {
     return false;
  }
  else {return true;}
}



Template.game.helpers({
    needs_game: function() {
      return needsGame();
    },
    gameUsers: function() {
      return sessionGame().users.values;
    }
});

Template.need_game.helpers({

});

Template.preStart.helpers({
  gameUsers: function () {
    return getUsers();
  },
  lptext: function (lp) {
    console.log('lp:'+lp);
    return lpText(lp);
  },
  showStart: function() {
    if (isGameReadyToStart()) {
      if (getGame().leader_id==getUid()) {
         return 'Y';
      }
    }
  }

});
