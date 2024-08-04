const User = require("../models/user");
const mailSender = require("../utils/mailsender");
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from the user body
        const email = req.body.email;
        // check for the user validation
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your email is not registered with us"
            });
        }

        // Generate Token
        const token = crypto.randomUUID();
        // update the user by adding the token and time
        const updateDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            { new: true }
        );
        // create url
        const url = `http://localhost:3000/update-password/${token}`;
        // send email containing the url
        await mailSender(email, "Password Reset Link",
            `Password reset link: ${url}`
        );
        // return response
        return res.json({
            success: true,
            message: "Email sent successfully, please check the email and change the password"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        });
    }
}

// reset the password 
exports.resetPassword = async (req, res) => {
    // fetch data 
    const { password, confirmPassword, token } = req.body;

    // validation
    if (password !== confirmPassword) {
        return res.status(401).json({
            success: false,
            message: "Passwords do not match"
        });
    }
    // get user details from the db using token 
    const userDetails = await User.findOne({ token: token });
    // if no entry - Invalid token 
    if (!userDetails) {
        return res.status(401).json({
            success: false,
            message: "Token is invalid"
        });
    }

    // check the expiry time of the token 
    if (userDetails.resetPasswordExpires < Date.now()) {
        return res.status(401).json({
            success: false,
            message: "Token has expired"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
        { token: token },
        { password: hashedPassword },
        { new: true }
    );
    // return response 
    return res.status(200).json({
        success: true,
        message: "Password reset successfully"
    });
}
