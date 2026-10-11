const mongoose=require("mongoose");

const connectDb =async() =>{
try{
await mongoose.connect(process.env.MONGO_URI);
console.log("Connection Successfully");
}
catch(err){
    console.log("Failed To Connect",err);
    process.exit(1);
}
};

module.exports=connectDb;
