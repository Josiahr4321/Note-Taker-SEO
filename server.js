const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));

// Routes
const indexRoutes = require('./routes/indexRouter');
const notesRoutes = require('./routes/apiRouter');

app.use('/', indexRoutes);
app.use('/api', notesRoutes);

// localhost:3001/api


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
