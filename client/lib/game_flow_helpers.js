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
       return bcards.findOne().text.replace('[BLANK]','..........................');
    }
  },
  waiting_count: function() {
     gid=getGid();
     uid=getUid();
     return users.find({game_id:gid, status:'A', game_status:'A',played_cards: {$size:0}, _id:{$ne:uid} }).fetch().length;
  },
  whiteCard: function() {

  }


});
