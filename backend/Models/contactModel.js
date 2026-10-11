const mongoose=require("mongoose");

const constSchema=new mongoose.Schema({
    name:{
       type:String,
       required:true,
    },
    email:{
       type:String,
       required:true,
    },
    message:{
        type:String,
        required:true,
    }

},
{timestamps:true,});

module.exports=mongoose.model("Contact",constSchema);