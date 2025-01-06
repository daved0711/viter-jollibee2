import useDeveloperLogin from "@/components/custom-hook/useDeveloperLogin";
import { devNavUrl } from "@/components/helpers/functions-general";
import { queryData } from "@/components/helpers/queryData";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import { setIsCredentials } from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const DeveloperProtectedRoute = ({ children }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState("");
  const jollibeetoken = JSON.parse(localStorage.getItem("jollibeetoken"));
  const [pageStatus, setPageStatus] = React.useState(false);

  React.useEffect(() => {
    const fetchLogin = async () => {
      const login = await queryData(`/v2/developer/token`, `post`, {
        token: jollibeetoken.token,
      });

      if (typeof login === "undefined" || !login.success) {
        setLoading(false);
        setIsAuth("456");
      } else {
        dispatch(
          setIsCredentials({
            ...login.data,
          })
        );
        setIsAuth("123");
        setLoading(false);
        delete login.data.user_developer_password;
        delete login.data.user_developer_key;
        delete login.data.user_role_description;
        delete login.data.user_role_created;
        delete login.data.user_role_datetime;
      }
      if (
        !login.success
        // ||login.data.role.toLowercase() !== login.data.role_name.toLowercase()
      ) {
        setPageStatus(true);
      }
    };
    if (jollibeetoken !== null) {
      fetchLogin();
    } else {
      setIsAuth("456");
      setLoading(false);
      localStorage.removeItem("jollibeetoken");
    }
  }, [dispatch]);

  if (pageStatus) {
    return "page not found";
  } else {
    return (
      <>
        {loading ? (
          <FetchingSpinner />
        ) : isAuth === "123" ? (
          children
        ) : isAuth === "456" ? (
          <Navigate to={`${devNavUrl}/developer/login`} />
        ) : (
          <p>End point Not Found.</p>
        )}
      </>
    );
  }
  return <></>;
};

export default DeveloperProtectedRoute;
