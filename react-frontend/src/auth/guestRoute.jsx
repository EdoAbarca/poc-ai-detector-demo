import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authProvider.jsx";

const PrivateRoute = () => {
  const user = useAuth();
  console.log(user);
  if (user?.idUser) return <Navigate to="/loggedin" />;
  return <Outlet />;
};

export default PrivateRoute;