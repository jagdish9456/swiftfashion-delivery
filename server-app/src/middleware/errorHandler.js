const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the full error stack for debugging

  // Check for Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: 'Validation Error', details: errors });
  }

  // Check for CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  // Handle other errors
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
};

module.exports = errorHandler;
