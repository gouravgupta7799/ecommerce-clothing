
const Razorpay = require('razorpay');
const Order = require('../Models/PurchesModel');
const Cart = require('../Models/CartModel')
const User = require('../Models/AuthanticationModel')

exports.Purches = async (req, res, next) => {

  try {

    let rzp = new Razorpay({
      key_id: process.env.ROZARPAY_ID,
      key_secret: process.env.ROZARPAY_SECRET
    })
    const amount = req.body.TotalPrice * 100
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        return res.status(500).json({ 'error': err })
      }
      let ord = new Order({
        orderId: order.id,
        status: 'PENDING',
        userId: req.userId._id,
        orderDetails: req.body.Cartproduct,
        total: req.body.TotalPrice
      })
      ord.save()
      return res.status(201).json({ ord, key_id: rzp.key_id })
    })
  }
  catch (err) {
    res.status(500).json({ 'error': err })
  }
}

exports.transactionUpdate = async (req, res, next) => {

  try {

    let orderPlaced = 'Order Placed Failed'
    if (req.body.status === 'SUCCESSFUL') {
      orderPlaced = 'Order Placed'
    }

    let order = await Order.findOne({ orderId: req.body.order_id })

    order.paymantId = req.body.payment_id;
    order.status = req.body.status;
    order.placed = orderPlaced;
    await order.save()

    const user = await User.findById(req.userId._id);

    if (req.body.status === 'SUCCESSFUL') {
      user.userTotalCart = 0;
      await user.save()
      await Cart.deleteMany({ userId: req.userId._id })
    }

    res.status(202).json(`transection ${req.body.status}`)
  }
  catch (err) {
    res.status(500).json({ 'error': err })
  };
};


exports.orderHistory = async (req, res) => {

  try {
    const orderList = await Order.find({ userId: req.userId._id, status: { $ne: 'PENDING' } })

    if (orderList) {
      res.status(200).json({ orderList: orderList })
    } else {
      res.status(404).json({ msg: 'no order placed before' })
    }

  } catch (err) {
    res.status(500).json({ 'error': err })
  };
}


exports.orderTracking = async (req, res) => {

  try {

    let orderPlaced = req.body.orderPlacedStatus;

    let orderStatus = await Order.findOne({ orderId: req.body.order_id })
    orderStatus.placed = orderPlaced;

    await orderStatus.save()

    if (orderStatus) {
      res.status(200).json({ msg: 'orderStatus updated' })
    } else {
      res.status(404).json({ msg: 'no order placed before' })
    }


  } catch (err) {
    res.status(500).json({ 'error': err })
  };
}


exports.invoice = async (req, res) => {

  try {
    const findUser = req.userId;
    const user = { displayName: findUser.displayName, userEmail: findUser.userEmail, userAddress: findUser.userAddress, userNumber: findUser.userNumber }


    const orderList = await Order.find({ orderId: req.body.orderId, userId: req.userId._id, status: 'SUCCESSFUL' })
    const list = orderList.map((item) => { return item.orderDetails })

    res.status(200).json({ userDetails: user, orderInvoice: [...list] })
  }
  catch (err) {
    res.status(500).json({ 'error': err })
  };
}

