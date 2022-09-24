const mongoose = require('mongoose');

const AllMatchesSchema =mongoose.Schema({
    serialNo:Number,
    team1:String,
    team2:String,
    time:String,
    date:String
});


module.exports = AllMatches = mongoose.model('allMatches',AllMatchesSchema);