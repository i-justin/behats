Template.game.events({

  'click #new' : function(e){
  //  game=startGame();
    Router.go('new');
  },
  'click #join' : function(e){
    console.log('join');
    Router.go('/join');
  },
  'click #rejoin' : function(e){
    console.log('rejoin');
    Router.go('/rejoin');
  }
});

Template.newuser.events({
  'click #NEW' : function(e){
    console.log('NEW BTN');
    game=startGame();
    Router.go('/next');
  }

});


Template.joingame.events({
  'click #JOIN' : function(e){
    console.log('join');
    console.log($('#game_code')[0].value);
    game=joinGame($('#game_code')[0].value);
  }
});

Template.rejoingame.events({
  'click #join' : function(e){
    console.log('join');
    game=rejoinGame($('#GAME_CODE').value, $('#USER').value, $('#PIN').value);
  }
});

sessionGame = function() {
  game_id=Session.get("game_id");
  if (game_id) {
    return games.findOne({"_id":game_id});
  }
}

needsGame = function() {
  if (Session.get("game_code")) {
     return false;
  }
  else {return true;}
}



Template.game.helpers({
    getting_started: function () {
        if (!Session.get("STARTED")) {
          return true;
        }
        else {
          return false;
        }
    },
    needs_game: function() {
      return needsGame();
    }
});

Template.need_game.helpers({

})
