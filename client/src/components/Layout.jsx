import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Layout() {
  const { user, isLoggedIn, logout, loading } = useAuth();

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            CampusMart
          </Link>
          <nav className="main-nav" aria-label="Main">
            <NavLink to="/products">Browse</NavLink>
            {isLoggedIn && <NavLink to="/sell">Sell</NavLink>}
            {isLoggedIn && <NavLink to="/my-listings">My listings</NavLink>}
          </nav>
          <div className="auth-actions">
            {loading ? (
              <span className="muted">...</span>
            ) : isLoggedIn ? (
              <>
                <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
                <button type="button" className="btn btn-ghost" onClick={logout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>CampusMart — peer-to-peer marketplace for students. Built for BCA project evaluation.</p>
        </div>
      </footer>
    </div>
  );
}
