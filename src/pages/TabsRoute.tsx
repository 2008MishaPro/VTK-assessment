import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "antd";
import styles from './styles.module.css'
import {VtlLogo} from "../assets/svg";

export const TabsRoute = () => {
  const { authState, loading, onLogOut } = useAuth();

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className={styles.container}>
        <div className={styles.nav}>
          <VtlLogo style={{ height: 40 }} className={styles.logo} />
          <nav className={styles.navList}>
            <Link to="/authorized/profile">Профиль</Link>
            <Link to="/authorized/assessment">Оценки</Link>
            <Link to="/authorized/schedule">Расписание</Link>
          </nav>
            <Button type="primary" onClick={onLogOut}>Выйти</Button>
        </div>
      {authState?.authenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/authorization" replace />
      )}

    </div>
  );
};
