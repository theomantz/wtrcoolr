const express = require('express');
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

router.get('/', (req, res) => {
  res.json({ 
    response: 'Route Alive',
    link: uuidv4() 
  }).status(200)
});

module.exports = router;