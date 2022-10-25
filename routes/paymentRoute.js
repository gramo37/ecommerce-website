const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController")

router.post("/payment", isAuthenticatedUser, processPayment)
router.get("/sendApiKey", isAuthenticatedUser, sendStripeApiKey)

module.exports = router;