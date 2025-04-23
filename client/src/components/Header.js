import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Auth Demo</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="user-info">
                {user?.photo && (
                  <img src={user.photo} alt={user.displayName} className="user-avatar" />
                )}
                <span>{user?.displayName || user?.email}</span>
              </li>
              <li>
                <button onClick={logout} className="logout-btn">Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="login-btn">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;