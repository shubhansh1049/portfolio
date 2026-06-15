const Contact=require("../Models/contactModel");

const getMessage=async(req,res)=>{
    try{
      
        const contacts=await Contact.find();
        res.status(200).json({
           success:true,
           contacts,
        });
    }
    catch(err){
        res.status(500).json({
             message:err.message,
             success:false,
        });
    }
}

module.exports={getMessage};