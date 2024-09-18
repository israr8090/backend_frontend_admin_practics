import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full Name required'],
        minlength: [4, 'Full Name must contain at least 4 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone Number required'],
    },
    designation: {
        type: String,
        required: [true, 'Designation Field is required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
    },
    course: {
        type: String,
        required: [true, 'Courese is required'],
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
});

export const employeeModel = mongoose.model("Employee", employeeSchema);