Meteor.publish('thePlayers', function(game_id){
    return users.find({"game_id":game_id, status:'A', name: {$exists:true}},{fields:{name:1, lp:1}});
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
