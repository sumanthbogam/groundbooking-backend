const mongoose=require("mongoose");
const { required } = require("zod/v4-mini");


const bookingSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    groundId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"grounds",
        required:true
    },
    date:{
        type:String,
        required:true
    },
    timeslot:{
        type:String,
        required:true
 },
 

},{timestamps:true}

// timestamps:true=>It automatically adds two fields to your documents:

// createdAt: the date and time when the document was created

// updatedAt: the date and time when the document was last updated

)

bookingSchema.index({ groundId: 1, date: 1, timeslot: 1 }, { unique: true });

const bookingModel=mongoose.model("bookings",bookingSchema);


module.exports={bookingModel};