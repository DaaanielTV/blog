// server.js
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 10007;

// Serve static files from public directory
app.use(express.static('public'));

// API endpoint to get list of article files
app.get('/content/articles/', async (_req, res) => {
    try {
        const files = await fs.readdir(path.join(__dirname, 'public', 'content', 'articles'));
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        res.json(jsonFiles);
    } catch (error) {
        console.error('Error reading articles directory:', error);
        res.status(500).json({ error: 'Failed to load articles' });
    }
});

// Serve index.html as the main page
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// For admin routes
app.get('/admin', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
