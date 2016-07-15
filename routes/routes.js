// app/routes.js

module.exports = function (app, passport) {

    // route for home page
    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function (req, res) {
        app.locals.user = req.user;
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/site', isLoggedIn, function (req, res) {
        res.render('site.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/site/blog', isLoggedIn, function (req, res) {
        res.render('blog.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/site/about', isLoggedIn, function (req, res) {
        res.render('about.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/site/contact', isLoggedIn, function (req, res) {
        res.render('contact.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/site/login', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/dashboards', isLoggedIn, function (req, res) {
        console.log(req.user, 'user session');
        res.render('dashboards.ejs', {
            user: req.user
        });
    })

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/site',
            failureRedirect: '/'
        }));

    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
}