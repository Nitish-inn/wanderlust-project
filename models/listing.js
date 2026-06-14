const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require('joi');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    // image: {
    //     type: String,
     //default: "https://unsplash.com/photos/brown-wooden-folding-chairs-near-swimming-pool-during-daytime-UPolqOrkbno",
    //     set: (v)  =>
    //     v === ""
    //     ? "https://unsplash.com/photos/brown-wooden-folding-chairs-near-swimming-pool-during-daytime-UPolqOrkbno" 
    //     : v,
    // },
    image: {

        filename: String,
        url: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
     {
        type: Schema.Types.ObjectId,
        ref: "Review",
     },
    ],   
    owner: {
    type: Schema.Types.ObjectId,  // Reference to User model
    ref: 'User',                   // Name of the model to reference
    required: true,                // Make it required
    },
    geometry: {                    // ✅ INSIDE the Schema, after owner
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    }
});

//middileware to delete listing 
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }

});


const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;