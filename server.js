// server.js
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 10007;

// Serve static files from public directory with proper MIME types
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'public/css'), {
    setHeaders: (res, _path) => {
        res.setHeader('Content-Type', 'text/css');
    }
}));

// Create articles directory if it doesn't exist
async function ensureArticlesDirectory() {
    const articlesPath = path.join(__dirname, 'public', 'content', 'articles');
    try {
        await fs.access(articlesPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.mkdir(articlesPath, { recursive: true });
        }
    }
}

// API endpoint to get list of articles with content
app.get('/content/articles/', async (_req, res) => {
    try {
        await ensureArticlesDirectory();
        const articlesPath = path.join(__dirname, 'public', 'content', 'articles');
        const files = await fs.readdir(articlesPath);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        
        // Read content of each article file
        const articles = await Promise.all(
            jsonFiles.map(async (file) => {
                const content = await fs.readFile(path.join(articlesPath, file), 'utf-8');
                return JSON.parse(content);
            })
        );
        
        res.json(articles);
    } catch (error) {
        console.error('Error reading articles:', error);
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

// Initialize the articles directory when the server starts
ensureArticlesDirectory().catch(console.error);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
