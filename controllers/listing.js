const Listing = require("../models/listing");
const maptilerClient = require('@maptiler/client');
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

//index route
module.exports.index = async (req,res) => {
    const allListings = await Listing.find({}); // Fetch all listings from the database
    res.render("listings/index.ejs", {allListings}); // Render the EJS template and pass the 
};
//new route
module.exports.renderNewForm =  (req,res) => {
    res.render("listings/new.ejs");
};
//show
module.exports.showListing =async (req,res) => {
    const {id} = req.params; // Extract the listing ID from the URL parameters   
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author",
        }
        })
        .populate("owner");
    if(!listing) {
        req.flash("error","listing you requested for does not exist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}; 
//create
module.exports.createListing = async (req, res,next) => {
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url,filename};
        
            // ✅ geocode the location
        const geoData = await maptilerClient.geocoding.forward(newListing.location, { limit: 1 });
        newListing.geometry = geoData.features[0].geometry;
        await newListing.save();
        req.flash("success","New Listing Created");
        res.redirect("/listings");
};
//edit
module.exports.renderEditform = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error","listing you requested for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing });
};
//update
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    // update all fields except image
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;

    // only update image if a new file was uploaded
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};
//delete
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","listing deleted");
    res.redirect("/listings");
};