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
  if (gameStatus()=='New' && Session.get("game_id")) {
    return true;
  }
  else {
    return false;
  }
});

Template.registerHelper("game_active", function(argument){
  if (gameStatus()!='New' && Session.get("game_id")) {
    return true;
  }
  else {
    return false;
  }
});

Template.registerHelper("blackCard",function () {
  if (bcards.findOne()) {
     Session.set('2card',false);
     cardtxt=bcards.findOne().text.replace('[BLANK]','..........................');
     if (cardtxt.indexOf('[BLANK]')>0) {
       Session.set('2card',true);
       cardtxt=cardtxt.replace('[BLANK]', '...........................');
     }
     return cardtxt;
  }
});
