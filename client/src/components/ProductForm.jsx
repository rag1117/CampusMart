import { useState } from 'react';

const DEFAULT_CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];

export default function ProductForm({
  initialValues = {},
  onSubmit,
  submitLabel,
  submitting,
  error,
}) {
  const [form, setForm] = useState({
    title: initialValues.title || '',
    description: initialValues.description || '',
    price: initialValues.price ?? '',
    category: initialValues.category || '',
    condition: initialValues.condition || 'Good',
    imageUrl: initialValues.imageUrl || '',
    contactEmail: initialValues.contactEmail || '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form className="stack-form card form-card" onSubmit={handleSubmit}>
      {error && (
        <p className="status-message error" role="alert">
          {error}
        </p>
      )}
      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} required maxLength={120} />
      </label>
      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={5}
          maxLength={2000}
        />
      </label>
      <label>
        Price (₹)
        <input
          type="number"
          name="price"
          min="0"
          step="1"
          value={form.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Category
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Books, Electronics, Furniture..."
          required
        />
      </label>
      <label>
        Condition
        <select name="condition" value={form.condition} onChange={handleChange}>
          {DEFAULT_CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label>
        Image URL (optional)
        <input
          type="url"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://..."
        />
      </label>
      <label>
        Contact email
        <input
          type="email"
          name="contactEmail"
          value={form.contactEmail}
          onChange={handleChange}
          placeholder="Defaults to your account email if empty"
        />
      </label>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
