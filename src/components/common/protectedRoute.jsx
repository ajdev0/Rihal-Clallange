import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ path, element: Element, element, ...rest }) => {
  const user = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      element={(props) => {
        if (!user) return <Navigate to="/login" />;
        return Element ? <Element {...props} /> : element(props);
      }}
    />
  );
};

export default ProtectedRoute;
