const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid id format' });
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
};

module.exports = { notFound, errorHandler };
