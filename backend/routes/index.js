const express = require('express');
const router = express.Router();
const path = require('path');
const apiRouter = require('./api');

// API routes
router.use('/api', apiRouter);

// Static routes for production
if (process.env.NODE_ENV === 'production') {
  // Serve frontend's index.html file at the root
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });

  // Serve the static assets in the frontend's dist folder
  router.use(express.static(path.resolve('../frontend/dist')));

  // Serve frontend's index.html file for all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

// Add CSRF token route for development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

// Test route
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
