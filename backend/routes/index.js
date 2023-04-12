const express = require('express');
const router = express.Router();

// Add a XSRF-TOKEN cookie
router.get('/api/csrf/restore', (req, res) => {
  const csrfToken = req.csrfToken(true);
  res.status(200).json({ csrfToken });
});

module.exports = router;
