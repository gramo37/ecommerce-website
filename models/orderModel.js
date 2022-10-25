const mongoose = require('mongoose')
// 3 changes to be done here remember that

const orderSchema = new mongoose.Schema({
    itemPrice: {
        type: String,
        required: true
    },
    taxPrice: {
        type: String,
        required: true
    },
    shippingPrice: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        }
    },
    orderItems: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        quantity: {
            type: String,
            required: true
        }
    }],
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status:{
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    paidAt: {
        type: Date,
        required: true
    },
    deliveredAt:Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;