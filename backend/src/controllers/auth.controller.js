const jwt = require('jsonwebtoken');
const usermodel=require('../models/user.model');
const foodPartnermodel=require('../models/foodpartner.model');
const bcrypt=require('bcryptjs');

async function registerUser(req,res){
    try {
        const{fullName,email,password,phoneNumber}=req.body;

        if(!fullName || !email || !password || !phoneNumber) {
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        const isUserAlreadyExist=await usermodel.findOne({email});

     if(isUserAlreadyExist){
        return res.status(400).json({
            message:"user already exist"
        })
     }
     const hashedPassword=await bcrypt.hash(password,10);

     const user=await usermodel.create({
        fullName,
        email,
        password: hashedPassword,
        phoneNumber
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
    } catch(error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message:"Registration failed",
            error: error.message
        });
    }
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
            email:user.email,
          
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
    try {
        const{name,email,password,RestaurantName,ContactNumber}=req.body;
        
        if(!name || !email || !password || !RestaurantName || !ContactNumber) {
            return res.status(400).json({
                message:"All fields are required"
            });
        }
        
        const isFoodPartnerAlreadyExist=await foodPartnermodel.findOne({email});
        if(isFoodPartnerAlreadyExist){  
            return res.status(400).json({
                message:"food partner already exist"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const foodPartner=await foodPartnermodel.create({  
            name,
            RestaurantName,
            ContactNumber,
            email,
            password:hashedPassword,
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
    } catch(error) {
        console.error("Food partner registration error:", error);
        res.status(500).json({
            message:"Registration failed",
            error: error.message
        });
    }
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

