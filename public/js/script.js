document.addEventListener('DOMContentLoaded', function() {
    // Sample blog posts data (in a real app, this would come from an API)
    const posts = [
        {
            id: 1,
            title: 'Getting Started with Node.js',
            excerpt: 'Learn the basics of Node.js and start building server-side applications...',
            image: 'https://picsum.photos/id/1/600/400',
            date: '2025-06-18',
            category: 'technology'
        },
        {
            id: 2,
            title: 'Modern Web Design Trends',
            excerpt: 'Explore the latest trends in web design and how to implement them...',
            image: 'https://picsum.photos/id/2/600/400',
            date: '2025-06-17',
            category: 'design'
        },
        // Add more sample posts here
    ];

    // DOM Elements
    const articlesContainer = document.getElementById('articles-container');
    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Functions
    function createArticleCard(post) {
        return `
            <article class="article-card">
                <img src="${post.image}" alt="${post.title}">
                <div class="article-card-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="article-meta">
                        <span>${post.date}</span> | 
                        <span>${post.category}</span>
                    </div>
                </div>
            </article>
        `;
    }

    function displayPosts(postsToShow = posts) {
        articlesContainer.innerHTML = postsToShow
            .map(post => createArticleCard(post))
            .join('');
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm)
        );
        displayPosts(filteredPosts);
    });

    // Category filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            const filteredPosts = category === 'all' 
                ? posts 
                : posts.filter(post => post.category === category);
            
            displayPosts(filteredPosts);
        });
    });

    // Initial display
    displayPosts();
});
