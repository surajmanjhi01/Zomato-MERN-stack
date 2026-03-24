const express = require('express');
const foodPartnerController = require('../food-partner.controller');
const authMiddleware = require('../../middleware/auth.middleware');

const router = express.Router();

router.get(
    '/dashboard/me',
    authMiddleware.authFoodPartnerMiddleware,
    foodPartnerController.getFoodPartnerDashboard
);

/* /api/food-partner/:id */
router.get('/:id', authMiddleware.authFoodPartnerMiddleware, foodPartnerController.getFoodPartnerById);

module.exports = router;
