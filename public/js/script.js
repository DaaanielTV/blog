document.addEventListener('DOMContentLoaded', async function() {
    // DOM Elements
    const articlesContainer = document.getElementById('articles-container');

    // Functions
    function createArticleCard(article) {
        return `
            <article class="article-card">
                <img src="${article.image}" alt="${article.title}">
                <div class="article-card-content">
                    <h3>${article.title}</h3>
                    <p>${article.content}</p>
                    <div class="article-meta">
                        <span>${article.date}</span>
                    </div>
                </div>
            </article>
        `;
    }

    async function loadArticles() {
        try {
            // Fetch the list of article files
            const response = await fetch('/content/articles/');
            const files = await response.json();
            
            // Fetch each article's content
            const articlePromises = files.map(file => 
                fetch(`/content/articles/${file}`).then(res => res.json())
            );
            
            const articles = await Promise.all(articlePromises);
            
            // Sort articles by date in descending order (newest first)
            const sortedArticles = articles.sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            );
            
            // Display the articles
            articlesContainer.innerHTML = sortedArticles
                .map(article => createArticleCard(article))
                .join('');
        } catch (error) {
            console.error('Error loading articles:', error);
            articlesContainer.innerHTML = '<p>Error loading articles. Please try again later.</p>';
        }
    }

    // Initial load
    loadArticles();
});
