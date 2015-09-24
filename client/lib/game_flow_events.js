Template.gameflow.events({
  'click #sub_play' : function() {
    console.log('sub');
    Router.go('/new');
    console.log('sub');
    cs=getCardSels();
    user=getUser();
    submit_cards=[user.cards[cs[0]], user.cards[cs[1]]];
    users.update(getUser()._id, {$set:{played_cards:submit_cards}});
    Meteor.defer(function() { Router.go('wait'); })
//    console.log('going to wait');
//    Router.go('/new');
    console.log('wait done.');
  }
});

Template.whitecard.events({
  'click .card_next' : function(e){
    cs=getCardSels();
    cptr=e.target.dataset.ptr-1;
    cs[cptr]= getNextPtr(cs[cptr], 1);
    setCardSels(cs);
  },
  'click .card_prev' : function(e){
    cs=getCardSels();
    cptr=e.target.dataset.ptr-1;
    cs[cptr]= getNextPtr(cs[cptr], -1);
    setCardSels(cs);
  }
});
