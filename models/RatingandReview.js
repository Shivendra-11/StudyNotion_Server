const mongoose=require("mongoose");

const RatingandRevie=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    rating:{
        type:number,
        require:true
    },
    review:{
        type:string,
        trim:true
    }

})

module.exports=new mongoose.model("RatingandReview",RatingandRevie)