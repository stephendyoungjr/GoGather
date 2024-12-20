const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sets and sends a JWT Cookie
const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

// Restore the session user info based on the contents of the JWT cookie
const restoreUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    console.log("No token found in cookies.");
    req.user = null;
    return next();
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      console.log("JWT verification failed:", err.message);
      req.user = null;
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      const user = await User.scope('currentUser').findByPk(id);
      if (!user) {
        console.log("No user found with ID:", id);
        res.clearCookie('token');
        req.user = null;
        return next();
      }
      req.user = user;
      console.log("User restored:", user.toJSON());
    } catch (e) {
      console.log("Error restoring user:", e.message);
      res.clearCookie('token');
      req.user = null;
    }

    return next();
  });
};

// Require authentication middleware
const requireAuth = [
  restoreUser,
  (req, res, next) => {
    if (req.user) {
      console.log("User is authenticated:", req.user.toJSON());
      return next();
    }

    console.log("Unauthorized access attempted.");
    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  },
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
