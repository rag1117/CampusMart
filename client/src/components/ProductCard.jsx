import { Link } from 'react-router-dom';

function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductCard({ product }) {
  const imageSrc =
    product.imageUrl ||
    'https://images.unsplash.com/photo-1556745753-b290d2f040cb?w=400&auto=format&fit=crop';

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-card-link">
        <div className="product-card-image-wrap">
          <img src={imageSrc} alt="" loading="lazy" />
        </div>
        <div className="product-card-body">
          <h3>{product.title}</h3>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="product-meta">
            {product.category} · {product.condition}
          </p>
        </div>
      </Link>
    </article>
  );
}
