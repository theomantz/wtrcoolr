const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ response: 'Route Alive' }).status(200)
});

module.exports = router;