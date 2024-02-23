
const JWT = require('jsonwebtoken');
const User = require('../Models/AuthanticationModel');

exports.userAccess = async (req, res, next) => {
  try {
    const idToken = req.header('Authorization');
    // console.log('jwtToken>>>>',idToken)

    const details = JWT.decode(idToken, process.env.JWTPasscode);
    // console.log(details);


    const userDetail = await User.findById(details.userId)
    // console.log('user>>>', userDetail)

    if (userDetail) {
      req.userId = userDetail
      next()
    } else {
      throw new Error('user not found login again')
    }
  }
  catch (err) {
    return res.status(500).json({ error: err })
  }
}

