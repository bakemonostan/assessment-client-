'use client'

import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {}, // Function to update authentication state
});

export default function Userprovider({ children }) {
  const router = useRouter();
  const [cookies] = useCookies([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initial state

  useEffect(() => {
    // Check for cookies on initial load and after changes
    if (cookies.email && cookies.token) {
      // Perform server-side authentication check (if applicable)
      // ... (fetch user data or validate token)
      setIsAuthenticated(true); // Set authenticated state based on validation
    } else {
      setIsAuthenticated(false); // Clear state for unauthenticated users
    }
  }, [cookies.email, cookies.token]);

  useEffect(() => {
    // Redirect to login if unauthenticated on client-side
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a Userprovider");
  }
  return context;
}
