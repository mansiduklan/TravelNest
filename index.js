if(process.env.NODE_ENV != "production"){  
    require('dotenv').config();
}

const express = require("express");
const app = express();
const path  = require("path");
const methodOverride  = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressErr = require("./utils/ExpressErr.js");
const session = require("express-session");
// const MongoStore = require("connect-mongo");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user.js");

const listings = require("./routes/listingRoute.js");
const reviews = require("./routes/reviewRoute.js");
const users = require("./routes/userRoute.js");

app.engine("ejs",ejsMate); 

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on( "error",(err)=>{
    console.log("Error in Mongo Session Store", err);
    
}); 

const sessionOptions = {
    store: store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    },
};
app.use( session(sessionOptions) );
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const db_url = process.env.ATLASDB_URL;
main()
.then(()=>console.log("connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(db_url);
}

app.use((req,res,next)=>{
    console.log("REQUEST:", req.method, req.originalUrl);
    res.locals.message = req.flash("success");
    res.locals.errmessage = req.flash("error");
    res.locals.currUser = req.user;
    console.log("locals:", res.locals);
    next();
});

// access the listing route
app.use("/listing", listings);

// access the review route
app.use("/listing/:id/review", reviews);

// access the user route
app.use("/", users );

app.all("*splat",(req,res,next)=>{
    next(new ExpressErr(404,"Page not found"));
});

app.use((err,req,res,next)=>{
    let {status = 500 , message = "something went wrong"} = err;
    res.status(status).render("error.ejs",{message});
});

app.listen(8080,()=>{
    console.log("listening!!");
});
