import React, { useReducer } from "react";
import CartContext from "./cart-contex";
const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingItem = state.items[existingItemIndex];
      let updatedItems;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, action.item];
      }
      const updatedTotalAmount =
        state.totalAmount + action.item.amount * action.item.price;

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    case "REMOVE": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter(
          (item) => item.id !== existingCartItem.id
        );
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    case "CLEAR":
      return defaultState;
    default:
      return defaultState;
  }
};
export default function CartProvider(props) {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultState);
  const addItemHandler = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartState({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addToCart: addItemHandler,
    removeFromCart: removeItemHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
