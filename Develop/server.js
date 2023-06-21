const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const indexRoutes = require('./routes/index');
const notesRoutes = require('./routes/notes');

app.use('/', indexRoutes);
app.use('/notes', notesRoutes);

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
