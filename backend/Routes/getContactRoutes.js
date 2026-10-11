const express=require("express");
const router=express.Router();

const{getMessage,}=require("../Controllers/GetController");
router.get("/getmessage",getMessage);

module.exports=router;