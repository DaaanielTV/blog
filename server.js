// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 10007;

// Serve static files from public directory
app.use(express.static('public'));

// Serve index.html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// For admin routes
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
