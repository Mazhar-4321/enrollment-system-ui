import { Outlet, Navigate } from "react-router-dom";
import React, { Children } from "react";

const ProtectedRoute = ({ children }) => {
  // const [loggedIn, setLogggedIn] = React.useState(false);
  if (localStorage.getItem("token")) {
    return children;
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;