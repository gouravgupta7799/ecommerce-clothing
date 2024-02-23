

const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../Models/AuthanticationModel');


function generateToken(id) {
  return JWT.sign({ userId: id }, process.env.JWTPasscode)
}


exports.signupHandler = async (req, res) => {

  const checkEmail = req.body.email;
  const passCode = req.body.password;

  try {
    if (checkEmail.trim().length <= 0 || passCode.trim().length <= 0) {
      return res.status(401).json({ error: 'invalid email or password' })
    }
    const foundEmail = await User.findOne({ userEmail: checkEmail }).exec();

    if (foundEmail) {
      return res.status(401).json({ error: 'user alredy exixt email found' });
    }
    else {
      const salt = 5;
      bcrypt.hash(passCode, salt, async (err, hash) => {
        const user = new User({
          displayName: req.body.name,
          userEmail: req.body.email,
          userPassword: hash,
          userTotalCart: 0
        })
        await user.save();
        res.status(200).json({ isPrime: user.isPrime, email: user.userEmail, _id: user._id, idToken: generateToken(user._id) });
      })
    }
  }

  catch (err) {
    res.status(500).json({ 'error': err })
  }
}


exports.loginHandler = async (req, res) => {

  const checkEmail = req.body.email;
  const passCode = req.body.password;

  try {
    if (checkEmail.trim().length <= 0 || passCode.trim().length <= 0) {
      return res.status(401).json({ error: 'invalid email or password' })
    }
    const foundEmail = await User.findOne({ userEmail: checkEmail }).exec();

    if (!foundEmail) {
      return res.status(401).json({ error: 'user not found' });
    }
    if (foundEmail) {
      bcrypt.compare(passCode, foundEmail.userPassword, async (err, pass) => {
        if (pass) {
          return res.status(200).json({ success: true, email: foundEmail.userEmail, msg: "created sucsessfully", idToken: generateToken(foundEmail._id) })
        }
        else {
          return res.status(401).json({ error: 'invalid password' });
        }
      })
    } else {
      return res.status(401).json({ error: 'invalid credential, try after sometime' });
    }
  }

  catch (err) {
    res.status(401).json({ 'error': err })
  }
}