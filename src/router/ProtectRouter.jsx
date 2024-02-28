import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectRouter = ({ access, redirect, children }) => {
  const location = useLocation();
  debugger;
  if (access?.length === 0 || access === undefined || access === false || access === null) {
    return <Navigate to={redirect} state={{ from: location.pathname }} />;
  }
  return children;
};

export default ProtectRouter;
