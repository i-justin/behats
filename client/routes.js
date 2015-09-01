Router.configure ({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});


gameNext = function() {
	console.log('gn');
  if (Session.get('game_id') && !Session.get("username")) {
		  return 'newuser';
	}
	if (!Session.get("LP")) {
		   return 'lp';
	}
	return 'default';
}

Router.map(function() {
	this.route('default', { path:'/', template: 'default'});
  this.route('new', function() {
			if (!Session.get("game_id")) {
			   startGame();
			}
			this.render('newuser');
	});
  this.route('join', function() {
		if (Session.get("game_id")) {
			console.log('jredir');
			gn=gameNext();
			console.log("gn:" + gn);
			this.render(gn);
		} else {
		this.render('joingame');
	  }
	});
  this.route('rejoin', { path:'/rejoin', template: 'rejoingame'});
	this.route('next',
			 function() {
							this.render(gameNext());
			 });
});
