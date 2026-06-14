const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});
userSchema.plugin(passportLocalMongoose); //it will automatic create hashing,username, password
module.exports = mongoose.model('User', userSchema);