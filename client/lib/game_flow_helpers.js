
playersWaitingFor = function () {
  gid=getGid();
  uid=getGameCzar.uid;
  return users.find({game_id:gid, status:'A', game_status:'A',played_cards: {$size:0}, _id:{$ne:uid} }).fetch();
}


Template.gameflow.helpers({
  cardCzar: function () {
    gameCzar=getGameCzar();
    if (gameCzar && gameCzar.uid==getUid()) {
       return "You are the Card Czar";
    }
    else {
       return gameCzar.name + ' is Card Czar';
    }
  },
  isCzar: function () {
    gameCzar=getGameCzar();
    if (gameCzar && gameCzar.uid==getUid()) {
       return true;
    }
    return false;
  },
  blackCard: function () {
    if (bcards.findOne()) {
       Session.set('2card',false);
       cardtxt=bcards.findOne().text.replace('[BLANK]','..........................');
       if (cardtxt.indexOf('[BLANK]')>0) {
         Session.set('2card',true);
         cardtxt=cardtxt.replace('[BLANK]', '...........................');
       }
       return cardtxt;
    }
  },
  waiting_count: function() {
     return playersWaitingFor().length;
  },
  readyForCzar: function () {
     if (playersWaitingFor().length==0) {
       return true;
     }
     return false;
  },
  is2Cards: function() {
      return Session.get('2card');
  },
  cards_duplicate: function() {
    if (Session.get('2card')) {
      cs=getCardSels();
      if (cs[0]==cs[1]) {
        return true;
      }
    }
  }


});

Template.game_flow_waiting.helpers ({
  'waitingOnUsers': function() {
     console.log('wou');
     return playersWaitingFor();
  }
});

Template.whitecard.helpers({
  cardText: function(number) {
    cardsels=getCardSels();
    cardidx=cardsels[number-1];
    return getCardText(cardidx);
  }
});


Template.gameflow.helpers({
   waitingOnUsers: function() {
     return playersWaitingFor();
   }
});
