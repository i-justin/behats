Template.gameflow.events({
  'click #new' : function(e){
    Router.go('new');
  },
  'click #join' : function(e){
    Session.set("game_id",null);
    Session.set("game_code",null);
    console.log('join');
    Router.go('/join');
  },
  'click #rejoin' : function(e){
    console.log('rejoin');
    Router.go('/rejoin');
  }
});
