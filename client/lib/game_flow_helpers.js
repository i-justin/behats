


Template.gameflow.helpers({
  cardCzar: function () {
    game=getGame();
    if (game && game.czar) {
       Session.set("blackCard", getBlackCard());
       if (game.czar==getUid()) {
         return "You are the Card Czar";
       }
       else {
         user=users.findOne(game.czar);
         if (user) {
            return user.name+" is the Card Czar."
         }
       }
    }
  },
  isCzar: function () {
    game=getGame();
    if (game && game.czar) {
       if (game.czar==getUid())  {
         return true;
       }
    }
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
     gid=getGid();
     uid=getUid();
     return users.find({game_id:gid, status:'A', game_status:'A',played_cards: {$size:0}, _id:{$ne:uid} }).fetch().length;
  },
  is2Cards: function() {
      return Session.get('2card');
  }


});
getCardText = function(cardidx) {
   user=getUser();
   if (user) {
     console.log('cardidx'+cardidx);
     card_id=user.cards[cardidx];
     card=wcards.findOne(card_id);
     return card.text;
  }
}

getNextPtr= function(idx) {
   if (idx>9) {
     idx=0;
   }
   else {
     idx=idx+1;
   }
   return idx;
}
getCardSels = function() {
  cardsels=Session.get("CARDSELS");
  if (!cardsels) {
    cardsels=[0,1];
  }
  return cardsels;
}

Template.whitecard.helpers({
  cardText: function(number) {
    cardsels=getCardSels();
    cardidx=cardsels[number-1];
    return getCardText(cardidx);
  }
})
