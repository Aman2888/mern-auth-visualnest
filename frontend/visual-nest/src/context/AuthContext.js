// File: src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const profilePicture = localStorage.getItem('profilePicture');

      if (token && userId) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({ id: userId, profilePicture });
      }

      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // SignUp user
  const signup = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password
      });

      const { token, userId, profilePicture } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      if (profilePicture) localStorage.setItem('profilePicture', profilePicture);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ id: userId, profilePicture });

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      return { success: false, error: err.response?.data?.message || 'An error occurred' };
    }
  };

  // Login user
  const signin = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password
      });

      const { token, userId, profilePicture } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      if (profilePicture) localStorage.setItem('profilePicture', profilePicture);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ id: userId, profilePicture });

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      return { success: false, error: err.response?.data?.message || 'An error occurred' };
    }
  };

  // Logout user
  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('profilePicture');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signup,
        signin,
        signout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
