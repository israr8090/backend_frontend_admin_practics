import { catchAsyncErrors } from './catchAsyncErrors.js';
import ErrorHandler from './error.js';
import jwt from 'jsonwebtoken';
import {userModel} from '../models/userSchema.js';

// Middleware to authenticate JWT
export const isAuthenticated = catchAsyncErrors( async (req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return next(new ErrorHandler('You are not Authenticated! Please log in', 400));
    };

    //--decoding user token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //--finding user in database and store in req.user
    req.user = await userModel.findById(decoded.id);

    next();
});