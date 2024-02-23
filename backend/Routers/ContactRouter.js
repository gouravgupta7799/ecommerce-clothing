const express = require('express');
const router = express.Router();
const Auth = require('../MiddleWare/UserAuth')
const controller = require('../Controllers/Contact')

router.post('/', Auth.userAccess, controller.userComplaint);

router.post('/postcomment', Auth.userAccess, controller.postcommentHandler);
router.get('/getcomment/:id', controller.getcommentHandler)

module.exports = router;