const foodmodel = require('../models/food.model');


async function createFood(req, res) {
    const { name, description, price } = req.body;
}


module.exports={
    createFood
}