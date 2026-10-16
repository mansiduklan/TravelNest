const User = require("../model/user.js");

module.exports.signUpForm = (req,res)=>{
    res.render("user/signUp.ejs");
};

module.exports.signUp = async(req,res,next)=>{
    try {
        let {username, email, password} = req.body;
        let newUser = new User({email, username});
        let registerUser = await User.register(newUser,password);
        req.login(registerUser,(err)=>{  
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to TravelNest");
            res.redirect("/listing");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signUp");
    }
};

module.exports.loginForm = (req,res)=>{
    res.render("user/login.ejs");
};

module.exports.login = async(req,res)=>{
        const redirectUrl = res.locals.newUrl || "/listing";
        console.log(redirectUrl);
        req.flash("success","Welcome back to TravelNest");
        res.redirect(redirectUrl);
};

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){ 
            return next(err);
        }
        req.flash("success","Logout Successfully");
        res.redirect("/listing");
    });
};
