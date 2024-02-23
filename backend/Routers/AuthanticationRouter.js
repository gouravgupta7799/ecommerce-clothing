const express = require('express')
const router = express.Router()
const loginSignupController = require('../Controllers/LoginSignup')


router.post('/login', loginSignupController.loginHandler);
router.post('/signup', loginSignupController.signupHandler)

module.exports = router;