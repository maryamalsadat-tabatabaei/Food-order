import React from "react";
import classes from "./FormCart.module.css";
import useInput from "../../hooks/use-input";
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

export default function FormChecked(props) {
  const {
    value: nameInputValue,
    isValid: nameInputIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    resetHandler: nameInputResetHandler,
  } = useInput(isNotEmpty);

  const {
    value: cityInputValue,
    isValid: cityInputIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityInputChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
    resetHandler: cityInputResetHandler,
  } = useInput(isNotEmpty);

  const {
    value: postalInputValue,
    isValid: postalInputIsValid,
    hasError: postalInputHasError,
    valueChangeHandler: postalInputChangeHandler,
    inputBlurHandler: postalInputBlurHandler,
    resetHandler: postalInputResetHandler,
  } = useInput(isNotEmpty);

  const {
    value: streetInputValue,
    isValid: streetInputIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetInputChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    resetHandler: streetInputResetHandler,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    nameInputIsValid &&
    streetInputIsValid &&
    cityInputIsValid &&
    postalInputIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(
      nameInputValue,
      streetInputValue,
      postalInputValue,
      cityInputValue
    );

    streetInputResetHandler();
    cityInputResetHandler();
    nameInputResetHandler();
    postalInputResetHandler();

    props.onConfirm({
      name: nameInputValue,
      street: streetInputValue,
      postal: postalInputValue,
      city: cityInputValue,
    });
  };

  const nameClasses = `${classes.control} ${
    nameInputIsValid ? " " : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    streetInputIsValid ? " " : classes.invalid
  }`;
  const postalClasses = `${classes.control} ${
    postalInputIsValid ? " " : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    cityInputIsValid ? " " : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameInputValue}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasError && <p>Input should not be empty!...</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetInputValue}
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {streetInputHasError && <p>Input should not be empty!...</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalInputValue}
          onChange={postalInputChangeHandler}
          onBlur={postalInputBlurHandler}
        />
        {postalInputHasError && <p>Input should be 5 char!...</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityInputValue}
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {cityInputHasError && <p>Input should not be empty!...</p>}
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
