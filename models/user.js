const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    require: true,
  },
  lastname: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: Stirng,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Profile",
  },
  accuntType: {
    require: true,
    enum: ["Admin", "Student", "Instructor"],
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
  ],

  image: {
    type: String,
    require: true,
  },
  courseProgress: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Courseprogress"


  }],
});
module.exports=mongoose.model("User",userSchema);