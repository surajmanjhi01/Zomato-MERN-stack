const mongoose=require('mongoose');
const foodPartnerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    RestaurantName:{
        type:String,
        required:true
    },
    ContactNumber:{
        type:String,
        required:true
    },  
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
})
const foodPartnermodel=mongoose.model('FoodPartner',foodPartnerSchema);
module.exports=foodPartnermodel;