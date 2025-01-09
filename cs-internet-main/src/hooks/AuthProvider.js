import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as qs from "qs";
import axios from "axios";
import { URL_API_AUTH } from "../constants/url";
import useNotification from "./Notification";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);

  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();
  const { getNotifications } = useNotification();

  useEffect(() => {
    if (token) {
      getNotifications(token).then((data) => {
        setNotifications(data.data);
      });
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  console.log(notifications);
  const loginAction = async (data) => {
    try {
      const res = await axios.post(
        URL_API_AUTH,
        qs.stringify({
          ...data,
          action: "login",
        })
      );

      if (res.data) {
        setUser(res.data.user);
        setToken(res.data.user.user_id);
        setRole(res.data.user.role);
        localStorage.setItem("site", res.data.user.user_id);
        localStorage.setItem("role", res.data.user.role);

        switch (res.data.user.role) {
          case "admin":
            navigate("/ringkasan-data");
            return;
          case "customer":
            navigate("/customer");
            return;
          case "technician":
            navigate("/detail-teknisi");
            return;
          default:
            navigate("/");
            return;
        }
      }

      throw new Error(res.message);
    } catch (err) {
      console.error(err);
      alert("Username atau password salah");
    }
  };

  const logOut = () => {
    setUser({});
    setToken("");
    setRole("");
    localStorage.removeItem("site");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const getUser = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/auth.php",
        qs.stringify({
          user_id: token,
          action: "get_user_by_id",
        })
      );

      if (res.data) {
        setUser(res.data.user);
        return;
      }

      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, logOut, getUser, role, notifications }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
