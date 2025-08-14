const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const adminRouter=require("./routes/adminroute.js");
const userRouter=require("./routes/userRoute.js");
const {getAllGrounds}=require("./controllers/admin_controller.js");
const groundRoute=require("./routes/groundroute.js");
const {expressrouter}=require("./routes/requestroute.js")

dotenv.config();


const app=express();



app.use(cors({
  origin: 'http://localhost:5173', 
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));



mongoose.connect(process.env.mongo)
.then(() => {
  console.log(" MongoDB connected");
})
.catch((err) => {
  console.error(" MongoDB connection error:", err);
});


app.use("/api/admin",adminRouter);
app.use("/api/user",userRouter);
app.use("/api/ground",groundRoute);
app.use("/api/gen",expressrouter);






app.listen(3000,()=>{
    console.log(`server started at port ${3000}`);
});