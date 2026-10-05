const express = require('express');
const { findPath } = require('./pathfinder');

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Send a GET to /{COUNTRY_CODE} for example: /PAN' });
});
app.get('/:code', (req, res) => {
    const code = req.params.code.trim().toUpperCase();
    
    const path = findPath(code);
    if (!path) {
        return res.status(404).json({ error: 'Country not supported' });
    }

    res.json({ destination: code, path });
});

module.exports = app;