document.addEventListener('DOMContentLoaded', async function() {
    // DOM Elements
    const articlesContainer = document.getElementById('articles-container');
    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Load articles from JSON files
    const articles = [
        await fetch('/articles/web-development.json').then(res => res.json()),
        await fetch('/articles/mindful-living.json').then(res => res.json()),
        await fetch('/articles/future-tech.json').then(res => res.json())
    ];

    // Functions
    function createArticleCard(article) {
        return `
            <article class="article-card">
                <img src="${article.image}" alt="${article.title}">
                <div class="article-card-content">
                    <h3>${article.title}</h3>
                    <p>${article.content.substring(0, 150)}...</p>
                    <div class="article-meta">
                        <span>${article.date}</span> | 
                        <span>${article.category}</span>
                    </div>
                </div>
            </article>
        `;
    }

    function displayArticles(articlesToShow = articles) {
        articlesContainer.innerHTML = articlesToShow
            .map(article => createArticleCard(article))
            .join('');
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredArticles = articles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm)
        );
        displayArticles(filteredArticles);
    });

    // Category filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            const filteredArticles = category === 'all' 
                ? articles 
                : articles.filter(article => article.category === category);
            
            displayArticles(filteredArticles);
        });
    });

    // Initial display
    displayArticles();
});
