Template.game.events({
  'click #new' : function(e){
    Router.go('new');
  },
  'click #join' : function(e){
    Session.set("game_id",null);
    Session.set("game_code",null);
    console.log('join');
    Router.go('/join');
  },
  'click #rejoin' : function(e){
    console.log('rejoin');
    Router.go('/rejoin');
  }
});

Template.newuser.events({
  'click #next' : function(e){
    console.log('NEW BTN');
    valid=true;
    error='';
    if (!$('#USER')[0].value) {
      alert('Please enter Name/Alias');
      valid=false;
    }
    else {
      if (!$('#PIN')[0].value ){
       if (!confirm('You are about to proceed without setting a PIN. \nDoing so makes your gameplay accessible to anyone. \n\nProceed? ')){
         valid=false;
       }
      }
      if (valid && $('#PIN')[0].value!=$('#REPIN')[0].value) {
        alert('PIN and RE-enter PIN must match');
        valid=false;
      }
    }
    if (valid) {
       setNamePin($('#USER')[0].value,$('#PIN')[0].value);
       Router.go('/next');
       this.next;
    }
  }

});

Template.lp.events( {
  'click #next' : function(e){
      user=getUser();
      lpval=$('#LP')[0].value;
      users.update(user._id,{$set: {lp:lpval}});
      Session.set("LP",lpval);
      console.log('lp received');
      Router.go('/next');
  },
  'click #what' : function() {
      console.log('what?');
      euph=getEuphemism();
      if (!euph) {
        euph='excrete fecal matter';
          $('#lphelp')[0].innerHTML='';
      }
      $('#query')[0].innerHTML='When did you last <br>' + euph+'?';
  }
});


Template.joingame.events({
  'click #JOIN' : function(e){
    console.log($('#game_code')[0].value);
    gc=$('#game_code')[0].value.toUpperCase();
    joinGame($('#game_code')[0].value);
  }
});

Template.rejoingame.events({
  'click #JOIN' : function(e){
    Session.set("game_id",null);
    game=rejoinGame($('#game_code')[0].value, $('#lg_username')[0].value, $('#lg_password')[0].value);
  }
});

Template.preStart.events ( {
  'click start' : function(e) {
    startGame();
  }
});
