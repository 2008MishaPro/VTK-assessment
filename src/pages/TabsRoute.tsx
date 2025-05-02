import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const TabsRoute = () => {
  const { authState, loading } = useAuth();

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <nav>
        <Link to="/authorized/profile">Профиль</Link>
        <Link to="/authorized/assessment">Оценки</Link>
        <Link to="/authorized/schedule">Расписание</Link>
      </nav>
      {authState?.authenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/authorization" replace />
      )}

    </div>
  );
};
