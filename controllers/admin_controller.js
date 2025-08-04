const adminModel=require("../models/admin.js");
const bcrypt=require("bcrypt");
const z=require("zod");
const jwt=require("jsonwebtoken");
const Ground=require("../models/ground.js");


const adminSchema=z.object({
    name:z.string().min(3),
    email:z.string().email(),
    password:z.string().min(8).max(12)

})

const adminloginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(8).max(12)

})

const adminGroundSchema=z.object({
    name:z.string().min(3),
    location:z.string(),
    pricePerHour:z.number().positive(),
    description:z.string().optional(),
})




const adminRegister=async (req,res)=>{

  try { 
    
    
    const validSchema=adminSchema.safeParse(req.body);
     
    
    if(!validSchema.success){
       return  res.status(400).json({msg:"enter details correctely"});
    }
    const{name,email,password}=validSchema.data;

    const hasEmail=await adminModel.findOne({email});
    if(hasEmail){
         return  res.status(400).json({msg:"email already exist"});
    }

    const hashedpass=await bcrypt.hash(password,10);

    const admin=new adminModel({name,email,password:hashedpass});

    await admin.save();

    return res.status(200).json({msg:"admin registered successfully"});
}

catch(err){
    console.error(err);
    res.status(500).json({msg:"server error"});

}


}
const adminGroundSubmit=async (req,res)=>{

   
   try { const GroundAuth=adminGroundSchema.safeParse(req.body);

    if(!GroundAuth.success){
        return res.status(404).json({msg:"enter details correctly"});
    }

    const {name,location,pricePerHour,description}=GroundAuth.data;

        const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newGround=new Ground({
        name,location,pricePerHour,description,image,createdBy:req.adminId
    })

    await newGround.save();

    return res.status(200).json({msg:"ground added successfully"});

}


    catch(err){
        console.error(err);
         res.status(500).json({msg:"server error"});

    }



}
const getGrounds=async (req,res)=>{
    try
    {const userId=req.adminId;

    const grounds=await Ground.find({createdBy:userId});
    return res.status(200).json({grounds});
}
catch(err){
    console.error(err);

 return res.status(200).json({msg:"server error"});


}



}

const adminLogin=async (req,res)=>{
    try
   { const adminLoginDetails=adminloginSchema.safeParse(req.body);

    if(!adminLoginDetails.success){
        return res.status(200).json({msg:"enter details correctly"});
    }

    const{email,password}=adminLoginDetails.data;

    const details=await adminModel.findOne({email});

    if(!details){
        return res.status(200).json({msg:"no admin found"});
    }
    
    const checkDetails=await bcrypt.compare(password,details.password);
    
    const token=jwt.sign({adminId:details._id,email:details.email},process.env.JWT_SECRET,{expiresIn:"1h"} );

    return res.status(200).json({msg:"login successfull",
        token
    }
        
    )
}
catch(err){
    console.error(err);
    return res.status(200).json({msg:"server error"});

}













}

module.exports={adminRegister,adminLogin,adminGroundSubmit,getGrounds};