const productModel = require('../models/productModel');
const categoriesModel = require('../models/categoriesModel');
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apiFeatures')
const { findById } = require('../models/orderModel')

exports.createProduct = catchAsyncError(async (req, res, next) => {

    req.body.createdBy = req.user   // Save the user who created this product
    const newCategory = req.body.category
    const categories = await categoriesModel.find();

    let isNewCategory = true
    categories.map((item)=>{
        if(item.category === newCategory){
            isNewCategory = false
            return
        }
    })

    if(isNewCategory){
        await categoriesModel.create({category: newCategory})
    }
    
    const product = await productModel.create(req.body);

    res.status(200).json({
        success: true,
        "product": product
    });

})

// Fetch all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {

    const productCount = await productModel.countDocuments()
    console.log("query", req.query)
    const apifeature = new ApiFeatures(productModel, req.query)   // Call the constructor
    .search()   // Change the query (productModel.find()) to (productModel.find({ name: { '$regex': 'pencil', '$options': 'i' }})
    .filter()   // Change the query (productModel.find()) to (productModel.find({ name: { '$regex': 'pencil', '$options': 'i' }})
    // let filteredProductCount = prods.length
    .pagination();  // Change the query (productModel.find()) to (productModel.find({ name: { '$regex': 'pencil', '$options': 'i' }})
    const products = await apifeature.query;   // Execute the changed query
    res.status(200).json({
        success: true,
        "productsCount": productCount,
        "products": products,
        // filteredProductCount
    })
});

// Fetch one product
exports.getOneProduct = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);

    if (product === null) {
        return next(new ErrorHandler("Product Not Found", 404))          // Not understood. But an effective way as it enables err.stack (shows exactly where an error has occured)
        // return next(errorHandler2(res, "Product Not Found", 404))     // Another way (not effective) to do the above thing (but err.stack will not work in this case). This is a simple function imported from middleware folder.
    }

    res.status(200).json({
        success: true,
        "product": product
    })
});

// Update product - Only Admin can access
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);

    if (product === null) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        "upDatedroduct": product
    })
});

// Delete product - Only Admin can access
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);

    if (product === null) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    product = await productModel.findByIdAndDelete(req.params.id, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        "deletedroduct": product
    })
});

// Delete all Products
exports.deleteAllProducts = catchAsyncError(
    async (req, res, next) => {
        // let products = await productModel.remove()
        let products = await productModel.deleteMany()

        res.status(200).json({
            success: true,
            "message": "Successfully Deleted All Products",
            "deletedroduct": products
        })
    }
)

// Adds or updates reviews
exports.addReviews = catchAsyncError(async (req, res, next) => {
    const review = {
        userid: req.user.id,
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment
    }

    const product = await productModel.findById(req.params.id)

    // Checking if the logged In user has already reviewed or not
    isReviewed = false
    product.reviews.forEach((review) => {
        // Change user to userid in productModel
        if (req.user.id === review.userid.toString()) {
            review.rating = req.body.rating;
            review.comment = req.body.comment;
            isReviewed = true;
            return
        }
    });

    if (!isReviewed) {
        // Adding a new review
        product.reviews.push(review)
    }

    let avg = 0
    product.reviews.forEach((review) => {
        avg += review.rating
    })
    avg = avg / product.reviews.length
    product.ratings = avg
    product.noOfReviews = product.reviews.length

    await product.save()
    res.status(200).json({
        success: true,
        "reviews": product.reviews
    })
})

// Delete Reviews
exports.deleteReviews = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.query.productId);
    if (!product) {
        return (next(new ErrorHandler("Product Not Found", 401)))
    }

    deleted = false
    product.reviews.forEach((review, index, reviews) => {
        if (req.query.userId === review.userid.toString()) {
            reviews.splice(index, 1)
            deleted = true
            return
        }
    })

    if (!deleted) {
        return (next(new ErrorHandler("User Not Found", 401)))
    }

    let avg = 0
    product.reviews.forEach((review) => {
        avg += review.rating
    })
    avg = avg / product.reviews.length
    product.ratings = avg
    product.noOfReviews = product.reviews.length


    await product.save()
    res.status(200).json({
        success: true,
    })
})

// Get all Reviews
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 401));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});

// Add product to a collection
exports.changeCollection = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
        return (next(new ErrorHandler("Product Not Found", 404)));
    }
    product.collectionName = req.body.collection
    product.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        product
    })
})

// Search Products by collectionName
exports.searchByCollection = catchAsyncError(async (req, res, next) => {

    const apifeature = new ApiFeatures(productModel, req.query);   
    apifeature.searchCollection();  
    apifeature.filter();  
    apifeature.pagination();  
    const products = await apifeature.query;   
    
    res.status(200).json({
        success: true,
        products
    })
})
