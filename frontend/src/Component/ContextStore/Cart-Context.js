
import React from "react";

export const CartContext = React.createContext({
  cartItems: [],
  TotalPrice: 0,
  emailId: null,
  addToCart: () => { },
  deleteFromCart: () => { },
  addEmail: () => { },
  order: () => { },
  getOrderHistory: () => { },
  getInvoice: () => { },
})