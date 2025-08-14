const {userModel}=require("../models/userModel.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const z=require("zod");
const Ground=require("../models/ground.js");
// const {bookingModel}=require("../models/booking.js")



const userZodSchema=z.object({
    name:z.string().min(3),
    email:z.string().email(),
    password:z.string().min(6).max(12)
})

const loginZodSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6).max(12)
})

const bookingZodSchema=z.object({
    groundId: z.string(),
    date:z.string(),
    timeslot:z.string(),
    players:z.number().min(0).max(10).optional()
})


const myBookinngs=async (req,res)=>{

   try{ const id=req.userId;

    const bookedGrounds=await bookingModel.find({user:id});

    return res.status(200).json({bookedGrounds});}
    catch(err){
        console.error(err);
        return res.status(400).json({msg:"server error"});
    }
    
}



// const booking=async (req,res)=>{

//     try{const valid=bookingZodSchema.safeParse(req.body);
//         console.log(valid)
//     if(!valid.success){
//          return res.status(400).json({msg:"error"});
//     }

//     const {groundId,date,timeslot,players=0}=valid.data;

//     const trimdate=date.trim();

//     const trimtimeslot=timeslot.trim().toLowerCase();

//     const bookingStatus=await bookingModel.findOne({groundId,date:trimdate,timeslot:trimtimeslot});

//     console.log(bookingStatus);

//     if(bookingStatus){
//         return res.status(400).json({msg:"ground already booked at this timeslot"});

//     }

//     const booking= new bookingModel({
//         user:req.userId,
//         groundId,
//         date,timeslot,players


//     })

//     await booking.save();
//      return res.status(200).json({msg:"booking successfull"});



// }
//     catch(err){
//         console.error(err);
//     }


// }

const getGrounds=async (req,res)=>{
  try { const grounds=await Ground.find();

    return res.status(200).json({grounds});

    
}
catch(err){
    console.error(err);
    return res.status(400).json({msg:"server error"});
}
    
}





const userRegister=async (req,res)=>{

    try{const isValid=userZodSchema.safeParse(req.body);

    if(!isValid.success){
        return res.status(400).json({msg:"enter valid details"});
    }

    const {name,email,password}=isValid.data;

    const exist=await userModel.findOne({email});

    if(exist){
         return res.status(400).json({msg:"enter valid details"});
    }

    const hashpass=await bcrypt.hash(password,10);

    const user=await new userModel({
        name,email,password:hashpass
    });

    await user.save();
return res.status(200).json({ msg: "User registered successfully" });

}
    catch(err){
        console.error(err);
    }


}

const userLogin=async (req,res)=>{

    const isValid=loginZodSchema.safeParse(req.body);

    if(!isValid.success){
        return res.status(400).json({msg:"enter correct details"});
    }

    const {email,password}=isValid.data;

    const exist=await userModel.findOne({email});

    if(!exist){
         return res.status(400).json({msg:"user not registered"});
    }

    const validPass=await bcrypt.compare(password,exist.password);

    if(!validPass){
        return res.status(400).json({msg:"password wrong"});

    }

    const token=jwt.sign({userId:exist._id,email:exist.email},process.env.JWT_SECRET, { expiresIn: '5' });
    console.log(exist._id);

    return res.status(200).json({msg:"successfully login",token,userId: exist._id,});




}

module.exports={userRegister,userLogin,getGrounds,myBookinngs};