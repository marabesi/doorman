Router.configure({
    layoutTemplate: 'MainLayout'
});

Router.onBeforeAction(function() {
    if (!Meteor.user()) {
        this.redirect('login');
    } else {
        this.redirect('door');
    }

    this.next();
}, {
    expected: ['login']
});

Router.route('/', function() {
    this.render('Login', { to: 'content'});
    this.render('LoginTitle', { to: 'title'});
    this.render('LoginFooter', { to: 'footer'});
}, {
    name: 'login'
});

Router.route('/door', function() {
    this.render('Door', { to: 'content' });
    this.render('DoorTitle', { to: 'title' });
    this.render('DoorFooter', { to: 'footer' });
}, {
    name: 'door'
});


