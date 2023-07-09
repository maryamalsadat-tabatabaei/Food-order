import { useReducer } from "react";
const initialState = {
  value: "",
  isTouched: false,
};
const inputReducer = (state, action) => {
  switch (action.type) {
    case "RESET": {
      return initialState;
    }
    case "INPUT": {
      return { value: action.value, isTouched: state.isTouched };
    }
    case "BLUR": {
      return { value: state.value, isTouched: true };
    }
    default:
      return initialState;
  }
};
const useInput = (validateValue) => {
  const [inputState, dispatchedAction] = useReducer(inputReducer, initialState);
  const isValueValid = validateValue(inputState.value);
  const hasError = !isValueValid && inputState.isTouched;

  const valueChangeHandler = (e) => {
    dispatchedAction({ type: "INPUT", value: e.target.value });
  };
  const inputBlurHandler = () => {
    dispatchedAction({ type: "BLUR" });
  };
  const resetHandler = () => {
    dispatchedAction({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: isValueValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    resetHandler,
  };
};
export default useInput;
