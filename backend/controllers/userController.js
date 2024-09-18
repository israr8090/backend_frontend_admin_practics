import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import { userModel } from '../models/userSchema.js';
import { generateToken } from '../utils/jwtToken.js';

//-- New User Registration Method
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { fullName, userName, email, password } = req.body;

    // Create a new user
    const newUser = await userModel.create({ fullName, userName, email, password });

    // Generate and send JWT
    generateToken(newUser, "User Registered Successfully...", 201, res);
});

//--User Login Method
export const logInUser = catchAsyncErrors(async (req, res, next) => {

    //--Destructuring
    const { userName, password } = req.body;

    //--Checking if userName and password are provided
    if (!userName || !password) {
        return next(new ErrorHandler('Please provide both username and password', 400));
    }

    //--finding user in database
    const user = await userModel.findOne({ userName }).select('+password');

    //--If user not found OR passwword is not same
    if (!user || !await user.comparePassword(password)) {
        return next(new ErrorHandler('Invalid credentials', 401));
    }

    //--Generate and send JWT
    generateToken(user, "User Logged In Successfully...", 200, res);
});

//--Get User fot admin
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({
        success: true,
        user
    })
});

//--User Logout Method
export const logOutUser = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true, // secure: true for https
    }).json({
        success: true,
        message: "User Logged Out Successfully...",
    });
});

//--User Profile Method