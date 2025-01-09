import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const TeknisiRoute = () => {
  const { token, getUser, role } = useAuth();

  useEffect(() => {
    if (token) getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) return <Navigate to="/login" />;
  if (role !== "technician") return <Navigate to="/" />;
  return <Outlet />;
};

export default TeknisiRoute;
