import React from "react";
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addToCart: (item) => {},
  removeFromCart: (id) => {},
  clearCart: () => {},
});

export default CartContext;
