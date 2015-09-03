Template.monitor.helpers({
    ucheck: function() {
       u=getUser();
       if (u && u.idlecnt>3) {
           users.update(Session.get("UID"), {$set: {idlecnt:0,status:'A'}});
      }
    }
});
