const express = require('express')
const router = express.Router()
const profilecontroller = require('../Controllers/Profile');
const UserAuth = require('../MiddleWare/UserAuth')


router.post('/', UserAuth.userAccess, profilecontroller.completeProfle)
router.get('/', UserAuth.userAccess, profilecontroller.userProfle)

module.exports = router;