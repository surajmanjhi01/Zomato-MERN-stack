const foodPartnermodel=require('../models/foodpartner.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


async function authFoodPartnerMiddleware(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unauthenticated access"
        })
    }
 try{
   const decoded= jwt.verify(token,process.env.JWT_SECRET);
   const foodPartner=await foodPartnermodel.findById(decoded.id);
   if(!foodPartner){
       return res.status(401).json({
           message:"unauthenticated access"
       })
   }
   req.foodPartner=foodPartner;
   next();

}   catch(err){
    return res.status(401).json({
        message:"unauthenticated access"
    })
 }
}

module.exports={
    authFoodPartnerMiddleware
}