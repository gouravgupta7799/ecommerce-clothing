
const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ForgetPassword')

router.use('/forgotpassword', controller.forgetPassword);
router.get('/resetPasswordlink/:id', controller.getresetPassword);
router.post('/resetPassword', controller.postresetPassword);


module.exports = router;