const mongoose=require("mongoose");


const groundSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    pricePerHour:{
        type:Number,
        required:true
    },
    description:String,
    image:String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true
    }
    
})


const Ground=mongoose.model("Grounds",groundSchema);

module.exports=Ground;