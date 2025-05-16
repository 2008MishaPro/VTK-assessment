import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "antd";
import styles from './styles.module.css'
import {VtlLogo} from "../assets/svg";
import { useLocation } from 'react-router-dom';

export const TabsRoute = () => {
  const { authState, loading, onLogOut } = useAuth();
  const location = useLocation();
  
  // Определяем активный пункт меню
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className={styles.container}>
        <div className={styles.nav} style={{ 
          background: 'linear-gradient(90deg, #2E8B57 0%, #3CB371 100%)', 
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <VtlLogo style={{ height: 40 }} className={styles.logo} />
          <nav className={styles.navList}>
            <Link 
              to="/authorized/profile" 
              style={{ 
                color: 'white', 
                fontWeight: isActive('/profile') ? 600 : 500,
                position: 'relative',
                padding: '8px 0'
              }}
            >
              {isActive('/profile') && (
                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  borderRadius: '2px'
                }}></div>
              )}
              Профиль
            </Link>
            <Link 
              to="/authorized/assessment" 
              style={{ 
                color: 'white', 
                fontWeight: isActive('/assessment') ? 600 : 500,
                position: 'relative',
                padding: '8px 0'
              }}
            >
              {isActive('/assessment') && (
                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  borderRadius: '2px'
                }}></div>
              )}
              Оценки
            </Link>
            <Link 
              to="/authorized/schedule" 
              style={{ 
                color: 'white', 
                fontWeight: isActive('/schedule') ? 600 : 500,
                position: 'relative',
                padding: '8px 0'
              }}
            >
              {isActive('/schedule') && (
                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  borderRadius: '2px'
                }}></div>
              )}
              Расписание
            </Link>
          </nav>
          <Button 
            type="primary" 
            onClick={onLogOut}
            style={{ 
              backgroundColor: 'white', 
              color: '#2E8B57',
              border: 'none',
              fontWeight: 500
            }}
          >
            Выйти
          </Button>
        </div>
      {authState?.authenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/authorization" replace />
      )}
    </div>
  );
};
