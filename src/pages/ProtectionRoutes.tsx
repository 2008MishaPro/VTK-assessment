import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { authState, loading } = useAuth();

  if (loading) return <div>Загрузка...</div>; 

  return authState?.authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/authorization" replace />
  );
};
