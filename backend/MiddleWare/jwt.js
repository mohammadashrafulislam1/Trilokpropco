// middleware/auth.js
const jwt = require('jsonwebtoken');

// Verify Token
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = verified; // Add user data to request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// Verify Admin Role
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Admins Only' });
    }
  });
};

