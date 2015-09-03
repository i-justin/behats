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
  console.log('DC for: '+user.name);
  if (user.cards) {
    cards=user.cards;
  }
  while (cards.length<10) {
     cards.push(nextCard(game,"white"));
  }
  users.update(user._id, {$set:{'cards':cards}});
}

// Add player's game play order

setUserOrder= function (game, user) {
  game.pointers.playorder=game.pointers.playorder++;
  updatePointers(game);
  users.update(user._id, {$set:{'order':game.pointers.playorder}});
}

startGame=function(game) {
   if (game.status='New') {
        ulist=users.find({status:'A',name: {$exists:true}},{sort: {lp:1}}).fetch();
        for (each in ulist ) {
          setUserOrder(game, ulist[each]);
          users.update(ulist[each]._id,{$set: {game_status:'A'}});
        }
        games.update(game._id,{$set:{status:'STARTED'}});
   }
   startRound(game);
}

startRound=function(game) {
   piset=false;   //player index set
   firstpi=null;  //first player pointer (used when it's time to start back at the top of the order)
   ulist=users.find({status:'A',name: {$exists:true}},{sort: {order:1}}).fetch();
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
   }
   if (!piset) {
     game.pointers.player_idx=firstpi;
   }
   game.pointers.black=nextPointer(game.pointers.black, game.black);
   updatePointers(game);
   games.update(game._id,{$set:{'played_cards':[]}});
}
