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


//  pre middleware to send the otp to the user after that it save entry to the db

async function sendverificationeEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email form Study Notion ",
      otp
    );
    console.log("Email send Succesfully", mailResponse);
  } catch (error) {
    console.log("error while sending mail", error);
    throw error;
  }
}

OtpSchema.pre("save", async function (next) {
  await sendverificationeEmail(this.email, this.otp);
  next();
});



module.exports=new mongoose.model("Otp",OtpSchema);