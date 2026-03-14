const foodmodel = require('../models/food.model');
const storageService=require('../services/storage.service');
const { v4:uuid}=require("uuid")


async function createFood(req, res) {


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
async function getFoodItems(req,res){
    const foodItems=await foodmodel.find({foodpartner:req.foodPartner._id});
    res.status(200).json({
        message:"Food items fetched successfully",
        foodItems:foodItems
    })
}

async function getAllFoodItems(req,res){
    try{
        const foodItems=await foodmodel.find().populate('foodpartner');
        res.status(200).json({
            message:"All food items fetched  successfully",
            foodItems:foodItems
        })
    }catch(error){
        res.status(500).json({
            message:"Error fetching food items",
            error:error.message
        })
    }
}

module.exports={
    createFood,
    getFoodItems,
    getAllFoodItems
}