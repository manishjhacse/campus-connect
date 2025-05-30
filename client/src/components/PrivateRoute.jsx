/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const loggedInUser=useSelector((state)=>state.user)
  if (isLoggedin) {
    if(loggedInUser.status==="pending"){
      return <Navigate to="/pendinguser" />;
    }
    if(loggedInUser.isSuspended===true){
      return <Navigate to="/suspendeduser" />;
    }
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
