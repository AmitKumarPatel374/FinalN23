const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sellerSchema = new mongoose.Schema({
    sellerName: {
        type: String,
        required: true
    },
    sellerUserName: {
        type: String,
        required: true,
        unique: true
    },
    sellerEmail: {
        type: String,
        required: true,
        unique: true
    },
    sellerMobile: {
        type: String,
        unique: true,
        minLength: 10,
        maxLength: 10,
        match: [/^[0-9]{10}$/, "please enter a valid phone number!"]
    },
    sellerPassword: {
        type: String,
        minLength: 6
    },
    sellerAadhar: {
        type: String,
        minLength: 12,
        maxLength: 12,
        match: [/^[0-9]{12}$/, "please enter a valid phone number!"]
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"products"
        }
    ]
}, {
    timestamps: true
})

sellerSchema.pre('save',async function(next){
    let hashadPass = await bcrypt.hash(this.password,10);
    this.password=hashadPass;
    next();
})

sellerSchema.methods.comparePass= async function(password) {
    let comparePass = await bcrypt.compare(password,this.password);
    return comparePass;
}

sellerSchema.methods.generateToken=function() {
    let token= jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:"1h"
    })
    return token;
}

const sellerModel = mongoose.model("user",sellerSchema);
module.exports=sellerModel;