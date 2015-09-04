Meteor.publish('thePlayers', function(game_id){
    return users.find({"game_id":game_id, status:'A', name: {$exists:true}},{fields:{name:1, lp:1,_id:1,game_id:1,played_cards:1,status:1, game_status:1}});
});

Meteor.publish('theGame', function(game_id, uid){
    return games.find({"_id":game_id});
});

Meteor.publish('player', function(user_id) {
    return users.find(user_id);
})

Meteor.publish('lpChoices', function(){
    return lpchoices.find();
});

Meteor.publish('euphemisms', function() {
    return euphemisms.find();
});

Meteor.publish('blackCard', function(card_id) {
    console.log('get card:' + card_id);
    if (card_id) {
      console.log('cid:'+card_id);
      return bcards.find(card_id);
    }
});

Meteor.publish('whiteCards', function(cards) {
    return wcards.find({_id:{$in:cards}});
});
