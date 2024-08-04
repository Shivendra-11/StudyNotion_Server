const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        
    }).then(()=>{
        console.log("Database connected");
    }).catch((error)=>{
        console.log("Error connecting to database",error);
        process.exit(1);
    })
}

