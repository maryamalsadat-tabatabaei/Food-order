import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-contex";
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const totalCartAmount = items.reduce((currentnumber, item) => {
    return currentnumber + item.amount;
  }, 0);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timeId = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timeId);
    };
  }, [items]);
  const buttonClass = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  } `;
  return (
    <button className={buttonClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalCartAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
