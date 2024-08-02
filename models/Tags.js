const mongoose=require("mongoose");

const tagsSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String

    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },

})

module.exports=new mongoose.model("Tag",tagsSchema);