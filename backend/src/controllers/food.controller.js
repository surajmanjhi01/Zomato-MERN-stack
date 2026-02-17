const foodmodel = require('../models/food.model');
const storageService=require('../services/storage.service');
const { v4:uuid}=require("uuid")


async function createFood(req, res) {
    console.log(req.foodPartner)
    console.log(req.body);

    const fileUploadResult=await storageService.uploadFile(req.file.buffer,uuid());
    const foddItem=await foodmodel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodpartner:req.foodPartner._id
    })
    
    res.status(201).json({
        message:"Food item created successfully",
        food:foodItem
    })
}


module.exports={
    createFood
}