const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config();

// verify the user by the token
exports.auth = async (req, res, next) => {
  try {
    // Fetch the token from three different ways
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer", "");

    // if token missing return the response

    if (!token) {
      return res.status(401).json({
        success: false,
        messgae: "Token is missing ",
      });
    }

    // verify the token on the basic of jwt_secret
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.body = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error.message,
      message: "something went wrong while validating the token ",
    });
  }
};

// isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType != "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for student only",
      });
    }

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User role cannot be verified please try again later",
    });
  }
};
// isInstructor

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType != "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Instructor only",
      });
    }

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User role cannot be verified please try again later",
    });
  }
};

// IsAdmin

exports.isAdmin = async (req, res, next) => {
    try {
      if (req.user.accountType != "Admin") {
        return res.status(401).json({
          success: false,
          message: "This is protected route for Admin only",
        });
      }
  
      next();

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "User role cannot be verified please try again later",
      });
    }
  };
