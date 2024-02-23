
const express = require('express');
const router = express.Router();
const controller = require('../Controllers/Purches')
const middle = require('../MiddleWare/UserAuth');


router.post('/', middle.userAccess, controller.Purches);
router.post('/updatetransaction', middle.userAccess, controller.transactionUpdate);

router.get('/getOrderHistory', middle.userAccess, controller.orderHistory);
router.post('/getInvoice', middle.userAccess, controller.invoice);

router.post('/orderTracking', middle.userAccess, controller.orderTracking);


module.exports = router;