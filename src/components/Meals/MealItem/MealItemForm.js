import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

export default function MealItemForm(props) {
  const [hasError, setHasError] = useState(false);
  const enteredInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredInput = enteredInputRef.current.value;
    const enteredInputNumber = +enteredInput;
    if (
      enteredInput.trim().length === 0 ||
      enteredInputNumber < 1 ||
      enteredInputNumber > 5
    ) {
      setHasError(true);
      return;
    }
    props.onAddToCart(enteredInputNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={enteredInputRef}
        lable="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ ADD</button>
      {hasError && <p>please enter a valid amount (&gt; 0) || (&lt; 5) </p>}
    </form>
  );
}
