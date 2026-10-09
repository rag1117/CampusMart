import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Campus marketplace</p>
          <h1>Buy and sell with students on your campus</h1>
          <p className="lead">
            CampusMart helps you list textbooks, gadgets, furniture, and more — without complicated
            payment gateways. Contact sellers directly and meet on campus.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Browse listings
            </Link>
            {isLoggedIn ? (
              <Link to="/sell" className="btn btn-secondary">
                Create a listing
              </Link>
            ) : (
              <Link to="/register" className="btn btn-secondary">
                Join free
              </Link>
            )}
          </div>
        </div>
        <div className="hero-panel">
          <h2>How it works</h2>
          <ol className="steps-list">
            <li>Create a student account with your email.</li>
            <li>Post items you want to sell or browse what others listed.</li>
            <li>Use the contact email on a listing to coordinate pickup.</li>
          </ol>
          <p className="muted small">
            Note: Registration verifies your email only — not official college enrollment.
          </p>
        </div>
      </div>
    </section>
  );
}
