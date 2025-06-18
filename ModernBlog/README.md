# Simple Blog

A clean and minimalist blog platform with static articles.

## Features

- Modern and responsive UI
- Article filtering by category
- Search functionality
- Clean and minimalistic design
- Static article storage in JSON format

## Structure

- `/public` - Static files (HTML, CSS, JavaScript)
- `/public/articles` - JSON files containing blog posts
- `/public/css` - Stylesheets
- `/public/js` - Client-side JavaScript

## Adding New Articles

To add a new article:

1. Create a new JSON file in the `/public/articles` directory
2. Follow this format:
```json
{
    "title": "Your Article Title",
    "date": "YYYY-MM-DD",
    "category": "category-name",
    "content": "Your article content here...",
    "image": "URL to your image"
}
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will start on port 10007. You can access the blog at `http://localhost:10007`
