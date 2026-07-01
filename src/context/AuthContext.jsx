import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: "Ahmed Raza",
    profileId: "MAT-10001",
    role: "user", // "user" | "admin"
    email: "ahmed.raza@example.com",
  });

  const login = ({ email, asAdmin = false }) => {
    setUser({
      name: asAdmin ? "Admin" : "Ahmed Raza",
      profileId: "MAT-10001",
      role: asAdmin ? "admin" : "user",
      email: email || "ahmed.raza@example.com",
    });
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
