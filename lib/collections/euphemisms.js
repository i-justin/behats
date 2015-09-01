euphemisms = new Mongo.Collection('euphemisms');


getEuphemism= function() {
    len=euphemisms.find().fetch().length;
    already=Session.get('aa');   //already asked
    if (!already) {
      already=[];
    }
    var query;
    cnt=0
    while ((!query || already.length<len-5) && cnt<50) {
      cnt++;
      keyval=Math.round(Math.random()*len-1);
      //console.log(keyval);
    //  console.log(already);
      query=euphemisms.findOne({$and: [{"value":keyval}, {"value":{$nin:already}}]});
      if (query) {
        already.push(query.value);
        Session.set('aa',already);
        return query.text;
      }
    }
}
