const express=require("express");
const {request,getAllrequests}=require("../controllers/request_cntroller.js");

const expressrouter=express.Router();

expressrouter.post("/request",request);

expressrouter.get("/getAllRequests",getAllrequests);


module.exports={expressrouter};