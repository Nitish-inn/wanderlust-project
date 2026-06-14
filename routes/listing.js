const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const ListingController =require('../controllers/listing.js');
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
//index n create route
router.route("/")
.get(wrapAsync(ListingController.index))
.post(isLoggedIn,validateListing,upload.single('listing[image]'),
    wrapAsync(ListingController.createListing));
// .post(upload.single('listing[image]'),(req,res) => {
//     res.send(req.file);
// });

//new route
router.get("/new", isLoggedIn,ListingController.renderNewForm );


//show route n update route n delete route
router.route("/:id")
.get(wrapAsync(ListingController.showListing))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing,
    wrapAsync(ListingController.updateListing)
).delete(
    isLoggedIn,
    isOwner,
    wrapAsync(ListingController.destroyListing)
);
//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.renderEditform));

module.exports = router;