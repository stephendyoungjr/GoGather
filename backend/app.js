const express = require('express');
require('dotenv').config();
const morgan = require('morgan'); // Logs info about server req/res
const cors = require('cors'); // Cross-Origin Resource Sharing middleware
const csurf = require('csurf'); // CSRF protection middleware
const cookieParser = require('cookie-parser'); // Parses cookies
const helmet = require('helmet'); // Security middleware
const { ValidationError } = require('sequelize');
const routes = require('./routes/index'); // Import routes
const { environment } = require('./config/index'); // Get environment

const isProduction = environment === 'production'; // Check if environment is production

const app = express(); // Initialize Express application

// Middleware setup
app.use(morgan('dev')); // Log HTTP requests in development mode
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies from application/json requests

// Security Middleware
if (!isProduction) {
  app.use(cors()); // Enable CORS only in development
}

app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for simplicity; configure as needed
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction, // Use secure cookies in production
      sameSite: isProduction && 'Lax', // SameSite policy in production
      httpOnly: true, // Prevent JavaScript access to the CSRF cookie
    },
  })
);

// Routes
app.use(routes);

// Error Handlers

// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = 'Resource Not Found';
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process Sequelize errors
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
