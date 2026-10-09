import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import ProductForm from '../components/ProductForm.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [initial, setInitial] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(function loadProduct() {
    apiRequest(`/products/${id}`)
      .then((data) => setInitial(data.product))
      .catch((err) => setLoadError(err.message || 'Could not load listing'));
  }, [id]);

  async function handleSubmit(form) {
    setError('');
    setSubmitting(true);

    try {
      await apiRequest(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });
      navigate(`/products/${id}`);
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm('Delete this listing permanently?');
    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      await apiRequest(`/products/${id}`, { method: 'DELETE' });
      navigate('/my-listings', { replace: true });
    } catch (err) {
      setError(err.message || 'Delete failed');
      setDeleting(false);
    }
  }

  if (loadError) {
    return (
      <div className="container page-padding">
        <ErrorMessage message={loadError} />
      </div>
    );
  }

  if (!initial) {
    return (
      <div className="container page-padding">
        <LoadingMessage />
      </div>
    );
  }

  const sellerId = initial.seller?._id || initial.seller;
  if (user && sellerId && sellerId.toString() !== user.id) {
    return (
      <div className="container page-padding">
        <ErrorMessage message="You can only edit your own listings." />
      </div>
    );
  }

  return (
    <div className="container page-padding narrow">
      <header className="page-header">
        <h1>Edit listing</h1>
      </header>
      <ProductForm
        initialValues={initial}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
        submitting={submitting}
        error={error}
      />
      <div className="danger-zone card">
        <h2>Delete listing</h2>
        <p className="muted">This removes the product from the marketplace.</p>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete listing'}
        </button>
      </div>
    </div>
  );
}

export default function EditProduct() {
  return (
    <ProtectedRoute>
      <EditProductPage />
    </ProtectedRoute>
  );
}
