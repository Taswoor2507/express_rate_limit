import {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {api} from "../api/axiosInstance"
import { authApi } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(undefined);
  const [user, setUser] = useState(null);

  const isAuthenticated = accessToken ? true : false;

  // 🔁 App reload → session restore
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await authApi.refreshToken();
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch {
        setAccessToken(null);
        setUser(null);
      }
    };

    restoreSession();
  }, []);

  // 🔁 Request interceptor
  useLayoutEffect(() => {
    const reqInterceptor = api.interceptors.request.use(
      (config) => {
            if (accessToken && !config._retry) {
              config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
          },
      (err) => Promise.reject(err)
    );

    return () => api.interceptors.request.eject(reqInterceptor);
  }, [accessToken]);

  // 🔁 Response interceptor (AUTO REFRESH)
  useLayoutEffect(() => {
    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 403 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            const res = await authApi.refreshToken();
            setAccessToken(res.data.accessToken);
            setUser(resdata.user);

            originalRequest.headers.Authorization =
              `Bearer ${res.data.accessToken}`;

            return api(originalRequest);
          } catch {
            setAccessToken(null);
            setUser(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(resInterceptor);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
