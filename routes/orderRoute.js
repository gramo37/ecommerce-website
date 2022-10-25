const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles} = require('../middleware/auth')
const { createOrder, getOrderById, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController')

router.post('/createOrder', isAuthenticatedUser, createOrder)
router.get('/getOrderById/:id', isAuthenticatedUser, getOrderById)
router.get('/getMyOrders', isAuthenticatedUser, getMyOrders)
router.get('/getAllOrders', isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)
router.delete('/deleteOrder/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)
router.put('/updateOrderStatus/:id', isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus)


module.exports = router;