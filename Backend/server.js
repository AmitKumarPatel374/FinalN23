require("dotenv").config();;
const express = require("express");
const connectDB = require("./src/config/db");
const authRoute = require("./src/routes/auth.routes")
const productRoute = require("./src/routes/product.routes")
const sellerRoute = require("./src/routes/seller.routes")
const cors = require('cors');

const app=express();
connectDB();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use('/api/auth',authRoute);
app.use('/api/product',productRoute);
app.use('/api/seller',sellerRoute);


let PORT = process.env.PORT|| 4000;
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})