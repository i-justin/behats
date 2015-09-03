Template.registerHelper("game_code", function () {
     sg=sessionGame();
     if (sg) {
        return sg.game_code;
     }
});

Template.registerHelper("lpchoices", function (selected) {
  options= lpchoices.find({},{sort:{"value":1}}).fetch();
  retstr='<option></option> ';
  for (each in options) {
     retstr=retstr+"<option value='"+options[each].value+"' '";
     if (options[each].text==selected) {
       retstr=retstr+" selected";
     }
     retstr=retstr+">"+options[each].text+"</option>";
  }
  return new Handlebars.SafeString(retstr);
})

Template.registerHelper("getting_started", function(argument){
  if (gameStatus()=='NOT_STARTED' && Session.get("game_id")) {
    return true;
  }
  else {
    return false;
  }
});
