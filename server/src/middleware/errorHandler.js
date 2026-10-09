/**
 * Central Express error handler — keeps route handlers readable with try/catch + next(err).
 */
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate value — email may already be registered' });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id format' });
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({ message });
}
