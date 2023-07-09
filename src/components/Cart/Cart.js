import Modal from "../UI/Modal";
import CartContext from "../../store/cart-contex";
import CartItem from "../Cart/CartItem";
import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import FormCart from "./FormCart";
import FormChecked from "./FormChecked";
const Cart = (props) => {
  const [isFormChecked, setIsFormChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const addItemHandler = (item) => {
    const updateAmount = { ...item, amount: 1 };
    cartCtx.addToCart(updateAmount);
  };
  const removeItemHandler = (id) => {
    cartCtx.removeFromCart(id);
  };
  const orderHandler = () => {
    setIsFormChecked(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-5f6a7-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isFormChecked && (
        // <FormCart onConfirm={submitOrderHandler} onCancel={props.onClose} />
        <FormChecked onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isFormChecked && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <>
      <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
      </Modal>
    </>
  );
};

export default Cart;
