const mongoose=require('mongoose');
const foodPartnerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    foodpartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'FoodPartner',
    }
})
const foodmodel=mongoose.model('Food',foodPartnerSchema);
module.exports=foodmodel;