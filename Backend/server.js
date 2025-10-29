require("dotenv").config();;
const express = require("express");
const connectDB = require("./src/config/db")

const app=express();
connectDB();


let PORT = process.env.PORT|| 4000;
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})