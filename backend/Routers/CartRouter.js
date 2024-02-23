const express = require('express');
const CartHandler = require('../Controllers/Cart')
const router = express.Router();
const auth = require('../MiddleWare/UserAuth')


router.post('/postCart', auth.userAccess, CartHandler.addToCartHandler)
router.get('/getCart', auth.userAccess, CartHandler.getCartHandler)
router.delete('/deleteCart', auth.userAccess, CartHandler.deleteCartHandler)

module.exports = router;