const express =require('express');
const Score =require("../models/ScoreModel");
const AllMatches=require('../models/AllMatchesModel');
const router = express.Router();
const RecentMatches =require('../models/RecentMatchesModal');
const Email =require('../models/Email');
const Notify = require('../models/Notify');

router.get('/score',async(req, res)=>{
    try {
       var  result =await Score.find();
       res.status(200).json({message:"score fetched successfuly",result});
    } catch (error) {
       console.log(error);
    }
   
 })

 
router.get('/getallmatches',async(req, res)=>{
    try {
       var  result =await AllMatches.find();
       res.status(200).json({message:"Matches fetched successfuly",result});
    } catch (error) {
       console.log(error);
    }
 });
 

 router.get('/getrecentmatches',async(req, res)=>{
    try {
       var  result =await RecentMatches.find();
       res.status(200).json({message:"Recently plyed Matches fetched successfuly",result});
    } catch (error) {
       console.log(error);
    }
 });

 
router.post('/subscribe',async(req,res)=>{

   try {
      const result=new Email(req.body);
      await result.save();
      res.status(201).send({message:"Email saved successfully"});
   } catch (error) {
      console.log(error);
   }
 
});

// notify route 

router.get('/get-notification',async(req, res)=>{
   try {
      var  result =await Notify.find({_id:"62fa12230c3c3dd669a08f02"});
      res.status(200).json({message:"Notification fetched successfuly",result});
   } catch (error) {
      console.log(error);
   }
 });

 module.exports= router;