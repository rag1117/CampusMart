import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

const defaultFilters = {
  search: '',
  category: 'all',
  condition: 'all',
  minPrice: '',
  maxPrice: '',
};

export default function Products() {
  const [filters, setFilters] = useState(defaultFilters);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMeta = useCallback(async function loadMeta() {
    const data = await apiRequest('/products/meta/categories');
    setCategories(data.categories || []);
    setConditions(data.conditions || []);
  }, []);

  const loadProducts = useCallback(async function loadProducts(activeFilters) {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value !== '' && value !== 'all') {
          params.set(key, value);
        }
      });

      const query = params.toString();
      const path = query ? `/products?${query}` : '/products';
      const data = await apiRequest(path);
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || 'Could not load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(function fetchOnMount() {
    loadMeta().catch(() => {
      /* categories optional if API fails */
    });
    loadProducts(defaultFilters);
  }, [loadMeta, loadProducts]);

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setDraftFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFilters(draftFilters);
    loadProducts(draftFilters);
  }

  function handleReset() {
    setDraftFilters(defaultFilters);
    setFilters(defaultFilters);
    loadProducts(defaultFilters);
  }

  return (
    <div className="container page-padding">
      <header className="page-header">
        <h1>Browse listings</h1>
        <p className="muted">Search by keyword, category, condition, or price range.</p>
      </header>

      <form className="filter-bar card" onSubmit={handleSubmit}>
        <label>
          Search
          <input
            type="search"
            name="search"
            value={draftFilters.search}
            onChange={handleFilterChange}
            placeholder="Title or description"
          />
        </label>
        <label>
          Category
          <select name="category" value={draftFilters.category} onChange={handleFilterChange}>
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          Condition
          <select name="condition" value={draftFilters.condition} onChange={handleFilterChange}>
            <option value="all">Any condition</option>
            {conditions.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>
        </label>
        <label>
          Min price (₹)
          <input
            type="number"
            name="minPrice"
            min="0"
            value={draftFilters.minPrice}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Max price (₹)
          <input
            type="number"
            name="maxPrice"
            min="0"
            value={draftFilters.maxPrice}
            onChange={handleFilterChange}
          />
        </label>
        <div className="filter-actions">
          <button type="submit" className="btn btn-primary">
            Apply
          </button>
          <button type="button" className="btn btn-ghost" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {loading && <LoadingMessage text="Loading products..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={() => loadProducts(filters)} />}

      {!loading && !error && products.length === 0 && (
        <p className="status-message empty">No listings match your filters yet.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
