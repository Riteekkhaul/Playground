const express =require('express');
const Score =require("../models/ScoreModel");
const AllMatches=require('../models/AllMatchesModel');
const User = require("../models/UserModel");
const RecentMatches =require('../models/RecentMatchesModal');
const { plugin } = require('mongoose');
const router = express.Router();
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const Email =require('../models/Email');
const Notify =require('../models/Notify');

//AuthRoutes 

const JWTKEY="akhfkafhahrwt313131df";

router.post('/auth/register',async (req, res) => {

   console.log(req.body.userData);
  
   try {

   const salt = await bcrypt.genSalt(10);
   const hashedPass = await bcrypt.hash(req.body.userData.password, salt);
   req.body.userData.password = hashedPass
   const newUser = new User(req.body.userData);

   //  // addition new
   //   const oldUser = await UserModel.findOne({ email });
 
   //    if (oldUser)
   //      return res.status(400).json({ message: "User already exists" });
 
      // changed
      const user = await newUser.save();
      // const token = jwt.sign(
      //   { email: user.email, id: user._id },
      //   process.env.JWTKEY,
      //   { expiresIn: "3h" }
      // );
      res.status(200).json({ user });
   } catch (error) {
   res.status(500).json({ message: error.message });
 }
 } )


router.post('/auth/login',async (req, res) => {
   const { email, password } = req.body.userData;
 
   try {
     const user = await User.findOne({ email: email });
 
     if (user) {
       const validity = await bcrypt.compare(password, user.password);
 
       if (!validity) {
         res.status(400).json("wrong password");
       } else {
         const token = jwt.sign(
           { email: user.email, id: user._id },
           JWTKEY, //process.env.JWTKEY
           { expiresIn: "3h" }
         );
         res.status(200).json({ user, token });
       }
     } else {
       res.status(404).json("User not found");
     }
   } catch (err) {
     res.status(500).json(err);
   }
 } );



// Live score routes

router.post('/score',async(req,res)=>{

    try {
       const result=new Score(req.body);
       await result.save();
       res.status(201).send({message:"score saved successfully"});
    } catch (error) {
       console.log(error);
    }
  
 });
 
router.put('/score-live-runs/:id',async(req,res)=>{
   let sr=req.params.id;
   console.log(sr);
   var { Runs , bolls } =req.body.updateScore;
   console.log(Runs,bolls);
  try {
    var result = await Score.updateOne({serialNo:sr},{$inc:{run:Runs,overs:bolls}});
     res.status(201).send({message:"score updated successfully"});
  } catch (error) {
     console.log(error);
  }
});


router.put('/score-live-players/:id',async(req,res)=>{
   var sr =req.params.id;
 try {
   const {player1 , player2, bowler}= req.body.updatePlayer;
   console.log(player1,player2,bowler);
    var result = await Score.updateOne({serialNo:sr},{$set:{player1:player1,player2:player2,bowler:bowler}});
    res.status(201).send({message:"score updated successfully"});
 } catch (error) {
    console.log(error);
 }
});

router.put('/score-live-overs/:id',async(req,res)=>{
   var id =req.params.id;
 try {
   const {Overs ,CRR,wicket }= req.body.updateOvers;
   console.log(Overs,CRR);
    var result = await Score.updateOne({serialNo:id},{$set:{overs:Overs,crr:CRR,vicket:wicket}});
    res.status(201).send({message:"score updated successfully"});
 } catch (error) {
    console.log(error);
 }

});

// upcoming matches routes

router.get('/getupcomingmatches',async(req, res)=>{
   try {
      var  result =await AllMatches.find();
      res.status(200).json({message:"Matches fetched successfuly",result});
   } catch (error) {
      console.log(error);
   }
});

router.post('/addmatch',async(req,res)=>{

    try {
       const result=new AllMatches(req.body.upcomingData);
       await result.save();
       res.status(201).send({message:"1 match added successfully"});
      
    } catch (error) {
       console.log(error);
    }
  
 });

router.delete('/removematch/:sr',async(req,res)=>{
    const id=req.params.sr;
    console.log(id);
    try {
       const result = await AllMatches.deleteOne({serialNo:id});
       res.status(200).send({message:"1 match removed successfully"});
    } catch (error) {
      // console.log(error);
    }
 })
 
router.put('/updatematch',async(req,res)=>{

   try {
      var result =await AllMatches.findOneAndUpdate({serialNo:req.body.upcomingData.serialNo},req.body.upcomingData);
      await result.save();
      res.status(201).send({message:"1 match updated!"});
   } catch (error) {
      console.log(error);
   }
 
});

 // recent matches routes
 
router.get('/getrecentmatches',async(req, res)=>{
   try {
      var  result =await RecentMatches.find();
      res.status(200).json({message:"Recently plyed Matches fetched successfuly",result});
   } catch (error) {
      console.log(error);
   }
});

router.post('/addrecentmatch',async(req,res)=>{

    try {
       const result=new RecentMatches(req.body.recentData);
       await result.save();
       res.status(201).send({message:"1 Recently Played match added successfully"});
    } catch (error) {
       console.log(error);
    }

 });

router.put('/updaterecentmatch',async(req, res)=>{

   try {
      var result =await RecentMatches.findOneAndUpdate({serialNo:req.body.recentData.serialNo},req.body.recentData);
      await result.save();
      res.status(201).send({message:"1 match updated!"});
   } catch (error) {
      console.log(error);
   }
 });

 router.delete('/deleterecentmatch/:sr',async(req,res)=>{
   const id=req.params.sr;
   //console.log(id);
   try {
      const result = await RecentMatches.deleteOne({serialNo:id});
      res.status(200).send({message:"1 match removed successfully"});
   } catch (error) {
      console.log(error);
   }
 })

  
router.get('/getsubscribers',async(req, res)=>{
   try {
      var  result =await Email.find({});
      res.status(200).json({message:"Subscribers fetched successfuly",result});
   } catch (error) {
      console.log(error);
   }
});




// Notify routes 




router.post('/add-notification',async(req,res)=>{

   try {
      const result=new Notify(req.body);
      await result.save();
      res.status(201).send({message:"Notification added successfully"});
   } catch (error) {
      console.log(error);
   }

});

router.put('/update-notification',async(req, res)=>{

  try {
    let id="62fa12230c3c3dd669a08f02";
     var result =await Notify.findOneAndUpdate({_id:id},{$set:{notification:req.body.notification}});
     await result.save();
     res.status(201).send({message:"Notify updated!"});
  } catch (error) {
     console.log(error);
  }
});

module.exports= router;