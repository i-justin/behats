users = new Mongo.Collection('users');

getUid= function() {
  UID=Session.get("UID")
  if (! UID) {
    UID=users.insert({});
    Session.set("UID", UID);
    user=users.findOne(UID);
    Session.set("user",user);
  }
    return UID;
}


getUser = function() {
  UID=getUid();
  user=users.findOne(UID);
  return getUser();
}


userisComplete= function() {
  user=users.findOne(getUid());
  if (!user.name || !user.PIN) {
    return false;
  }
  return true
}

getUser = function() {
  UID=getUid();
  if (UID) {
    return users.findOne(UID);
  }
}
