const user = require("../models/user");
const user=require("../models/user");
const mailsender=require("../utils/mailsender");

// resetpasswordToken
exports.resetPasswordToken=async(req,res)=>{
    try{

        // get email form the user body
        const email=req.body.email;
        // check for the user validation
        const user=await user.findone({email:email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Your email is not registered with us"
            });
        }

        // Genrate Token
        const token=crypto.randomUUID();
        // update the user by adding the token and time
        const updateDetails=await user.findone(
            {email:email},
            {token:token,
                resetpasswordExpires:date.now()+5*60*1000
            },{
                new:true
            }
        )
// create url
const url=`http://localhost:3000/update-password/${token}`;
        // send email containing the url
        await mailsender(email,"password Reset Link",
            `password reset Link ${url}`
        );
        // return response
        return res.json({
            success:true,
            messgage:"Email set successfully , please check the email and change the password"
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong please try again later "
        });

    }
}

// reset the password 

exports.resetPassword=async(req,res)=>{
    // fetch data 
    // validation
    // 
}