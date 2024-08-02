const mongoose=require("mongoose");
const OtpSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    otp:{
        type:Number,
        require:true

    },
createdAt:{
    type:Date,
    default:Date.Now(),
    expires:5*60
}

})

module.exports=new mongoose.model("Otp",OtpSchema);