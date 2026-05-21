const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authorization = String(req.headers.authorization || '');
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Not authorized, token is missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.brandId = decoded.id;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please sign in again.' });
    }

    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

module.exports = { protect };
