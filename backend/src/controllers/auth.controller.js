const jwt = require('jsonwebtoken');
const usermodel=require('../models/user.model');
const foodPartnermodel=require('../models/foodpartner.model');
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
},process.env.JWT_SECRET)
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
    const{email,password}=req.body;

    const user=await usermodel.findOne({email});

    if(!user){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(200).json({
        message:"user logged in successfully",
        user:{
            _id:user._id,
            fullName:user.fullName,
            email:user.email
        }
    });
}

function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"user logged out successfully"
    });
}

async function registerFoodPartner(req,res){
    const{name,email,password}=req.body;
    const isFoodPartnerAlreadyExist=await foodPartnermodel  .findOne({email});
    if(isFoodPartnerAlreadyExist){  
        return res.status(400).json({
            message:"food partner already exist"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const foodPartner=await foodPartnermodel.create({  
        name,
        email,
        password:hashedPassword
    });
    const token=jwt.sign({
        id:foodPartner._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"food partner registered successfully",
        foodPartner:{
            _id:foodPartner._id,
            name:foodPartner.name,
            email:foodPartner.email
        }
    });
   
}

async function loginFoodPartner(req,res){
    const{email,password}=req.body;
    const foodPartner=await foodPartnermodel.findOne({email});
    if(!foodPartner){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,foodPartner.password);
    if(!isPasswordValid){
        return res.status(400).json({   
            message:"invalid email or password"
        })
    }
    const token=jwt.sign({
        id:foodPartner._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(200).json({ 
        message:"food partner logged in successfully",
        foodPartner:{
            _id:foodPartner._id,
            name:foodPartner.name,
            email:foodPartner.email
        }
    });
}
function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"food partner logged out successfully"
    });
}

module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}

