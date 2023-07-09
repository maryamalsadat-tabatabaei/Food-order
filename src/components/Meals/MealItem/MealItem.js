import React, { useContext } from "react";
import CartContext from "../../../store/cart-contex";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

export default function MealItems(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${Number(props.price).toFixed(2)}`;
  const addToCarthandler = (amount) => {
    cartCtx.addToCart({
      id: props.id,
      name: props.name,
      amount: amount,
      price: Number(props.price),
      description: props.description,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <MealItemForm onAddToCart={addToCarthandler} />
    </li>
  );
}
