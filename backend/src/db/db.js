const mongoose=require('mongoose');
function connectDB(){
    mongoose.connect(process.env.mongoURL)
    .then(()=>{
        console.log("DB connected");
    })
    .catch((err)=>{
        console.log("DB connection failed",err);
    });
}
module.exports=connectDB;
