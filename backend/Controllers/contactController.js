const Contact=require("../Models/contactModel");

const saveMessage =async (req,res)=>{
    try{
const {name,email,message}=req.body;

const contact= await Contact.create({
    name,
    email,
    message,
});

res.status(201).json({
    success:true,
    message:"Message Saved SuccessFully",
    contact,

});
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
}

module.exports={
    saveMessage,
};