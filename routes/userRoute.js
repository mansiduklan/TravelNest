const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../model/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controller/user.js");

router.route("/signUp")
.get( userController.signUpForm)
.post( userController.signUp);

router.route("/login")
.get(userController.loginForm)
.post( saveRedirectUrl, passport.authenticate("local",{failureRedirect:"/login", failureFlash:true }), userController.login);

router.get("/logout",userController.logout);

module.exports = router;
