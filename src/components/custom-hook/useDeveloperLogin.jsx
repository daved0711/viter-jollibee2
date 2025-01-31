import React from "react";
import { StoreContext } from "../store/storeContext";
import { queryData } from "../helpers/queryData";

import { checkRoleToRedirect } from "../helpers/Login-Functions";
import { setIsLogin } from "../store/storeAction";
import { checkLocalStorage } from "../helpers/checkLocalStorage";

const useDeveloperLogin = (navigate) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loginLoading, setLoginLoading] = React.useState(true);

  React.useEffect(() => {
    setLoginLoading(true);
    const fetchLogin = async () => {
      const login = await queryData("/v2/developer/token", "post", {
        token: checkLocalStorage().token,
      });
      if (typeof login === "undefined" || !login.success) {
        checkLocalStorage.removeItem("jollibeetoken");
        setLoginLoading(false);
      } else {
        setLoginLoading(false);
        checkRoleToRedirect(navigate, login.data);
      }
    };
    if (
      checkLocalStorage() !== null &&
      checkLocalStorage().token !== undefined
    ) {
      fetchLogin();
      dispatch(setIsLogin(false));
    } else {
      setLoginLoading(false);
      dispatch(setIsLogin(true));
    }
  }, []);
  return { loginLoading };
};

export default useDeveloperLogin;
