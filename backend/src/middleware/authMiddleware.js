// backend/src/middleware/authMiddleware.js

// later you will verify JWT here
function authRequired(req, res, next) {
    // TEMP: allow all requests without auth
    next();
  }
  
  module.exports = authRequired;
  