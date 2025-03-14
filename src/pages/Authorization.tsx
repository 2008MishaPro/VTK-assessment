import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { removeUserToken } from "../localStore/LocalStore";

export const Authorization = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { onLogin, authState, onLogOut } = useAuth();

  const sendLoginData = async (e: any) => {
    e.preventDefault();
    const result = await onLogin!(login.email, login.password);
    if (result) {
      navigate("/assessments");
    }
  };

  return (
    <main>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            value={login.email}
            type="text"
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            placeholder="Логин"
          />
          <input
            value={login.password}
            type="text"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            placeholder="Пароль"
          />
          <p>Данные для входа выдаются колледжем</p>
        </div>
        <button onClick={sendLoginData}></button>
        <button>Выйти</button>
      </form>
    </main>
  );
};
