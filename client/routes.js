Router.configure ({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});


startGameNext = function() {
  return null;
}

Router.map(function() {
	this.route('default', { path:'/', template: 'default'});
  this.route('new', { path:'/new', template: 'newuser'});
  this.route('join', { path:'/join', template: 'joingame'});
  this.route('rejoin', { path:'/rejoin', template: 'rejoingame'});
	this.route('next',
			 function() {
					 stext=Session.get('searchtxt');
					 res=doSearch(stext);
					 if (res.result=='both') {
							this.render('search');
					 }
					if (res.result=='niether') {
							this.render('nothing_found');
					}
					 if (res.result=='asset_single') {
							Router.go('/asset/'+res.id);
					 }
					if (res.result=='room_single') {
							Router.go('/room/'+res.id);
					}

			 });
});
