import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest } from '../api/client.js';
import LoadingMessage from '../components/LoadingMessage.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(
    function fetchProduct() {
      let cancelled = false;

      async function load() {
        setLoading(true);
        setError('');

        try {
          const data = await apiRequest(`/products/${id}`);
          if (!cancelled) {
            setProduct(data.product);
          }
        } catch (err) {
          if (!cancelled) {
            setError(err.message || 'Product not found');
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      }

      load();

      return function cleanup() {
        cancelled = true;
      };
    },
    [id]
  );

  if (loading) {
    return (
      <div className="container page-padding">
        <LoadingMessage />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container page-padding">
        <ErrorMessage message={error || 'Product not found'} />
        <Link to="/products" className="btn btn-secondary">
          Back to browse
        </Link>
      </div>
    );
  }

  const imageSrc =
    product.imageUrl ||
    'https://images.unsplash.com/photo-1556745753-b290d2f040cb?w=800&auto=format&fit=crop';
  const seller = product.seller;
  const contact = product.contactEmail || seller?.email || '';

  return (
    <div className="container page-padding product-detail">
      <Link to="/products" className="back-link">
        ← Back to listings
      </Link>
      <div className="detail-grid">
        <div className="detail-image">
          <img src={imageSrc} alt="" />
        </div>
        <div className="detail-info card">
          <h1>{product.title}</h1>
          <p className="product-price large">{formatPrice(product.price)}</p>
          <ul className="detail-meta">
            <li>
              <strong>Category:</strong> {product.category}
            </li>
            <li>
              <strong>Condition:</strong> {product.condition}
            </li>
            <li>
              <strong>Seller:</strong> {seller?.name || 'Student'}
              {seller?.college ? ` (${seller.college})` : ''}
            </li>
          </ul>
          <h2>Description</h2>
          <p className="description">{product.description}</p>
          <div className="contact-box">
            <h3>Contact seller</h3>
            {contact ? (
              <a href={`mailto:${contact}`} className="btn btn-primary">
                Email {contact}
              </a>
            ) : (
              <p className="muted">No contact email provided.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
