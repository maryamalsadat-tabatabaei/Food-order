//form validation onSubmit

import React, { useRef, useState } from "react";
import classes from "./FormCart.module.css";
const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;
export default function FormCart(props) {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (e) => {
    e.preventDefault();

    const nameValue = nameInputRef.current.value;
    const streetValue = streetInputRef.current.value;
    const postalValue = postalInputRef.current.value;
    const cityValue = cityInputRef.current.value;

    const validName = !isEmpty(nameValue);
    const validStreet = !isEmpty(streetValue);
    const validPostal = isFiveChar(postalValue);
    const validCity = !isEmpty(cityValue);
    setFormInputValidity({
      name: validName,
      street: validStreet,
      postal: validPostal,
      city: validCity,
    });
    const isFormValid = validName && validCity && validPostal && validStreet;
    if (!isFormValid) {
      return;
    }
    //submit the form
    props.onConfirm({
      name: nameValue,
      street: streetValue,
      postal: postalValue,
      city: cityValue,
    });
  };

  const nameClasses = `${classes.control} ${
    formInputValidity.name ? " " : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    formInputValidity.street ? " " : classes.invalid
  }`;
  const postalClasses = `${classes.control} ${
    formInputValidity.postal ? " " : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    formInputValidity.city ? " " : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Input should not be empty!...</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Input should not be empty!...</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && <p>Input should be 5 char!...</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Input should not be empty!...</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}
