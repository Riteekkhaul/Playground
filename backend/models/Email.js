const mongoose = require('mongoose');

const EmailSchema =mongoose.Schema({
    email:String
});


module.exports = Email = mongoose.model('email',EmailSchema);