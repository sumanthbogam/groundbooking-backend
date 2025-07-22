const {adminRegister,adminLogin,adminGroundSubmit,getGrounds}=require("../controllers/admin_controller.js");
const {verifyAdminToken}=require("../middlewares/auth.js");

const express=require("express");
const adminRouter=express.Router();


adminRouter.post("/register",adminRegister);
adminRouter.post("/login",adminLogin);
adminRouter.post("/addGround",verifyAdminToken,adminGroundSubmit);
adminRouter.get("/getGrounds",verifyAdminToken,getGrounds);




module.exports=adminRouter;

