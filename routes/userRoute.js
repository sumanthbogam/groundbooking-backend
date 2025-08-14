const express=require("express");
const {userRegister,userLogin,getGrounds,booking,myBookinngs}=require("../controllers/user_controller");
const {getAllGrounds} =require("../controllers/admin_controller");
const {verifyUserToken}=require("../middlewares/auth.js")

const userRouter=express.Router();


userRouter.post("/register",userRegister);

userRouter.post('/login',userLogin);

userRouter.get('/grounds',verifyUserToken,getGrounds);

// userRouter.post('/book',verifyUserToken,booking);

userRouter.get("/myBookings",verifyUserToken,myBookinngs);

userRouter.get("/getAll",getAllGrounds);

userRouter.get("/getAllafter",getAllGrounds);








module.exports=userRouter;