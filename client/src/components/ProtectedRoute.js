import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  // Check if user has a company email
  const hasCompanyEmail = user?.email?.endsWith(`@${process.env.REACT_APP_COMPANY_DOMAIN}`);
  
  // Redirect to login if not authenticated or doesn't have company email
  if (!isAuthenticated || !hasCompanyEmail) {
    return <Navigate to="/login" replace />;
  }
  
  // Render the child routes
  return <Outlet />;
};

export default ProtectedRoute;