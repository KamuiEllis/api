const mongoose = require('mongoose');
const schema = mongoose.Schema;

const botsSchema = new schema({
    name: String,
    link:String, 
    amount: Number,
    bought: String,
    status: String,
    account: String
})

module.exports = mongoose.model('bots', botsSchema)