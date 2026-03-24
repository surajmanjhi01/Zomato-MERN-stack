const { v4: uuid } = require('uuid');
const foodmodel = require('../models/food.model');
const storageService = require('../services/storage.service');

async function createFood(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'Video file is required',
            });
        }

        const fileUploadResult = await storageService.uploadFile(req.file.buffer, `${uuid()}.mp4`);

        const foodItem = await foodmodel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodpartner: req.foodPartner._id,
        });

        res.status(201).json({
            message: 'Food reel uploaded successfully',
            food: foodItem,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to upload food reel',
            error: error.message,
        });
    }
}

async function getFoodItems(req, res) {
    const foodItems = await foodmodel.find({ foodpartner: req.foodPartner._id }).sort({ createdAt: -1 });
    res.status(200).json({
        message: 'Food items fetched successfully',
        foodItems,
    });
}

async function getAllFoodItems(req, res) {
    try {
        const foodItems = await foodmodel.find().populate('foodpartner', 'name RestaurantName').sort({ createdAt: -1 });
        res.status(200).json({
            message: 'All food items fetched successfully',
            foodItems,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching food items',
            error: error.message,
        });
    }
}

module.exports = {
    createFood,
    getFoodItems,
    getAllFoodItems,
};
