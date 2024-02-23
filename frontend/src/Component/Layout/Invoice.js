import React, { useContext, useEffect, useState } from 'react'
import classes from './Invoice.module.css'
import { CartContext } from '../ContextStore/Cart-Context';

export default function Invoice(props) {

  const [userDetails, setUserDetail] = useState([])
  const [items, setItems] = useState([])
  const CartCtx = useContext(CartContext);


  const invoice = async () => {
    const invoice = await CartCtx.getInvoice(props.invoiceOrdId)
    setUserDetail(invoice.userDetails)
    setItems(...invoice.orderInvoice)
  }
  let total = 0;
  if (items !== undefined) {
    items.map(i => {
      return total += Number(i.price)
    })
  }

  useEffect(() => {
    invoice()
  }, [])

  return (
    <React.Fragment>

      <div id={classes["headerimage"]}></div>
      <div id={classes["invoice"]} className={classes["effect2"]}>

        <div id={classes["invoice-top"]}>
          <div className={classes["title"]}>
            <h1>Invoice #1069</h1>
            <p>Issued: feb 22, 2024
            </p>
          </div>
        </div>


        <div id={classes["invoice-mid"]}>

          <div className={classes["clientlogo"]}></div>
          <div className={classes["info"]}>
            <h2>{userDetails.displayName}</h2>
            <p>{userDetails.userEmail}</p>
            <p>{userDetails.userNumber}</p>
          </div>

          <div id={classes["project"]}>
            <h2>company details</h2>
            <p>Phone: 93432xx322</p>
            <p>Email: ecommercecloth@gmail.com</p>
            <p>Near indore-dewas bypass</p>
          </div>

        </div >

        <div id={classes["invoice-bot"]}>

          <div id={classes["table"]}>
            <table>
              <tr className={classes["tabletitle"]}>
                <td className={classes["item"]}><h2>imageUrl</h2></td>
                <td className={classes["Hours"]}><h2>title</h2></td>
                <td className={classes["Rate"]}><h2>quantity</h2></td>
                <td className={classes["subtotal"]}><h2>price</h2></td>
              </tr>

              {items !== undefined && items.map((listItem) => {
                return (
                  <tr className={classes["service"]}>
                    <td className={classes["tableitem"]}><img className={`${classes["itemtext"]} ${classes['img']}`} src={listItem.imageUrl} alt="imageUrl" /></td>
                    <td className={classes["tableitem"]}><p className={classes["itemtext"]}>{listItem.title}</p></td>
                    <td className={classes["tableitem"]}><p className={classes["itemtext"]}>{listItem.quantity}</p></td>
                    <td className={classes["tableitem"]}><p className={classes["itemtext"]}>{listItem.price}</p></td>
                  </tr>
                )
              })}

              <tr className={classes["tabletitle"]}>
                <td></td>
                <td></td>
                <td className={classes["Rate"]}><h2>Total</h2></td>
                <td className={classes["payment"]}><h2>${total}</h2></td>
              </tr>

            </table>
          </div>
          <div id={classes["legalcopy"]}>
            <p className={classes["legal"]}><strong>Thank you for your business!</strong>  Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
