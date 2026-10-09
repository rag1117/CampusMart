import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api/client.js';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import ProductCard from '../components/ProductCard.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

function MyListingsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function loadMine() {
    setLoading(true);
    setError('');
    apiRequest('/products/mine')
      .then((data) => setProducts(data.products || []))
      .catch((err) => setError(err.message || 'Could not load your listings'))
      .finally(() => setLoading(false));
  }

  useEffect(function fetchMineOnMount() {
    loadMine();
  }, []);

  return (
    <div className="container page-padding">
      <header className="page-header row-between">
        <div>
          <h1>My listings</h1>
          <p className="muted">Products you published on CampusMart.</p>
        </div>
        <Link to="/sell" className="btn btn-primary">
          New listing
        </Link>
      </header>

      {loading && <LoadingMessage />}
      {!loading && error && <ErrorMessage message={error} onRetry={loadMine} />}

      {!loading && !error && products.length === 0 && (
        <p className="status-message empty">
          You have no listings yet.{' '}
          <Link to="/sell">Create your first one</Link>.
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <ul className="manage-list">
            {products.map((product) => (
              <li key={product._id}>
                <span>{product.title}</span>
                <Link to={`/edit/${product._id}`} className="btn btn-ghost small">
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function MyListings() {
  return (
    <ProtectedRoute>
      <MyListingsPage />
    </ProtectedRoute>
  );
}
