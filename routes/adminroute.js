const {adminRegister,adminLogin,adminGroundSubmit,getGrounds,getAllGrounds,getDelete,editGround,editAdd}=require("../controllers/admin_controller.js");
const {verifyAdminToken}=require("../middlewares/auth.js");
const upload=require("../middlewares/multer.js");

const express=require("express");
const adminRouter=express.Router();


adminRouter.post("/register",adminRegister);
adminRouter.post("/login",adminLogin);
adminRouter.post("/addGround",verifyAdminToken,upload.single("image"),adminGroundSubmit);
adminRouter.get("/getGrounds",getGrounds);
adminRouter.get("/getAllGrounds",getAllGrounds);
adminRouter.delete("/delete/:id",getDelete);
adminRouter.get("/ground/:id",verifyAdminToken,editGround);
adminRouter.put("/groundedit/:id",verifyAdminToken,upload.single("image"),editAdd);




module.exports=adminRouter;

