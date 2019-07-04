var express = require("express");
var router = express.Router();
var passport = require("passport")
var User = require("../models/user");

// landing page route
router.get("/", function(req, res) {
	res.render("landing");
});

// form route to register
router.get("/register", function(req, res) {
	res.render("register");
})

//handle register logic
router.post("/register", function(req, res) {
	console.log(req.body.currentUser)
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash("error", err.message);
			res.render("register");
		} else {
			passport.authenticate("local")(req, res, function() {
				req.flash("success", "Welcome to YelpCamp " + user.username);
				res.redirect("/campgrounds");
			});
		}
	});
});

// form route to login
router.get("/login", function(req, res) {
	res.render("login");
})

//handle sign in logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login",
		failureFlash: true
	}),	function(req, res) {
});

//logout route
router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "Successfully logged out");
	res.redirect("/campgrounds");
});

module.exports = router;