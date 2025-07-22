const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const adminRouter=require("./routes/adminroute.js");
const userRouter=require("./routes/userRoute.js");

dotenv.config();


const app=express();



app.use(cors({
  origin: 'http://localhost:5173', 
}));

app.use(express.json());



mongoose.connect(process.env.mongo)
.then(() => {
  console.log(" MongoDB connected");
})
.catch((err) => {
  console.error(" MongoDB connection error:", err);
});

app.use("/api/admin",adminRouter);
app.use("/api/user",userRouter);



app.get("/",(req,res)=>{
    res.send("response from get");

});


app.listen(3000,()=>{
    console.log(`server started at port ${3000}`);
});