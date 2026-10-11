const Image=require("../Models/ImageModel");

const saveImage=async(req,res)=>{
    try{
        const{title,image,description,github,live}=req.body;

        const images=await Image.create({
           title,
           image,
           description,
           github,
           live,
        });

        res.status(201).json({
            success:true,
            message:"Project Added Successfully",
            images,
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
    saveImage,
};
