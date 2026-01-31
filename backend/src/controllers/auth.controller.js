const jwt = require('jsonwebtoken');
const usermodel=require('../models/user.model');
const bcrypt=require('bcryptjs');

async function registerUser(req,res){
    const{fullName,email,password}=req.body;

    const isUserAlreadyExist=await usermodel.findOne({email});

 if(isUserAlreadyExist){
    return res.status(400).json({
        message:"user already exit"
    })
 }
 const hashedPassword=await bcrypt.hash(password,10);

 const user=await usermodel.create({
    fullName,
    email,
    password: hashedPassword
})
const token=jwt.sign({
    id:user._id,
},"0f18d53624081566dcedfa90b353bfd6")
res.cookie("token",token)
res.status(201).json({
    message:"user registered successfully",
    user:{
        _id:user._id,
        fullName:user.fullName,
        email:user.email
    }
});
}
async function loginUser(req,res){

}


module.exports={
    registerUser,
    loginUser
}
