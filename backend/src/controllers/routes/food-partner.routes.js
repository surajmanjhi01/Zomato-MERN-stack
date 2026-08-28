const express = require('express');
const foodPartnerController = require('../food-partner.controller');
const authMiddleware = require('../../middleware/auth.middleware');
const like=require('../../models/like.model');

const router = express.Router();

router.get(
    '/dashboard/me',
    authMiddleware.authFoodPartnerMiddleware,
    foodPartnerController.getFoodPartnerDashboard
);

/* /api/food-partner/:id */
router.get('/:id', authMiddleware.authFoodPartnerMiddleware, foodPartnerController.getFoodPartnerById);
router.put("/like/:postId", async (req, res) => {
  try {
    const post = await like.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.body.userId;

    // Check if already liked
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike
      post.likes.pull(userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);

  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
