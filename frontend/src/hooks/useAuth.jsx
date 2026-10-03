import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, onUnauthorized, setToken } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    const { data } = await api.get("/auth/me");
    setUser(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMe();
    return onUnauthorized(() => {
      setUser(null);
      setLoading(false);
    });
  }, [fetchMe]);

  const login = useCallback(async (email, password) => {
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);

    const res = await fetch("/auth/login", { method: "POST", body: form });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.detail || "Login failed");
    }
    const data = await res.json();
    setToken(data.access_token);
    await fetchMe();
  }, [fetchMe]);

  const register = useCallback(async (payload) => {
    const { data, error } = await api.post("/auth/register", payload);
    if (error) throw new Error(error);
    setToken(data.access_token);
    await fetchMe();
  }, [fetchMe]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
