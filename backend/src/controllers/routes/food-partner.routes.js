const express=require("express");   
const foodPartnerController=require("../food-partner.controller");
const authMiddleware=require("../../middleware/auth.middleware");
const router=express.Router();
/*/api/food-partner/:id*/
router.get("/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById)

module.exports=router;