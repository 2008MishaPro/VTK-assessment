import {useAuth} from "../../../context/AuthContext.tsx";

import styles from './styles.module.css'
import {UserCard} from "./parts/user-card";

export const Index = () => {
  const {onLogOut} = useAuth();
  return (
    <main className={styles.main}>
      <section>
        <UserCard />
        <button onClick={onLogOut}>Удалить профиль</button>
      </section>
    </main>
  );
};
