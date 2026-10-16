const Listing = require("./model/listing.js");
const Review = require("./model/reviews.js");
const {listingSchema} = require("./schemaJoi.js");

// to check if user is already login 
module.exports.isLogin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.newUrl = req.originalUrl;  
        req.flash("error","Access Denied, please login");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.newUrl) {
    res.locals.newUrl = req.session.newUrl; 
    }
    next();
};

// to check if user is owner of listing
module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    if(!list.owner.equals(res.locals.currUser._id)){
        req.flash("error","Failed, You are not the owner of listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
};

// to check if user is owner of review
module.exports.isAuthor = async(req,res,next)=>{
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","Failed, You are not the owner of review");
        return res.redirect(`/listing/${id}`);
    }
    next();
};

// joi schema validator middleware
module.exports.validateResData = (req,res,next)=>{
        let {error} = listingSchema.validate(req.body); // return a obj
        if(error){
            throw new ExpressErr(400, error);
        }else{
            next();
        }
}