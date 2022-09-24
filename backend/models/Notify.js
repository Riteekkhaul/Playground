const mongoose = require('mongoose');

const NotifySchema =mongoose.Schema({
    notification:String
});

module.exports = Notify = mongoose.model('notify',NotifySchema);

