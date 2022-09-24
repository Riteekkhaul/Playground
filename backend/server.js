
const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var cors = require('cors')
dotenv =require('dotenv').config()

const app=express();

const adminRoutes =require('./routes/adminRoutes');
const userRoutes =require('./routes/UserRoutes');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/v1/admin',adminRoutes);
app.use('/api/v1/user',userRoutes);

mongoose.connect(process.env.Mongo_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    app.listen(5000,()=>{console.log("server is running at 5000")});
}).catch(
    (err)=>{
        console.log(err);
    }
);


