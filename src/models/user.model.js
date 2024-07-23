import bcrypt from "bcrypt"
import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import conf from '../conf/conf.js'

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    // console.log(this)
    // Problem is : If some changed any field like avatar, name, etc because of "pre" hook while saving changes or updates the password will also changed again ||
    // Solution is : When someone send the modification of password field, then run this code || if there is no modification in the password filed, then don't run this code

    // Check for the password is modified or not using "isModified" method and pass the "password" as a string

    if (!this.isModified("password")) return next() // Negative checking : If password has not been modified then return "next()"

    try {
        this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
        next(error)
    }

})

// Compare user's entered password and encrypted password (using a custom method "isPasswordCorrect" which takes password as a parameter)
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) // password = which is coming from user, this.password = encrypted password coming from database
}

// generateAccessToken method
userSchema.methods.generateAccessToken = function () {
    // Token data
    const tokenData = {
        _id: this._id.toString(),
        username: this.username,
    }

    try {
        // Create token
        const token = jwt.sign(tokenData, conf.ACCESS_TOKEN_SECRET, { expiresIn: conf.ACCESS_TOKEN_EXPIRY })
        return token;
    } catch (error) {
        console.error(error)
    }
}


// generateRefreshToken method
userSchema.methods.generateRefreshToken = function () {
    // Create token data
    const tokenData = {
        _id: this._id,
    }

    // Create token
    const token = jwt.sign(tokenData, conf.REFRESH_TOKEN_SECRET, { expiresIn: conf.REFRESH_TOKEN_EXPIRY })
    return token;
}


// export const User = mongoose.models.users || mongoose.model('User', userSchema)
export const User = mongoose.model('User', userSchema)

