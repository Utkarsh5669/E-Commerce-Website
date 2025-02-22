const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json()); //With the help of this express.json whatever  request we will get from response that will automatically pass through json
app.use(cors()); //using this our react js app contect from our express port 4000

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://Utk_Ecommerce:12345@cluster0.cahxi.mongodb.net/")


// API Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

// Image storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
       return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})

//Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

app.listen(port, (error)=>{
    if(!error){
        console.log("Server is running on port "+port)
    }
    else{
        console.log("Error in server"+error)
    }
})