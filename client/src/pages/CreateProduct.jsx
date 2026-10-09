import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/client.js';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import ProductForm from '../components/ProductForm.jsx';

function CreateProductPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(form) {
    setError('');

    if (!form.title.trim() || !form.description.trim() || !form.category.trim()) {
      setError('Please fill in title, description, and category');
      return;
    }

    setSubmitting(true);

    try {
      const data = await apiRequest('/products', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });
      navigate(`/products/${data.product._id}`);
    } catch (err) {
      setError(err.message || 'Could not create listing');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container page-padding narrow">
      <header className="page-header">
        <h1>Sell an item</h1>
        <p className="muted">List something for fellow students on campus.</p>
      </header>
      <ProductForm
        onSubmit={handleSubmit}
        submitLabel="Publish listing"
        submitting={submitting}
        error={error}
      />
    </div>
  );
}

export default function CreateProduct() {
  return (
    <ProtectedRoute>
      <CreateProductPage />
    </ProtectedRoute>
  );
}
