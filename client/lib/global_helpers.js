Template.registerHelper("game_code", function () {
     sg=sessionGame();
     if (sg) {
        return sg.game_code;
     }
});

Template.registerHelper("lpchoices", function (selected) {
  options= lpchoices.find({sort:{value:1}}).fetch();
  retstr='<option></option> ';
  for (each in options) {
     retstr=retstr+"<option";
     if (options[each].text==selected) {
       retstr=retstr+" selected";
     }
     retstr=retstr+">"+options[each].text+"</option>";
  }
  return new Handlebars.SafeString(retstr);
})
