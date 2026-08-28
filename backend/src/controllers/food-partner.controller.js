const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId).select('-password');

    if (!foodPartner) {
        return res.status(404).json({ message: 'Food partner not found' });
    }

    res.status(200).json({
        message: 'Food partner retrieved successfully',
        foodPartner,
    });
}

async function getFoodPartnerDashboard(req, res) {
    try {
        const partnerId = req.foodPartner?._id;
        if (!partnerId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const [foodPartner, reels, totalReels] = await Promise.all([
            foodPartnerModel.findById(partnerId).select('-password'),
            foodModel.find({ foodpartner: partnerId }).sort({ createdAt: -1 }),
            foodModel.countDocuments({ foodpartner: partnerId }),
        ]);

        if (!foodPartner) {
            return res.status(404).json({ message: 'Food partner not found' });
        }

        res.status(200).json({
            message: 'Food partner dashboard fetched successfully',
            dashboard: {
                foodPartner,
                stats: {
                    totalReels,
                },
                reels,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch dashboard',
            error: error.message,
        });
    }
}

module.exports = {
    getFoodPartnerById,
    getFoodPartnerDashboard,
};
// Like or Unlike a post
