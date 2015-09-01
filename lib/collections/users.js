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
  return user;
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

setNamePin= function(name,pin) {
  user=getUser();
  user["name"]=name;
  user["pin"]=pin;
  Session.set("username",name);
  users.update(user._id,{$set:user});
  game=sessionGame();
  if (sessionGame) {
     u=game.users;
     if (!u) {
       u={};
     }
     u[user._id]=user;
     games.update(game._id,{$set:{users:u}})
  }

}
