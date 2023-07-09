import React from "react";
import classes from "./Spinner.module.css";
export default function Spinner() {
  return (
    <section className={classes.center}>
      <div className={classes.loading} />
      <div>loading ...</div>
    </section>
  );
}
