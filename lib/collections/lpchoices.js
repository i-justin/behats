lpchoices = new Mongo.Collection('lpchoices');

lpText = function(lp) {
  lpn=Number(lp);
  lpval=lpchoices.findOne({value: lpn});
  if (lpval) {
    return lpval.text;
  }
  else {
    return 'waiting for response...';
  }
}
