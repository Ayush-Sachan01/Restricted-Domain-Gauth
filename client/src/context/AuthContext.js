import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        setLoading(true);
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setError(null);
      } catch (err) {
        setUser(null);
        setError(err.response?.data?.message || 'Failed to get user information');
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Updated logout function
  const logout = async () => {
    try {
      const response = await authService.logout();
      setUser(null);
      
      // Complete Google logout (optional - for a more thorough logout experience)
      if (response.data?.logoutUrl) {
        // Redirect to Google's logout URL
        window.location.href = response.data.logoutUrl;
      } else {
        // Fallback to home page if no logout URL is provided
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to logout');
      window.location.href = '/';
    }
  };

  // Login function (redirects to Google OAuth)
  const login = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;