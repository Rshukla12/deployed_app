const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    avatar: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;