const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

// Add a XSRF-TOKEN cookie
router.get('/api/csrf/restore', (req, res) => {
  return res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
