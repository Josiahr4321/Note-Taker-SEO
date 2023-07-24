const express = require('express');
const path = require('path');
const router = express.Router();

// localhost:3001/api/notes
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

router.post('/notes', (req, res) =>
  console.log("you created a note!")
);

module.exports = router;
