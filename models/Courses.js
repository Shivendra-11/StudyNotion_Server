const mongoose=require("mongoose");

const CourseSchema=new mongoose.Schema({

    coursename:{
        type:String,
        trim:true
    },
    courseDescription:{
        type:String,
        trim:true
    },
    Instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    coursecontent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
       
    coursecontent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    },

     ratingandreview:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingandReview",

        },
        price:{
            type:Number,
    
        },
        thumbnail:{
            type:String
        },
        tags:{
            type:mongoose.Schema.Types.ObjectId,
            require:true, 

        },
        studentenroll:[{
            type:mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"user",


        }]

})

module.exports=new mongoose.module("Course",CourseSchema);
