import axios from "axios";
import { useEffect, createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const URL = import.meta.env.VITE_REACT_APP_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          const { data } = await axios.post(
            `${URL}/api/v1/auth/refresh`,
            {},
            {
              headers: {
                authorization: token,
              },
            }
          );
          setUser(data.result);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

// const login = (userData) => {
//   setUser(userData);
// };

// const logout = () => {
//   setUser(null);
// };
