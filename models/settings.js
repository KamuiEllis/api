const mongoose = require('mongoose');
const schema = mongoose.Schema;

const settingsSchema = new schema({
    amount: Number,
    address: String,
    address2:String,
    state: String,
    country: String,
    zip:String,
    city: String,
    bought: String,
    status: String
})

module.exports = mongoose.model('settings', settingsSchema)