

Tracker.autorun(function () {
    console.log('GOT GAME_ID');
    Meteor.subscribe("theGame", Session.get('game_id'), Session.get('UID'));
    Meteor.subscribe("thePlayers", Session.get('game_id'));
});

Tracker.autorun(function () {
    Meteor.subscribe("player", Session.get('UID'));
    Meteor.subscribe("whiteCards", Session.get('UID'));
});

Tracker.autorun(function () {
  if (getUser() && getUser().cards) {
      Meteor.subscribe("whiteCards", getUser().cards);
  }
});

Meteor.subscribe('lpChoices');

Meteor.subscribe('euphemisms');

Tracker.autorun(function () {
    Meteor.subscribe('blackCard', Session.get('blackCard'));

});
