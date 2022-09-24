const mongoose = require('mongoose');

const RecentMatchesSchema =mongoose.Schema({
    serialNo:Number,
    sportType:String,
    date:String,
    winner:String,
    gender:String,
    team1:String,
    team2:String
});


module.exports = RecentMatches = mongoose.model('recentMatches',RecentMatchesSchema);