const express = require("express");
const router = express.Router({mergeParams:true});
const {isLogin , isAuthor} = require("../middleware.js");
const reviewController = require("../controller/review.js");

// add new review + adding inside listing.review[]
router.post("/",isLogin, reviewController.newReview );

// delete review + delete it from listing.review[]
router.delete("/:reviewId", isLogin, isAuthor, reviewController.deleteReview);

module.exports = router;
