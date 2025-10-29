const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        unique: true,
        match: [/^[0-9]{10}$/, "please enter a valid phone number!"]
    },
    password: {
        type: String,
        minLength: 6
    }
}, {
    timestamps: true
})

userSchema.pre('save',async function(next){
    let hashadPass = await bcrypt.hash(this.password,10);
    this.password=hashadPass;
    next();
})

userModel.methods.comparePass= async function(password) {
    let comparePass = await bcrypt.compare(password,this.password);
    return comparePass;
}

const userModel = mongoose.model("user",userSchema);
module.exports=userModel;