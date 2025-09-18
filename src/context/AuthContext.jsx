import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    if (token) {
      setIsAuthenticated(true);
      setAdminUser(user ? JSON.parse(user) : null);
    }
  }, []);

  const login = async ({ email, password }) => {
    // Simple demo auth (replace with API later). Accepts any non-empty email/password.
    if (!email || !password) throw new Error('Email and password required');

    // Example: hardcode a basic admin for now
    const isValid = email === 'admin@ipgyan.com' && password === 'admin123';
    if (!isValid) throw new Error('Invalid credentials');

    const user = { email };
    localStorage.setItem('admin_token', 'dummy-token');
    localStorage.setItem('admin_user', JSON.stringify(user));
    setAdminUser(user);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
