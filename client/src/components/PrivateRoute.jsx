/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedin = useSelector((state) => state.isLoggedin);
  console.log(isLoggedin);
  if (isLoggedin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
