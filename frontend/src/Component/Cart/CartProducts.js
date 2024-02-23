import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CartContext } from '../ContextStore/Cart-Context';
import classes from './Cart.product.module.css'

const Cart = () => {
  const CartCtx = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [chackedBox1, setChacked1] = useState(false)
  const [chackedBox2, setChacked2] = useState(false)
  const [chackedBox3, setChacked3] = useState(false)
  const [mainChacked, setMainChacked] = useState(0)

  const handleRemoveItem = (id) => {
    CartCtx.deleteFromCart(id)
  };

  const orderCarthandler = (Cartproduct, orderPrice) => {
    let TotalPrice;
    if (mainChacked !== 0) {
      TotalPrice = mainChacked
    } else {
      TotalPrice = orderPrice
    }

    CartCtx.order(TotalPrice, Cartproduct)

    setChacked1(false)
    setChacked2(false)
    setChacked3(false)
    setMainChacked(0)
  }

  let total = 0;
  if (CartCtx.cartItems !== undefined) {
    CartCtx.cartItems.forEach(it => {
      total += it.quantity
    })
  }


  function changeHandler1(e) {
    setChacked1(e.target.checked)
    if (chackedBox1 === false) {
      let result = ((20 / 100) * CartCtx.TotalPrice);
      setMainChacked(Math.round(CartCtx.TotalPrice - result, 2))
    } else if (chackedBox1 === true) {
      setMainChacked(0)
    }

    setChacked2(false)
    setChacked3(false)

  }
  function changeHandler2(e) {
    setChacked2(e.target.checked)
    if (chackedBox2 === false) {
      let result = ((25 / 100) * CartCtx.TotalPrice);
      setMainChacked(Math.round(CartCtx.TotalPrice - result, 2))
    } else if (chackedBox2 === true) {
      setMainChacked(0)
    }

    setChacked1(false)
    setChacked3(false)

  }
  function changeHandler3(e) {
    setChacked3(e.target.checked)
    if (chackedBox3 === false) {
      let result = ((30 / 100) * CartCtx.TotalPrice);
      setMainChacked(Math.round(CartCtx.TotalPrice - result, 2))
    } else if (chackedBox3 === true) {
      setMainChacked(0)
    }

    setChacked2(false)
    setChacked1(false)

  }

  return (

    <div className="d-flex align-items-center" >
      <span className="badge bg-primary" onClick={handleShow}>
        <h5>🛒</h5>
        {total}

      </span>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {CartCtx.cartItems !== undefined && CartCtx.cartItems.map((item) => (
            <div className='border m-1 p-1'
              key={item._id}>
              <p>{item.title}</p>
              <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <img src={item.imageUrl} alt={item.title} style={{ width: '50px', marginRight: '10px' }} />
                  <div>
                    <p>Price: ${Number(item.price)}</p>
                  </div>
                  <div className="m-2">
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="m-2">
                    <p>Size: {item.size}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <p>Total Price: ${Number(item.price) * item.quantity}</p>
                  </div>
                  <Button variant="danger" onClick={() => handleRemoveItem(item._id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}>
            {CartCtx.TotalPrice > 2500 && <div className={chackedBox1 ? `${classes['ckeckboxafterCheckef']}` :
              `${classes['ckeckboxBeforChecked']}`}>

              {!chackedBox2 && !chackedBox3 && <input
                type="checkbox"
                chacked={chackedBox1}
                defaultChecked={chackedBox1}
                onChange={changeHandler1}
              />}20% off coupon is valid till 2024
            </div>}

            {CartCtx.TotalPrice > 5000 && <div className={chackedBox2 ? `${classes['ckeckboxafterCheckef']}` :
              `${classes['ckeckboxBeforChecked']}`}>

              {!chackedBox1 && !chackedBox3 && <input
                type="checkbox"
                chacked={chackedBox2}
                defaultChecked={chackedBox2}
                onChange={changeHandler2}
              />}25% flat off on using HDFC Credit Card
            </div>}

            {CartCtx.TotalPrice > 10000 && <div className={chackedBox3 ? `${classes['ckeckboxafterCheckef']}` :
              `${classes['ckeckboxBeforChecked']}`}>

              {!chackedBox2 && !chackedBox1 && <input
                type="checkbox"
                chacked={chackedBox3}
                defaultChecked={chackedBox3}
                onChange={changeHandler3}
              />}30% off on puches more then 20000
            </div>}
          </div>
          <div className="d-flex justify-content-between w-100">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              {mainChacked !== 0 ? <h3>Grand Total: ${mainChacked}</h3> : <h3>Total: ${CartCtx.TotalPrice}</h3>}
              {mainChacked !== 0 ? <h4 h4 style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'line-through',
                margin: '0 5px',
                padding: '0 5px'
              }}>Total: ${CartCtx.TotalPrice}</h4> : ''}
            </div>
            <Button variant="success" onClick={() => { orderCarthandler(CartCtx.cartItems, CartCtx.TotalPrice) }}>
              Order
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div >
  )

}

export default Cart;