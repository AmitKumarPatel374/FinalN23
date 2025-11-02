require("dotenv").config();;
const express = require("express");
const connectDB = require("./src/config/db");
const authRoute = require("./src/routes/auth.routes")
const productRoute = require("./src/routes/product.routes")

const app=express();
connectDB();
app.use(express.json());


app.use('/api/auth',authRoute);
app.use('/api/product',productRoute);


let PORT = process.env.PORT|| 4000;
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})