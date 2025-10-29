const mongoose= require("mongoose");


const connectDB = async()=>{
    try {
        let res = await mongoose.connect(process.env.MONGO_URI);
        if (res) {
            console.log("mongoDB connected successfully!");
        }
    } catch (error) {
        console.log("eroor in mongoDB connection ",error);
    }
}

module.exports=connectDB;