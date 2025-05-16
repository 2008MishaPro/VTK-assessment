import {useAuth} from "../../../context/AuthContext.tsx";

import styles from './styles.module.css'
import {UserCard} from "./parts/user-card";
import {Navigate} from "react-router-dom";

export const Index = () => {
    const {authState} = useAuth();

    
    if (!authState.token || (Array.isArray(authState.token) && authState.token.length === 0)) {
        console.log('Токен отсутствует или пустой');
        return <Navigate to="/authorization" replace />;
    }
    
    return (
    <main className={styles.main}>
      <section>
        <UserCard />
      </section>
    </main>
  );
};
