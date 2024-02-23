
const express = require('express');
const router = express.Router();
const controller = require('../Controllers/Products')


router.post('/storeItems', controller.productsStore)
router.post('/getItems', controller.productsAvailable)
router.get('/getSingleProduct/:id', controller.getSingleProduct)

router.post('/searchProduct', controller.searchProduct)

module.exports = router;