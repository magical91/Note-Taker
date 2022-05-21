const express = require('express');
const { notes } = require('./db/notes.json');
const fs = require('fs');
const path = require('path');
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/api/notes', (req, res) => {
    res.json({ notes });
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});