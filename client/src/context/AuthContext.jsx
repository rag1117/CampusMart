import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest, getStoredToken, setStoredToken } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function loadSessionOnMount() {
    const token = getStoredToken();

    if (!token) {
      setLoading(false);
      return;
    }

    apiRequest('/auth/me')
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setStoredToken(null);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function login(email, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setStoredToken(data.token);
    setUser(data.user);
    return data.user;
  }

  async function register(form) {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    setStoredToken(data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    setStoredToken(null);
    setUser(null);
  }

  const value = {
    user,
    loading,
    isLoggedIn: Boolean(user),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
