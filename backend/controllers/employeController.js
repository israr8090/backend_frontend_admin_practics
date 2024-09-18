import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import { employeeModel } from '../models/employeSchema.js';
import { v2 as cloudinary } from 'cloudinary';

//-- Create New Employe
export const createEmployee = catchAsyncErrors(async (req, res, next) => {
    //--For Avatar
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler('Employe Image Required!', 400));
    };

    //--Destructuring avatar
    const { avatar } = req.files;
    // console.log(avatar)

    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {
            folder: 'employe_image',
        }
    );

    //--If avatar in not save OR Any Error occored
    if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
        console.error(
            "Cloudinary Error",
            cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error"
        )
    };

    //--Deconstructuring 
    const { fullName, email, phone, designation, gender, course } = req.body;

    //--Creating Employe
    const newEmployee = await employeeModel.create({
        fullName,
        email,
        phone,
        designation,
        gender,
        course,
        avatar: {
            public_id: cloudinaryResponseForAvatar.public_id,
            url: cloudinaryResponseForAvatar.secure_url,
        }
    });

    res.status(201).json({
        success: true,
        message: 'New Employe created successfully',
        employe: newEmployee,
    });
});

//-- Get All Employes
export const getAllEmployees = catchAsyncErrors(async (req, res, next) => {
    const employees = await employeeModel.find({});

    //-- If no employees found
    if (!employees) {
        return next(new ErrorHandler("No Employees Found..!", 404));
    }

    //-- Sending Employees to client with count and employees array
    res.status(200).json({
        success: true,
        message: "Employees fetched successfully..!",
        count: employees.length,
        employees,
    });
});

//-- Get Single Employe
export const getSingleEmployee = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;  //--

    const employee = await employeeModel.findById(id); 
    
    //-- If no employee found
    if (!employee) {
        return next(new ErrorHandler("No Employee Found with this ID..!", 404));
    }
    
    //-- Sending Employee to client
    res.status(200).json({
        success: true,
        message: "Employee fetched successfully..!",
        employee,
    });
});

//-- Update Employe
export const updateEmployee = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;  //--

    //--Deconstructuring
    const newEmployeeData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        designation: req.body.designation,
        gender: req.body.gender,
        course: req.body.course,
    }

    //--For Avatar
    if (req.files && req.files.avatar) {
        const avatar = req.files.avatar;
        const employee = await employeeModel.findById(id);
        const profileImageId = employee.avatar.public_id;

        //--Delete old profile image from cloudinary
        await cloudinary.uploader.destroy(profileImageId);

        //--Upload new profile image to cloudinary
        const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            {
                folder: 'employe_image',
            }
        );

        //--Update employee with new avatar
        newEmployeeData.avatar = {
            public_id: cloudinaryResponseForAvatar.public_id,
            url: cloudinaryResponseForAvatar.secure_url,
        };
        await employee.save();
    };

    //--Updating Employee
    const updatedEmployee = await employeeModel.findByIdAndUpdate(id, newEmployeeData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    //---Sending response with updated employee
    res.status(200).json({
        success: true,
        message: 'Employe updated successfully',
        employee: updatedEmployee,
    });
});

//-- Delete Single Employe
export const deleteEmployee = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;  //--

    //--Finding Employee
    const employee = await employeeModel.findById(id);
    
    //-- If no employee found
    if (!employee) {
        return next(new ErrorHandler("No Employee Found with this ID..!", 404));
    }
    
    //--Delete employee from database
    await employee.deleteOne();
    
    //--Delete profile image from cloudinary
    await cloudinary.uploader.destroy(employee.avatar.public_id);
    
    //--Sending response
    res.status(200).json({
        success: true,
        message: 'Employe deleted successfully',
    });
});