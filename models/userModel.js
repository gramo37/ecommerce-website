const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more number of characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date
    },
    lastUpdated: {
        type: Date
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// A event that will run before a user is saved in database
userSchema.pre("save", async function (next) {

    // imp: this.password is the password associated with logged in user or registered user

    if (!this.isModified("password")) {                    // If password is not modified then go to the next lines of code 
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);  // If Password is modified again hash it
})

// Returns JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Compare Passwords
userSchema.methods.comparePassword = async function (password) {

    // imp: this.password is the password associated with logged in user or registered user

    return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = async function (password) {

    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema    
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex"); // imp: this.resetPasswordToken is the password associated with logged in user or registered user

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // imp: this.resetPasswordExpire is the password associated with logged in user or registered user

    return resetToken;
}

const userModel = new mongoose.model("User", userSchema);   // Creates a collection with name: "Users"

module.exports = userModel;