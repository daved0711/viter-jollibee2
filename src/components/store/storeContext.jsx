import React from "react";
import { StoreReducer } from "./StoreReducer";
const initVal = {
  error: false,
  info: false,
  success: false,
  validate: false,
  message: "",
  isSave: false,
  isConfirm: false,
  isArchive: false,
  isRestore: false,
  isDelete: false,
  isAdd: false,
  isView: false,
  isLogin: false,
  isLogiout: false,
  isAccountUpdated: false,
  credential: {},
  isCreatePassSuccess: false,
  isAnimating: true,
};


const StoreContext = React.createContext();


const StoreProvider = (props) => {
  const [store, dispatch] = React.useReducer(StoreReducer, initVal);


  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};


export { StoreContext, StoreProvider };



