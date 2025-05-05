import {useAuth} from "../../../context/AuthContext.tsx";

import styles from './styles.module.css'
import {UserCard} from "./parts/user-card";

export const Index = () => {
  return (
    <main className={styles.main}>
      <section>
        <UserCard />
      </section>
    </main>
  );
};
