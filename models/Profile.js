const { model } = require("mongoose");

const mongoose=reuire("mongoose");

const  Profileschema=new mongoose.Schema({
    gender:{
        type:String,
        require:true,
        
    },
   dateOfbirth:{
    type:String,

   },
   about:{
    type:String,
   },
   contactNumber:{
    type:Number,
    trim:true
   }


});

model.exports=mongoose.model("Profile",Profileschema);