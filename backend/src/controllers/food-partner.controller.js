const foodPartnerModel=require('../models/food-partner.model');

async function getFoodPartnerById(req,res){
    const foodPartnerId=req.params.id;

 const foodPartner=await foodPartnerModel.findById(foodPartnerId)

 if(!foodPartner){
    return res.statud(404).json({message:"Food partner not found"});
 }
res.status(200).json({
  messafe:"Food partner retrieved succesfully",
  foodPartner
});


}

module.exports={getFoodPartnerById};