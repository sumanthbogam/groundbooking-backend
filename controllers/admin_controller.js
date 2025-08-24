const adminModel=require("../models/admin.js");
const bcrypt=require("bcrypt");
const z=require("zod");
const jwt=require("jsonwebtoken");
const Ground=require("../models/ground.js");
const mongoose=require("mongoose");


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
    pricePerHour:z.string(),
    description:z.string().optional(),
})

const editAdd=async(req,res)=>{
    try{

    const updates = {
      name: req.body.name,
      location: req.body.location,
      pricePerHour: req.body.pricePerHour,
      description: req.body.description,
    };

    if (req.file) {
      updates.image = req.file.filename;
    }

    const updatedGround = await Ground.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );


    if (!updatedGround) return res.status(404).json({ msg: "Ground not found" });

    res.json({ msg: "Ground updated successfully", ground: updatedGround });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }





}

const editGround=async (req,res)=>{
    try {
    const ground = await Ground.findById(req.params.id);
    if (!ground) return res.status(404).json({ msg: "Ground not found" });
    res.json(ground);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }

}

const getDelete = async (req, res) => {
  try {
    const { id } = req.params;   
    await Ground.findByIdAndDelete(id);
    res.json({ success: true, message: "Ground deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


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
      console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if(!GroundAuth.success){
        return res.status(404).json({msg:"enter details correctly"});
    }

    const {name,location,pricePerHour,description}=req.body;

        const image =req.file.filename;
        console.log(image);

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

const getAllGrounds=async (req,res)=>{
    try
    {

    const grounds=await Ground.find({});
    console.log(grounds);
    
    return res.status(200).json({grounds});
    
}
catch(err){
    console.error(err);

 return res.status(200).json({msg:"server error"});


}}

const getGrounds=async (req,res)=>{
    try
    {const userId=req.headers.adminid;
        console.log(userId);

    //  const grounds=await Ground.find({});
      const grounds = await Ground.find({ createdBy: userId });
    console.log("hiii");
    console.log(grounds);
    
    return res.status(200).json({grounds});
}
catch(err){
    console.error(err);

 return res.status(400).json({msg:"server error"});


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
        token,id:details._id,email:details.email
    }
        
    )
}
catch(err){
    console.error(err);
    return res.status(200).json({msg:"server error"});

}













}

module.exports={adminRegister,adminLogin,adminGroundSubmit,getGrounds,getAllGrounds,getDelete,editGround,editAdd};