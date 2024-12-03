const router = require("express").Router();
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth.js");
const { User } = require("../../db/models");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

// Test route for setTokenCookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// Test route for restoreUser
router.get('/restore-user', (req, res) => {
  return res.json(req.user);
});

// Test route for requireAuth
router.get('/require-auth', requireAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
