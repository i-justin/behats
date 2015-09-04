updatePointers=function(game) {

  games.update(game._id, {$set:{pointers:game.pointers}});
}

nextPointer=function(curpointer, array) {
  if (curpointer<array.length-1) {
    return curpointer+1;
  }
  return 0;
}


nextCard=function(game, cardType) {
  pointer=game.pointers[cardType];
  retval=game[cardType][pointer];
  game.pointers[cardType]=nextPointer(pointer, game[cardType]);
  updatePointers(game);
  return retval;
}


//Make sure that the user has 10 cards

dealCards=function(game, user) {
  cards=[];
  if (user.cards) {
    cards=user.cards;
  }
  while (cards.length<10) {
     cards.push(nextCard(game,"white"));
  }
  users.update(user._id, {$set:{'cards':cards}});
}

// Add player's game play order

setUserOrder= function (user, ptr) {
  users.update(user._id, {$set:{'order':ptr}});
}

startGame=function(game) {
   if (game.status=='New') {
        ulist=users.find({game_id:game._id,status:'A',name: {$exists:true}},{sort: {lp:1}}).fetch();
        for (each in ulist ) {
          setUserOrder(ulist[each], Number(each));
          users.update(ulist[each]._id,{$set: {game_status:'A'}});
          game.pointers.playorder=Number(each);
        }
        games.update(game._id,{$set:{status:'STARTED'}});
        updatePointers(game);
   }
   startRound(game);
}

getCzar=function(game) {
     czar=users.findOne({game_id:game._id, order:game.pointers.player_idx});
     return czar._id;
}

startRound=function(game) {
   piset=false;   //player index set
   firstpi=null;  //first player pointer (used when it's time to start back at the top of the order)
   ulist=users.find({game_id:game._id, status:'A',name: {$exists:true}},{sort: {order:1}}).fetch();
   for (each in ulist ) {
      if (!ulist[each].game_status || ulist[each.game_status]!='A') {
           users.update(ulist[each]._id,{$set: {game_status:'A'}});
      }
      dealCards(game, ulist[each]);
      if (!firstpi) {
        firstpi=ulist[each].order
      }
      if (!piset && ulist[each].order>game.pointers.player_idx){
          piset=true;
          game.pointers.player_idx=ulist[each].order;
      }
      users.update(ulist[each]._id,{$set: {played_cards:[]}});
   }
   if (!piset) {
     game.pointers.player_idx=firstpi;
   }
   game.pointers.black=nextPointer(game.pointers.black, game.black);
   updatePointers(game);
   czar=getCzar(game);
   games.update(game._id,{$set:{'played_cards':[], 'czar':czar}});
}
