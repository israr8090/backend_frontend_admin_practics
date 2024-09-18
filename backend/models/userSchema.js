import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full Name required'],
        minlength: [3, 'Full Name must be at least 3 characters long'],
        maxlength: [30, 'Full Name must be less than 30 characters long']
    },
    userName: {
        type: String,
        required: [true, 'User Name required'],
        minlength: [3, 'User Name must be at least 3 characters long'],
        maxlength: [15, 'User Name must be less than 15 characters long'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        validate: {
            validator: (email) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(email);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false  //--for desible user password in token
    }
});

//--encrypting password before saving
userSchema.pre('save', async function (next) {
    //--If password is not modified then processed 
    if (!this.isModified('password')) next();

    //--generate salt
    const salt = await bcrypt.genSalt(10);
    
    //--generate hash
    this.password = await bcrypt.hash(this.password, salt);
});

//--method to compare password
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

//--method to generate json web token
userSchema.methods.generateJsonWebToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    return token;
}

export const userModel = mongoose.model("User", userSchema);