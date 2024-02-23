import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../ContextStore/Cart-Context';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';


export default function Order(props) {

  const history = useNavigate()
  const [oderListItems, setorderList] = useState([])
  const CartCtx = useContext(CartContext);

  const order = async () => {
    const orders = await CartCtx.getOrderHistory()
    setorderList(orders)
  }
  useEffect(() => {
    order()
  }, [])

  async function showEnvoice(orId) {
    props.setInvoiceOrdId(orId)
    history('/invoice')

  }
  return (
    <Table responsive="lg">
      <tr>
        <th>#</th>
        <th>orderId</th>
        <th>paymantId</th>
        <th>status</th>
        <th>Order</th>
        <th>orderDetails</th>
      </tr>
      <tbody>
        {Object.keys(oderListItems).map((item) => {
          return (
            <tr>
              <td>1</td>
              <td>{oderListItems[item].orderId}</td>
              <td>{oderListItems[item].paymantId}</td>
              <td>{oderListItems[item].status}</td>
              <td>{oderListItems[item].placed}</td>
              <td>{oderListItems[item].orderDetails.length} items</td>
              {oderListItems[item].status === 'SUCCESSFUL' && <td><button onClick={() => showEnvoice(oderListItems[item].orderId)}>Show envoice</button></td>}
            </tr>
          )
        })}
      </tbody>
    </Table >
  )
}
