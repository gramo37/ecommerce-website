const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')

// Create order
exports.createOrder = catchAsyncError(async (req, res, next) => {
    // req.body.user = req.user;
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderStatus
    } = req.body;

    console.log(req.body, "checking order sdjvbshdc ");

    const order = await orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id,
        orderStatus
    })
    res.status(200).json({
        success: true,
        message: "Order has been created",
        order
    })
})

// Get order by ID
exports.getOrderById = catchAsyncError(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id).populate(     // Gives name and email along with id
        "user",
        "name email"
    )

    if (!order) {
        return (next(new ErrorHandler("Order not found with this id", 404)))
    }

    res.status(201).json({
        success: true,
        order
    })
})

// Get orders of logged in user
exports.getMyOrders = catchAsyncError(async (req, res, next) => {
    const orders = await orderModel.find({
        user: req.user.id
    })

    res.status(201).json({
        success: true,
        orders
    })
})

// Get all orders - Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await orderModel.find()

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += Number(order.totalPrice);
    })

    res.status(201).json({
        success: true,
        totalAmount,
        orders
    })
})

// Delete Orders - Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = await orderModel.findById(req.params.id);

    if (!order) {
        return (next(new ErrorHandler("Order Not Found", 404)))
    }

    order.remove()
    res.status(201).json({
        success: true,
        order
    })
})

// Update order status - Admin
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
    let order = await orderModel.findById(req.params.id);

    if (!order) {
        return (next(new ErrorHandler("Order Not Found", 404)))
    }

    if (order.orderStatus === "Delivered") {
        return (next(new ErrorHandler("Order Has been Delivered", 401)))
    }

    order.orderItems.forEach(async (orderItem) => {
        await updateStock(orderItem.product, orderItem.quantity)
    })

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })

    res.status(201).json({
        success: true,
        order
    })
})

async function updateStock(prod_id, quantity) {
    const product = await productModel.findById(prod_id);
    product.stock -= Number(quantity)
    await product.save({ validateBeforeSave: false })
}
