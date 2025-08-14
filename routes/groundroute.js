const express=require("express");
const groundRoute=express.Router();
const { bookSlot, getBookedSlots } = require("../controllers/ground_controller.js");

groundRoute.post("/bookings/bookSlot",bookSlot);
groundRoute.get("/bookings/getBookedSlots",getBookedSlots);

module.exports=groundRoute;

