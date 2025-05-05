import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/api';

// Create the context
const AuthContext = createContext();

// DEMO/TEST KULLANICI ÖRNEĞİ - Backend olmadan test için
const MOCK_USER = {
  _id: 'mock123',
  name: 'Test Kullanıcı',
  email: 'test@example.com',
  role: 'user',
  avatar: 'https://via.placeholder.com/150'
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        // Backend'den kontrol yerine, local'den kontrol et
        const userStr = await AsyncStorage.getItem('user');
        if (userStr) {
          setUser(JSON.parse(userStr));
        }
      } catch (err) {
        console.error('Failed to load user', err);
        setError(err.message || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function - Backend DEVRE DIŞI
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Mock Login attempt:', { email });
      
      // Backend'e istek yapmak yerine mock user kullan
      const mockUser = { ...MOCK_USER, email };
      
      // Local storage'e kaydet
      await AsyncStorage.setItem('token', 'mock-token-123');
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      console.log('Mock Login successful:', mockUser);
      return mockUser;
    } catch (err) {
      console.error('Login failed', err);
      const errorMsg = err.message || (err.success === false ? err.message : 'Login failed');
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function - Backend DEVRE DIŞI
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Mock Register attempt:', userData.email);
      
      // Backend'e istek yapmak yerine mock user kullan
      const mockUser = { 
        ...MOCK_USER, 
        name: userData.name, 
        email: userData.email
      };
      
      // Local storage'e kaydet
      await AsyncStorage.setItem('token', 'mock-token-123');
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      console.log('Mock Register successful:', mockUser);
      return mockUser;
    } catch (err) {
      console.error('Registration failed', err);
      const errorMsg = err.message || (err.success === false ? err.message : 'Registration failed');
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
      setError(err.message || 'Logout failed');
    }
  };

  // Update user profile - Backend DEVRE DIŞI
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Backend'e istek yapmak yerine lokal güncelleme yap
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      
      // Update stored user data
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      console.error('Profile update failed', err);
      const errorMsg = err.message || (err.success === false ? err.message : 'Profile update failed');
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 