import React, { useCallback, useContext, useState } from 'react'
import { CartContext } from './Cart-Context'
import AuthContext from '../ContextStore/Auth-Context';
import { useEffect } from 'react'
import useRazorpay from "react-razorpay";
const mainUrl = 'http://localhost:4000'

export default function CartProvider(props) {

  const initialEmail = localStorage.getItem('email');
  const [items, updateItems] = useState([])
  const [total, updateTotal] = useState(0)
  const [email, updateEmail] = useState(initialEmail)
  const authCtx = useContext(AuthContext)
  const token = authCtx.isToken
  const [Razorpay] = useRazorpay();


  function addEmailHandler(eml) {
    updateEmail(eml.split('@')[0])
    localStorage.setItem('email', (eml.split('@')[0]))
  }


  function addToCartHendler(item) {
    postDataHandler(item)
  }

  async function postDataHandler(item) {
    let url = `${mainUrl}/cart/postCart`
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ items: item }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    const data = await res.json()

    const existingItemIndex = items.findIndex((i) => i._id === data.data._id)

    if (existingItemIndex === -1) {
      updateItems([...items, data.data]);
    } else {
      const updatedItem = [...items];
      updatedItem[existingItemIndex].quantity = Number(updatedItem[existingItemIndex].quantity) + 1;
    }

    let price = Number(data.data.price);
    updateTotal(total + price);
  }


  async function deleteFromCartHendler(_id) {
    let url = `${mainUrl}/cart/deleteCart`
    const res = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({ _id: _id }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    const data = await res.json()
    if (res.ok) {
      const existingIndex = items.findIndex((i) => i._id === _id)
      let updatedItem = { ...items }
      if (updatedItem[existingIndex].quantity > 1) {
        updatedItem[existingIndex].quantity = Number(updatedItem[existingIndex].quantity) - 1;
      } else {
        items.splice(existingIndex, 1)
        updateItems(items);
      }

      let price = updatedItem[existingIndex].price;
      updateTotal(total - price);
      alert(data.msg)
    }
    else {
      alert('unable to remove')
    }
  }

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const data = await fetch(`${mainUrl}/cart/getCart`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
        let res = await data.json()
        updateItems(res.items);
        updateTotal(res.total);
      }
      catch (er) {
        console.log(er)
      }
    }
    getCartItems()
  }, [email, token])



  const makeOrderHandler = useCallback(async (TotalPrice, Cartproduct) => {
    const resp = await fetch(`${mainUrl}/Purches`, {
      method: 'POST',
      body: JSON.stringify({ TotalPrice: TotalPrice, Cartproduct: Cartproduct }),
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
    const response = await resp.json()

    let option = {
      "key": response.key_id,
      "order_id": response.ord.orderId,
      "handler": async (response) => {
        const res = await fetch(`${mainUrl}/Purches/updatetransaction`, {
          method: 'POST',
          body: JSON.stringify({
            order_id: option.order_id,
            payment_id: response.razorpay_payment_id,
            status: 'SUCCESSFUL'
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        })
        await res.json()
        if (res.ok) {
          clearCartHandler()
        }
      }
    }

    const rezl = new Razorpay(option);

    rezl.open();

    rezl.on('payment.failed', async function (response) {
      fetch(`${mainUrl}/Purches/updatetransaction`, {
        method: 'POST',
        body: JSON.stringify({
          order_id: option.order_id,
          payment_id: response.razorpay_payment_id,
          status: 'FAILED'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      }
      )
        .then(alert('paymant fail'))
    })
  }, [Razorpay, token]);

  function clearCartHandler() {
    updateItems([])
    updateTotal(0)
  }

  async function getOrderHistoryHandler() {

    const res = await fetch(`${mainUrl}/Purches/getOrderHistory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    const data = await res.json()
    return (data.orderList)
  }

  async function getInvoiceHadler(orId) {
    const res = await fetch(`${mainUrl}/Purches/getInvoice`, {
      method: 'POST',
      body: JSON.stringify({ orderId: orId }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    const data = await res.json()
    return (data)
  }


  let cartcontext = {
    cartItems: items,
    TotalPrice: total,
    emailId: email,
    addToCart: addToCartHendler,
    deleteFromCart: deleteFromCartHendler,
    addEmail: addEmailHandler,
    order: makeOrderHandler,
    getOrderHistory: getOrderHistoryHandler,
    getInvoice: getInvoiceHadler,
  }
  return (
    <CartContext.Provider value={cartcontext}>
      {props.children}
    </CartContext.Provider>

  )
}
