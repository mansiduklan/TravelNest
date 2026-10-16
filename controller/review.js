const Review = require("../model/reviews.js");
const Listing = require("../model/listing.js");


// add new review + adding inside listing.review[]
module.exports.newReview = async(req,res)=>{
    let {id} = req.params;
    let newReview = new Review(req.body.review);
    newReview.author = req.user;
    await newReview.save();

    let listing = await Listing.findById(id);
    listing.review.push(newReview);
    await listing.save();
    req.flash("success","New review is added");
    res.redirect(`/listing/${id}`);
};

// delete review + delete it from listing.review[]
module.exports.deleteReview = async(req,res)=>{
    let {id , reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id , {$pull:{review:reviewId}});
    req.flash("success","Review is deleted");
    res.redirect(`/listing/${id}`);
};