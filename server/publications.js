Meteor.publish('thePlayers', function(game_id){
    return users.find({"game_id":game_id},{fields:{name:1, lp:1}});
});

Meteor.publish('theGame', function(game_id){
    console.log('pub released:' + game_id);
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
