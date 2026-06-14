const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

const Listing = require("../models/listing");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js")

//Post review route
router.post("/", validateReview,isLoggedIn, wrapAsync(reviewController.createReview)
);


//delete route for reviews
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports = router;