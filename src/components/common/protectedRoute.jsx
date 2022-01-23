import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("token");

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
