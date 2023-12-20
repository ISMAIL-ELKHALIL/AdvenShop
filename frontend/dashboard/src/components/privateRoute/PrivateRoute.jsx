import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/authSlice";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector(selectAuth);

  return userInfo ? { ...children } : <Navigate to={"/"} replace></Navigate>;
};

export default PrivateRoute;
