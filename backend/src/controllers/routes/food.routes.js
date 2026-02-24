const express=require('express');
const foodController=require('../food.controller');
const authMiddleware=require('../../middleware/auth.middleware');
const router=express.Router();
const multer=require('multer');
const upload=multer({
    storage:multer.memoryStorage(),
})
// Add your food routes here{protected}
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),  
    foodController.createFood);
// Example: router.post('/create', foodController.createFood);
/*Get/api/food/{protected}*/
 router.get("/",
    authMiddleware.authFoodPartnerMiddleware,
    foodController.getFoodItems
 )
//

module.exports=router;