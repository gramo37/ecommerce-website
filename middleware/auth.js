const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('./catchAsyncErrors');
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel")

// Check if user is logged in or not ( We check for token, if token doesn't exist no user is logged In )
exports.isAuthenticatedUser = catchAsyncError(
    async (req, res, next) => {
        const token = req.cookies;
        console.log(token, "Testing");
        if (!token.token || token.token === "null") {
            return next(new ErrorHandler("Please Login to access the resource", 401));
        }

        const decodedData = jwt.verify(token.token, process.env.JWT_SECRET);

        // imp
        req.user = await UserModel.findById(decodedData.id);     // Save the user details as req.user for further needs (in the below function, productcontroller.js for storing user who created a product)

        next();
    }
)

exports.authorizeRoles = (...roles) => {                        // Using ... creates an array "roles" and stores the value (ie "admin" or "user") in that array

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} is not Authorized for this resource`, 401))
        }
        next();
    }
}