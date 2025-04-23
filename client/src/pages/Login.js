import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorMsg = searchParams.get('error');

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <p className="domain-info">
          Note: Only <strong>{process.env.REACT_APP_COMPANY_DOMAIN}</strong> email addresses are allowed.
        </p>
        
        {(error || errorMsg) && (
          <div className="error-message">
            {error || errorMsg}
          </div>
        )}
        
        <button onClick={login} className="google-btn">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;