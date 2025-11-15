

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getCsrfToken, clearCsrfFlag } from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasCheckedAuth = useRef(false);
  const navigate = useNavigate();

  // Check authentication on mount - ONLY ONCE
  useEffect(() => {
    if (!hasCheckedAuth.current) {
      checkAuth();
      hasCheckedAuth.current = true;
    }
  }, []);

  const checkAuth = async () => {
    try {
      // First, ensure we have CSRF token
      await getCsrfToken();
      
      // Then fetch user
      const response = await api.get('/user');
      setUser(response.data);
    } catch (error) {
      console.log('Not authenticated:', error.response?.status);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Get CSRF token first
      await getCsrfToken();
      
      // Login
      const response = await api.post('/login', { email, password });
      
      // Set user from response
      setUser(response.data.user);
      
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Login error:', error);
      // return { 
      //   success: false, 
      //   message: error.response?.data?.message || 'Login failed' 
      // };
      // Re-throw the error so Login.jsx catch block can handle it
    throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Ensure CSRF token is set
      await getCsrfToken();
      
      // Create the new user in backend - DO NOT auto-login
      const response = await api.post('/register', userData);
      
      // Return success message without logging in the new user
      return { 
        success: true,
        message: 'User registered successfully',
        user: response.data.user 
      };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

//   const logout = async () => {
 

//   try {
//     await api.post('/logout');
//   } catch (error) {
//     console.error('Erreur lors de la déconnexion:', error);
//   } finally {
//     setUser(null);
//     clearCsrfFlag();
    
//     // Clear all cookies
//     document.cookie.split(";").forEach((cookie) => {
//       const name = cookie.split("=")[0].trim();
//       document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//     });
    
//     navigate('/login');
//   }
// };

//   const value = {
//     user,
//     login,
//     register,
//     logout,
//     loading,
//     isAuthenticated: !!user,
//     isStudent: user?.role === 'student',
//     isTeacher: user?.role === 'teacher',
//     isAdmin: user?.role === 'admin',
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth doit être utilisé dans un AuthProvider');
//   }
//   return context;
// };

const logout = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  } finally {
    setUser(null);
    clearCsrfFlag();
    
    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    
    // Navigate with state to show success message
    navigate('/login', { 
      replace: true,
      state: { fromLogout: true }
    });
  }
};

const value = {
  user,
  login,
  register,
  logout,
  loading,
  isAuthenticated: !!user,
  isStudent: user?.role === 'student',
  isTeacher: user?.role === 'teacher',
  isAdmin: user?.role === 'admin',
};

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};