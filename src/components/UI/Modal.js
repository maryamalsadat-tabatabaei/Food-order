import React from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const renderElement = document.getElementById("overlays");
export default function Modal(props) {
  return (
    <>
      {reactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        renderElement
      )}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        renderElement
      )}
    </>
  );
}
