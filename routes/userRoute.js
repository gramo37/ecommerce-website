const express = require('express')
const router = express.Router();
const { createUser, fetchUsers, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, fetchUserByName, deleteUser, updateRole, getSingleUser } = require('../controllers/userController')
const { isAuthenticatedUser, authorizeRoles} = require('../middleware/auth')    // Middleware to check if user is logged In or not and authorize roles

// router.post('/signUp', createUser);
router.post('/signUp', createUser);
router.get('/showAllUsers', isAuthenticatedUser, authorizeRoles("admin"), fetchUsers)
router.post('/password/reset/', forgotPassword)
router.put('/password/reset/:resetToken', resetPassword)
router.get('/getUserDetails/',isAuthenticatedUser, getUserDetails)
router.put('/updatePassword', isAuthenticatedUser, updatePassword)
router.put('/updateProfile', isAuthenticatedUser, updateProfile)
router.post('/fetchUserByName/',isAuthenticatedUser, authorizeRoles("admin"), fetchUserByName)
router.post('/logIn', loginUser)
router.post('/logout', logoutUser)
router.post('/deleteUser/:id',  isAuthenticatedUser, authorizeRoles("admin"), deleteUser)
router.post('/updateRole/:id',  isAuthenticatedUser, authorizeRoles("admin"), updateRole)
router.post('/getSingleUser/:id',  isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)

module.exports = router;