const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    firstname: String,
    lastname:String, 
    age: Number,
    DOB: String,
    email:String,
    password: String,
    address: String,
    address2:String,
    state: String,
    country: String,
    zip:String,
    city: String,
    buyUsername: String,
    buyPassword: String
})

module.exports = mongoose.model('users', userSchema)