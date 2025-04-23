import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
        setDashboardData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>
      
      <div className="user-profile">
        <h2>Your Profile</h2>
        {user?.photo && (
          <img src={user.photo} alt={user.displayName} className="profile-image" />
        )}
        <div className="profile-details">
          <p><strong>Name:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>

      {error ? (
        <div className="error-message">{error}</div>
      ) : dashboardData && (
        <div className="dashboard-content">
          <h2>Protected Data</h2>
          <div className="data-card">
            <p>{dashboardData.message}</p>
            <p><strong>Timestamp:</strong> {new Date(dashboardData.timestamp).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;