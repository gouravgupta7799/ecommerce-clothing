
const Cart = require('../Models/CartModel');
const User = require('../Models/AuthanticationModel');

exports.addToCartHandler = async (req, res) => {

  const title = req.body.items.title
  const price = req.body.items.price
  const imageUrl = req.body.items.imageUrl
  const size = req.body.items.size

  try {
    const activeUser = req.userId._id;
    const user = await User.findById(activeUser);


    const cartItem = new Cart({
      title: title,
      price: price,
      imageUrl: imageUrl,
      quantity: 1,
      size: size,
      userId: req.userId._id
    })
    const data = await cartItem.save()

    user.userTotalCart = user.userTotalCart + parseInt(price);
    const userTotal = await user.save()

    res.status(200).json({ data: data, total: userTotal.userTotalCart })
  }
  catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.getCartHandler = async (req, res) => {
  const activeUser = req.userId;
  try {
    const user = await User.findById(activeUser._id);
    const getUserItems = await Cart.find({ userId: activeUser._id })

    if (getUserItems) {
      res.status(200).json({ items: getUserItems, total: user.userTotalCart })
    }
    else {
      res.status(405).json({})
    }

  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.deleteCartHandler = async (req, res) => {

  try {
    const activeUser = req.userId;
    let deleted;
    const _id = req.body._id

    const user = await User.findById(activeUser._id);
    const cartItem = await Cart.findById(_id);

    if (cartItem.quantity > 1) {

      cartItem.quantity = cartItem.quantity - 1
      deleted = await cartItem.save()

    } else {

      deleted = await Cart.findByIdAndDelete(_id);
    }

    user.userTotalCart = user.userTotalCart - parseInt(cartItem.price);
    await user.save()

    if (deleted) {
      res.status(200).json({ msg: 'item deleted successfully' })
    } else {
      res.status(406).json({ msg: 'no item found' })
    }


  } catch (err) {
    res.status(500).json({ error: err })
  }
}
