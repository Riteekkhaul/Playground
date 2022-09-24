const mongoose = require('mongoose');

const ScoreSchema =mongoose.Schema({
    serialNo:Number,
    run: Number,
    vicket :Number,
    overs:Number,
    crr:Number,
    isLive:Boolean,
    player1:String,
    player2:String,
    bowler:String,
    team1:String,
    team2:String
});


module.exports = Score = mongoose.model('score',ScoreSchema);