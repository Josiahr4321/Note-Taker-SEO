const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const getNotes = ()=>{
  return readFile('./db/db.json','utf-8').then(rawNotes=>[].concat( JSON.parse(rawNotes)));
}


router.get('/notes', (req, res) => {
  getNotes().then(notes=>res.json(notes)).catch(err=>res.json(err))
  // const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  // res.status(200).json(data);
  // console.info(`${req.method} request received to get notes`);
});

router.post('/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  getNotes().then(oldNotes =>{
    console.log(oldNotes)
    const { title, text } = req.body;
 
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    const noteArray = [...oldNotes,newNote]
    writeFile('./db/db.json',JSON.stringify(noteArray)).then(()=>res.json({msg:'okay'}))
  })
  
    
  
});

router.delete('/notes/:id', (req, res) => {
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
