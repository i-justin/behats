getCardText = function(cardidx) {
   user=getUser();
   if (user) {
     card_id=user.cards[cardidx];
     card=wcards.findOne(card_id);
     if (card && card.text) {
       card.text=card.text.replace('&#8482;','&#174;');
     }
     return new Handlebars.SafeString(card.text);

  }
}

getNextPtr= function(idx, incr) {
   idx=idx+incr;
   if (idx>9) {
     idx=0;
   }
   else {
     if (idx<0) {
       idx=9;
     }
   }
   return Number(idx);
}

getCardSels = function() {
  cardsels=Session.get("CARDSELS");
  if (!cardsels) {
    cardsels=[0,1];
    Session.set("CARDSELS", cardsels);
  }
  return cardsels;
}

setCardSels = function(cs) {
  Session.set("CARDSELS", cs);
}

preventDuplicate = function(changed) {
  cs=getCardSels();
  if (cs[0] == cs[1]) {
    not_changed=0;
    if (changed==0) {
      not_changed=1;
    }
    cs=getCardSels();
    cs[not_changed]=getNextPtr(cs[not_changed],1);
    setCardSels(cs);
  }
}
