const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  res.status(200).json(data);
  console.info(`${req.method} request received to get notes`);
});

router.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });
    res.sendStatus(200);
  } else {
    res.status(500).json('Error in posting note');
  }
});

router.delete('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  const filterData = data.filter((note) => note.id !== req.params.id);
  fs.writeFile(
    './db/db.json',
    JSON.stringify(filterData, null, 4),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully deleted note!')
  );
  res.status(200).json({ ok: true });
});

module.exports = router;
