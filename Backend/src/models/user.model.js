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