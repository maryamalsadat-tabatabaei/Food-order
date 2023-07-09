import React, { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import ImgSrc from "../../assetes/meals.jpg";
export default function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderCartButton onClick={props.onShow} />
      </header>
      <div className={classes["main-image"]}>
        <img src={ImgSrc} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
}
