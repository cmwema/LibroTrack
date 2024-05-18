import React from "react";
import { Navigate } from "react-router-dom";
import { routesEnum } from "../../../utils/routesEnum";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  return token ? element : <Navigate to={routesEnum.LOGIN} />;
};

export default ProtectedRoute;
