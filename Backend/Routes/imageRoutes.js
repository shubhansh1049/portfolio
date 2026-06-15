const express=require("express");
const router=express.Router();


const{saveImage,}=require("../Controllers/ImageController");



router.post("/save",saveImage);

module.exports=router;