const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const purityRoutes = require('./routes/Purityroutes');
const MetalRateRoutes = require('./routes/MetalRateRoutes')


const app = express();
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://atts-metalrate.vercel.app"  // your Vercel domain
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

//connecting mongodb
mongoose.connect(process.env.MONGO_URI);

const PORT = process.env.PORT;

app.listen(PORT ,(req,res) =>{
    console.log(`server is running on port ${PORT}`)
})

app.use("/api/purities",purityRoutes);
app.use("/api/rates", MetalRateRoutes);

//Test route
app.get("/api/hello",(req,res)=>{
    res.json("hello api is working")
})
