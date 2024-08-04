const user = require("../models/user");
const otp = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.sendOtp = async (req, res) => {
    try {
        // fetch the user details
        const { email } = req.body;

        // now we check for user already exist 
        const userAlreadyExist = await user.findOne({ email });

        if (userAlreadyExist) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            });
        }

        // if user not signed in yet then we have to send the otp
        // generate OTP
        var generatedOtp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log("OTP is generated ", generatedOtp);

        let result = await otp.findOne({ otp: generatedOtp });

        while (result) {
            generatedOtp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await otp.findOne({ otp: generatedOtp });
        }

        // save the OTP in the database
        const otpPayload = { email, otp: generatedOtp };

        const otpBody = await otp.create(otpPayload);

        // return the success response
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            data: otpBody
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "OTP not sent"
        });
    }
}

// signup

exports.Signup = async (req, res) => {
    try {
        // fetch data from the req body 
        const { firstname, lastname, email, password, confirmPassword, contactNumber, otp: userOtp, accountType } = req.body;

        // validate all the entries
        if (!firstname || !lastname || !email || !password || !confirmPassword || !contactNumber || !userOtp || !accountType) {
            return res.status(401).json({
                success: false,
                message: "All the fields are required"
            });
        }

        // match the password and confirm password
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // check if user already exists
        const isUserExist = await user.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // send the otp if all things are correct, otp should be recent
        const recentOtp = await otp.find({ email }).sort({ createdAt: -1 }).limit(1);
        // validate OTP
        if (recentOtp.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Otp not found"
            });
        } else if (userOtp != recentOtp[0].otp) {
            // Invalid otp
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create the user account in db;
        const newUser = await user.create({
            firstname,
            lastname,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
        });

        // send the response
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            data: newUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User is not registered successfully"
        });
    }
}

// Login

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Check if user exists
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Compare password
        const isMatch = bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Create and assign token
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email ,
                accuntType:existingUser.accuntType
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
user.token=token;
user.password=undefined;

// create the cokies 
res.cookies("token",token,options).status(200).json({
    success:true,
    token,
    existingUser,
    message:"Logged in succesfully"

});
const options ={
    expires:new Date(Date.now()+3*24*60*60*100),
    httpOnly:true,


}
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error logging in",
            error: error.message
        });
    }
}


// change password 

exports.Resetpassword=async(rq,res)=>{
    // get data from the req body 
    // get old pass newe pass and confirmpass

    // validation update the pass in the db 
    // send email pass update
    // return res

}