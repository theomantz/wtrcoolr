const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid')

router.get('/', (req, res) => {
  res.json({ 
    response: 'Route Alive',
    link: uuidv4() 
  }).status(200)
});

module.exports = router;