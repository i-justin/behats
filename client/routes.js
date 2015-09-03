Router.configure ({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});


gameNext = function() {
	console.log('gn');
  if (Session.get('game_id') && getUser() && !getUser().name) {
		  return 'newuser';
	}
	if (getUser() && !getUser().lp) {
		   return 'lp';
	}
	if (getGame() && getGame().status!="New") {
		   return 'gameflow';
	}
	return 'default';
}

Router.map(function() {
	this.route('default', { path:'/', template: 'default'});
  this.route('new', function() {
			if (!Session.get("game_id")) {
			   createGame();
			}
			this.render('newuser');
	});
  this.route('join', function() {
		if (Session.get("game_id")) {
			gn=gameNext();
			console.log("gn:" + gn);
			this.render(gn);
		} else {
		this.render('joingame');
	  }
	});
  this.route('rejoin', function() {
		if (Session.get("game_id")) {
			gn=gameNext();

			this.render(gn);
		}
		else {
		this.render('rejoingame');}
	});
	this.route('next',
			 function() {
							this.render(gameNext());
			 });
	this.route('start',
	    function() {
				  console.log('start');
				  startGame();
					this.render('gameflow');
			});
});
