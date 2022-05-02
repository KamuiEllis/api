const mongoose = require('mongoose');
const schema = mongoose.Schema;

const accountsSchema = new schema({
    email:String,
    password:String
})

module.exports = mongoose.model('accounts', accountsSchema)