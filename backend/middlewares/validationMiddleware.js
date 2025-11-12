// middlewares/validationMiddleware.js

const validateMaterial = (req, res, next) => {
  const { name, category, quantity, status, vendor } = req.body;

  // Required fields
  if (!name || !category || !quantity || !status) {
    return res.status(400).json({ 
      message: 'Missing required fields: name, category, quantity, status' 
    });
  }

  // Type validation
  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: 'Name must be a non-empty string' });
  }

  if (typeof quantity !== 'number' || quantity < 0) {
    return res.status(400).json({ message: 'Quantity must be a positive number' });
  }

  // Status validation
  const validStatuses = ['in_stock', 'low_stock', 'out_of_stock', 'ordered'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      message: `Status must be one of: ${validStatuses.join(', ')}` 
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      message: 'Email and password are required' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  next();
};

const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ 
      message: 'Name, email, and password are required' 
    });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({ 
      message: 'Name must be at least 2 characters' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      message: 'Password must be at least 6 characters' 
    });
  }

  next();
};

const validateRole = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ 
      message: 'Role name is required and must be a non-empty string' 
    });
  }

  next();
};

module.exports = {
  validateMaterial,
  validateLogin,
  validateRegistration,
  validateRole
};