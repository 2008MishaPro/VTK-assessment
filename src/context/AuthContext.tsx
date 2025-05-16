import { createContext, useContext, useEffect, useState } from "react";
import { getUserToken, removeUserToken } from "../localStore/LocalStore";
import { LoginUser } from "../API/GetUserLogin";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (login: string, password: string) => Promise<any>;
  onLogOut?: () => Promise<any>;
}

const TOKEN = "TOKEN";
export const API_URL = "http://mbl.vtk-portal.ru/api/v1";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthOperator = ({ children }: any) => {
  const [thisAuth, setAuth] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const getToken = await getUserToken();
      if (getToken) {
        setAuth({ token: getToken, authenticated: true });
      }
      setLoading(false);
    };

    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await LoginUser({ email, password });

      if (result.token) {
        localStorage.setItem("TOKEN", JSON.stringify(result.token)); 
        setAuth({
          token: result.token,
          authenticated: true,
        });
        return true;
      }
      return false;
    } catch (e) {
      console.log("login error:", e);
      return { error: true, msg: "Ошибка входа" };
    }
  };

  const logOut = async () => {
    removeUserToken();
    setAuth({ token: null, authenticated: false });
    console.log(thisAuth)
  };

  const value = {
    authState: thisAuth,
    onLogin: login,
    onLogOut: logOut,
  };

  return (
    <AuthContext.Provider value={{ ...value, loading }}>
      {!loading ? children : <div>Загрузка...</div>}
    </AuthContext.Provider>
  );
};
