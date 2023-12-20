import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../slices/authSlice";
const PrivateRoute = () => {
  const { userInfo } = useSelector(selectAuth);

  return userInfo ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to={"login"} replace></Navigate>
  );
};

export default PrivateRoute;
