document.addEventListener('DOMContentLoaded', function() {
    // Sample blog posts data (in a real app, this would come from an API)
    const posts = [
        {
            id: 1,
            title: 'Getting Started with Node.js',
            excerpt: 'Learn the basics of Node.js and start building server-side applications...',
            image: 'https://picsum.photos/id/1/800/400',
            date: '2025-06-18'
        },
        {
            id: 2,
            title: 'Modern Web Design Trends',
            excerpt: 'Explore the latest trends in web design and how to implement them...',
            image: 'https://picsum.photos/id/2/800/400',
            date: '2025-06-17'
        },
        // Add more sample posts here
    ];

    // DOM Elements
    const articlesContainer = document.getElementById('articles-container');

    // Functions
    function createArticleCard(post) {
        return `
            <article class="article-card">
                <img src="${post.image}" alt="${post.title}">
                <div class="article-card-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="article-meta">
                        <span>${post.date}</span>
                    </div>
                </div>
            </article>
        `;
    }

    function displayPosts() {
        // Sort posts by date in descending order (newest first)
        const sortedPosts = [...posts].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        articlesContainer.innerHTML = sortedPosts
            .map(post => createArticleCard(post))
            .join('');
    }

    // Initial display
    displayPosts();
});
