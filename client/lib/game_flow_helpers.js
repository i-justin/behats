Template.gameflow.helpers({
  cardCzar: function () {
    game=getGame();
    if (game.czar) {
       Session.set("blackCard", getBlackCard());
       if (game.czar==getUid()) {
         return "You are the Card Czar";
       }
       else {
         user=users.findOne(game.czar);
         if (user) {
            return user.name+" is Card Czar."
         }
       }
    }
  },
  isCzar: function () {
    game=getGame();
    if (game.czar) {
       if (game.czar==getUid())  {
         return true;
       }
    }
  },
  blackCard: function () {
    if (bcards.findOne()) {
       return bcards.findOne().text.replace('[BLANK]','..........................');
    }
  }


});
