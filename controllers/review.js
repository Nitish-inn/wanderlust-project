const Listing = require("../models/listing");
const Review = require("../models/review");
//post route
module.exports.createReview = async(req, res) => {
    
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save(); // to save in existing document
    req.flash("success", "New review Created");
 
    res.redirect(`/listings/${listing._id}`);
};

//delete route
module.exports.destroyReview = async(req, res) => {
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
};