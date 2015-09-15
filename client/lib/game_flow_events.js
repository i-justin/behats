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
  },
  'click #submit_play' : function() {
    cs=getCardSels();
    users.update(getUser()._id, {$set:{played_cards:cs}});
    Router.go('/next');
  }
});

Template.whitecard.events({
  'click #card_next' : function(e){
    cs=getCardSels();
    cptr=e.target.dataset.ptr-1;
    cs[cptr]= getNextPtr(cs[cptr], 1);
    setCardSels(cs);
  },
  'click #card_prev' : function(e){
    cs=getCardSels();
    cptr=e.target.dataset.ptr-1;
    cs[cptr]= getNextPtr(cs[cptr], -1);
    setCardSels(cs);
  }
});
