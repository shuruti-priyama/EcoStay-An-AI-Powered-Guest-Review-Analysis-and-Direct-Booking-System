import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('ecostay_user');
    const token = localStorage.getItem('ecostay_token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const persistSession = (data) => {
    const { token, ...userData } = data;
    localStorage.setItem('ecostay_token', token);
    localStorage.setItem('ecostay_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    return persistSession(res.data.data);
  }, []);

  const register = useCallback(async (payload) => {
    const res = await api.post('/auth/register', payload);
    return persistSession(res.data.data);
  }, []);

  const loginWithToken = useCallback(async (token) => {
    localStorage.setItem('ecostay_token', token);
    const res = await api.get('/auth/me');
    const userData = res.data.data;
    localStorage.setItem('ecostay_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('ecostay_token');
    localStorage.removeItem('ecostay_user');
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isOwner: user?.role === 'owner',
    loading,
    login,
    register,
    loginWithToken,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};