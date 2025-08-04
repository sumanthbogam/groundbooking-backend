const {adminRegister,adminLogin,adminGroundSubmit,getGrounds}=require("../controllers/admin_controller.js");
const {verifyAdminToken}=require("../middlewares/auth.js");
const upload=require("../middlewares/multer.js");

const express=require("express");
const adminRouter=express.Router();


adminRouter.post("/register",adminRegister);
adminRouter.post("/login",adminLogin);
adminRouter.post("/addGround",verifyAdminToken,upload.single("image"),adminGroundSubmit);
adminRouter.get("/getGrounds",verifyAdminToken,getGrounds);




module.exports=adminRouter;

