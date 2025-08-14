const mongoose=require("mongoose");
const { string } = require("zod/v4-mini");
const { _string } = require("zod/v4/core");

const requestSchema=new mongoose.Schema({

    playersNeeded:{
        type:string,
        required:true
    },
    requirements:{
        type:string,
        required:true
    },
    groundId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"grounds",
            required:true
        },
        userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users",
                required:true
            }
},{timestamps:true})

const requestModel=mongoose.model("requests",requestSchema);


module.exports={requestModel};

