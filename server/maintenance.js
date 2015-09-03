idleMonitor= function() {
  usrs=users.find({status:'A'}).fetch();
  for (each in usrs) {
    if (usrs[each].idlecnt && usrs[each].idlecnt>3){
      users.update(usrs[each]._id,{$set: {idlecnt:0, status:'I'}});
    } else {
      if (!usrs[each].idlecnt) {
        users.update(usrs[each]._id,{$inc:{idlecnt:1 }});
      } else{
         users.update(usrs[each]._id,{$inc:{idlecnt:1 }})
      }
    }
  }
  console.log('I');
};
