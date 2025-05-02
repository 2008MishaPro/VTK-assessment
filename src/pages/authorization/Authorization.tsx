import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import {Button, Form, Input} from "antd";
import styles from './styles.module.css'

export const Authorization = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { onLogin } = useAuth();

  const sendLoginData = async (e: any) => {
    e.preventDefault();
    const result = await onLogin!(login.email, login.password);
    if (result) {
      navigate("/authorized/assessment");
    }
  };

  return (
    <main className={styles.container}>
      <Form layout="vertical" className={styles.form}>
        <Form.Item label="Логин" className={styles.input}>
          <Input name="email" onChange={(e) => setLogin({ ...login, email: e.target.value })}/>
        </Form.Item>
        <Form.Item label="Пароль" className={styles.input}>
          <Input name="password" onChange={(e) => setLogin({ ...login, password: e.target.value })}/>
        </Form.Item>
        <p>Данные для входа выдаются колледжем</p>
        <Button onClick={sendLoginData} className={styles.button}>Войти</Button>
      </Form>
    </main>
  );
};
