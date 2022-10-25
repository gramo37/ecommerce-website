const express = require('express')
const { getAllProducts, createProduct, updateProduct, deleteProduct, getOneProduct, deleteAllProducts, addReviews, deleteReviews, getAllReviews, changeCollection, searchByCollection} = require('../controllers/productController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles} = require('../middleware/auth')    // Middleware to check if user is logged In or not and authorize roles
const { getCategory } = require('../controllers/categoryController')

router.get('/products', getAllProducts)
router.get('/categories', getCategory)
router.post('/createProduct', createProduct)
// router.post('/createProduct', isAuthenticatedUser, authorizeRoles("admin"), createProduct)
router.put('/updateProduct/:id', isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
router.delete('/deleteProduct/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
router.get('/getProductById/:id', getOneProduct)
router.delete('/deleteAllProducts', isAuthenticatedUser, authorizeRoles("admin"), deleteAllProducts)
router.post('/addReviews/:id', isAuthenticatedUser, addReviews)
router.post('/deleteReviews/', isAuthenticatedUser, authorizeRoles("admin"), deleteReviews)
router.get('/getAllReviews', isAuthenticatedUser, getAllReviews)
router.put('/changeCollection/:id', isAuthenticatedUser, authorizeRoles("admin"), changeCollection)
router.get('/searchByCollection/', searchByCollection)

module.exports = router;