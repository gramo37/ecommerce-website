const userModel = require('../models/userModel');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');
const { sendToken } = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const ApiFeatures = require('../utils/apiFeatures')
const cloudinary = require("cloudinary")

// Signup
exports.createUser = catchAsyncError(
    async (req, res, next) => {

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        })

        const { name, email, password } = req.body;

        const user = await userModel.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            createdAt: Date.now(),
            lastUpdated: Date.now()
        })
        sendToken(user, res, 200)  // Get and save token in cookie
    }
)

// Login
exports.loginUser = catchAsyncError(
    async (req, res, next) => {
        const { email, password } = req.body;
        // Check if email and password recieved
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter a Email or Password", 404))
        }

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            // Dont know why the cookie is getting deleted at this step
            return (next(new ErrorHandler("Invalid Email or Password", 401)))
        }
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Please Enter a correct Email or Password", 401))
        }

        sendToken(user, res, 201)  // Get and save token in cookie
    }
)

// Logout
exports.logoutUser = catchAsyncError(
    async (req, res, next) => {

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            "message": "Successfully Logged Out"
        })
    }
)

// Fetch all users
exports.fetchUsers = catchAsyncError(
    async (req, res, next) => {

        const user = await userModel.find()

        res.status(200).json({
            success: true,
            "user": user
        })
    }
)

// Fetch user by name
exports.fetchUserByName = catchAsyncError(
    async (req, res, next) => {
        const apiFeatures = new ApiFeatures(userModel, req.query);
        apiFeatures.search();
        const users = await apiFeatures.query;
        // const user = await userModel.find({
        // }) 

        res.status(200).json({
            success: true,
            users
        })
    }
)

// Get reset Password Token
exports.forgotPassword = catchAsyncError(
    async (req, res, next) => {
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            return next(new ErrorHandler("User Not Found", 404));
        }

        // Get ResetPassword Token
        const resetToken = await user.getResetPasswordToken();

        // We need to save the user as some new variables are added to the user in getResetPasswordToken() [namely: resetPasswordToken, resetPasswordExpire]
        await user.save({ validateBeforeSave: false });
        const resetPasswordURL = `${process.env.FRONTEND_URL}/api/v2/password/reset/${resetToken}`;
        // const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v2/password/reset/${resetToken}`;

        const message = `Reset Password using: \n\n${resetPasswordURL}. \n\n Ignore if not requested.`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Recovery",
                message
            });

            res.status(200).json({
                success: true,
                message: `Email sent successfully`
                // message: `Email sent to ${user.email} successfully`
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined
            await user.save({ validateBeforeSave: false });

            return next(new ErrorHandler(error.message, 500))
        }
    }
)

// Reset Password
exports.resetPassword = catchAsyncError(
    async (req, res, next) => {
        // Creating token hash of the provided token
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

        // Find the user
        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return next(new ErrorHandler("Invalid token or expires token", 404));
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Passwords are not matching.", 404));
        }

        user.password = req.body.password;    // Change the password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save()

        sendToken(user, res, 200)
    }
)

// Get User details
exports.getUserDetails = catchAsyncError(
    async (req, res, next) => {
        const user = await userModel.findById(req.user.id);    // User is stored in req.user while logging in. Check auth.js
        res.status(200).json({
            success: true,
            "user": user
        })
    }
)

// Update User Password
exports.updatePassword = catchAsyncError(
    async (req, res, next) => {
        const user = await userModel.findById(req.user.id).select("+password");    // User is stored in req.user while logging in. Check auth.js

        // Check Current Password
        const isPasswordMatched = await user.comparePassword(req.body.currentPassword);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Please Enter Correct Current Password", 401))
        }

        // Check newPassword and confirmPassword
        if (req.body.currentPassword === req.body.newPassword) {
            return next(new ErrorHandler("Old and New Password is the same.", 401))
        }

        if (req.body.confirmPassword !== req.body.newPassword) {
            return next(new ErrorHandler("New Password and Current Password are not matching", 401))
        }

        // Change Password
        user.password = req.body.newPassword;    // Change the password

        user.lastUpdated = Date.now()

        await user.save()

        sendToken(user, res, 200)
    }
)

// Update User Profile
exports.updateProfile = catchAsyncError(
    async (req, res, next) => {

        let newUserData = {}

        if (req.body.avatar === "") {
            newUserData = {
                name: req.body.name,
                email: req.body.email
            }
        } else {

            const tempUser = await userModel.findById(req.user.id);

            const imageId = tempUser.avatar.public_id;

            await cloudinary.v2.uploader.destroy(imageId)

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale"
            })

            newUserData = {
                name: req.body.name,
                email: req.body.email,
                avatar: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                },
                lastUpdated: Date.now()
            }
        }

        const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            user
        })
    }
)

// Delete User
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    let user = await userModel.findById(req.params.id)
    if (user === null) {
        return next(new ErrorHandler(`User does not exists with id: ${req.params.id}`, 401))
    }

    if (req.user.id === req.params.id) {
        return next(new ErrorHandler("You can't delete yourself", 401))
    }

    if (req.user.id !== req.params.id) {
        let user = await userModel.findByIdAndDelete(req.params.id, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            user
        })
    }
})

// Update role
exports.updateRole = catchAsyncError(
    async (req, res, next) => {

        const newUserData = {
            role: req.body.role
        }

        const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            user
        })
    }
)

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await userModel.findById(req.params.id);

    if (!user) {
        return (next(new ErrorHandler(`User Not Found with id: ${req.params.id}`, 401)))
    }

    res.status(200).json({
        success: true,
        user
    })
})