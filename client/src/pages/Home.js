import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Check for error parameter in URL
  useEffect(() => {
    const errorMsg = searchParams.get('error');
    if (errorMsg) {
      setError(errorMsg);
      setShowErrorModal(true);
    }
  }, [searchParams]);

  const closeModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="home">
      {/* Error Modal */}
      {showErrorModal && error && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Authentication Error</h3>
              <button onClick={closeModal} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <p className="error-message">{error}</p>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal} className="btn-primary">OK</button>
            </div>
          </div>
        </div>
      )}

      <div className="hero">
        <h1>Company Auth Demo</h1>
        <p>
          A secure authentication system using Google OAuth that only allows
          users with <strong>{process.env.REACT_APP_COMPANY_DOMAIN}</strong> email addresses.
        </p>
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
        ) : (
          <Link to="/login" className="btn-primary">
            Sign In
          </Link>
        )}
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h2>Company Restricted</h2>
          <p>Only users with authorized company email domains can access.</p>
        </div>
        
        <div className="feature-card">
          <h2>Secure Authentication</h2>
          <p>Uses Google OAuth 2.0 for reliable and secure login.</p>
        </div>
        
        <div className="feature-card">
          <h2>Protected Resources</h2>
          <p>API endpoints are secured with JWT authentication.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;