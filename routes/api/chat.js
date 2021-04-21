const express = require('express');
const router = express.Router();
const { uuid } = require('uuidv4')

router.get('/socket', (req, res) => {
  res.json({ 
    response: 'Route Alive',
    link: uuid() 
  }).status(200)
});

module.exports = router;