const categoriesModel = require('../models/categoriesModel');
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')

exports.getCategory = catchAsyncError(async (req, res, next) => {
    const category = await categoriesModel.find()
    
    res.status(200).json({
        success: true,
        category
    })
})