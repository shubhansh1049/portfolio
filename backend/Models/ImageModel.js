const mongoose=require('mongoose');

const imageSchema=new mongoose.Schema({
title:String,
image:String,
description:String,
github:String,
live:String,
},{timestamps:true});

module.exports = mongoose.model("Project",imageSchema);