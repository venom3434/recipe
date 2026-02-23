// ==================== SEARCH FUNCTIONALITY ====================
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-bar .btn');

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        console.log('Searching for: ' + query);
        // Add your search functionality here
    }
}

// ==================== RECIPE CARDS ====================
const recipeCards = document.querySelectorAll('.recipe-card');

recipeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    const viewBtn = card.querySelector('.btn-small');
    viewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const recipeName = card.querySelector('h3').textContent;
        showRecipeDetail(recipeName);
    });
});

function showRecipeDetail(recipeName) {
    console.log('Viewing recipe: ' + recipeName);
    // Add your recipe detail functionality here
}

// ==================== CATEGORY CARDS ====================
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const category = this.querySelector('h3').textContent;
        filterByCategory(category);
    });

    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

function filterByCategory(category) {
    console.log('Filtering by category: ' + category);
    // Add your filter functionality here
}

// ==================== FAQ TOGGLE ====================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ==================== MOBILE MENU ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== SAVE RECIPE ====================
function saveRecipe(recipeName) {
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    if (!savedRecipes.includes(recipeName)) {
        savedRecipes.push(recipeName);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        console.log('Recipe saved: ' + recipeName);
    }
}

// ==================== RATING SYSTEM ====================
function rateRecipe(recipeName, rating) {
    console.log('Recipe: ' + recipeName + ' rated: ' + rating + ' stars');
    // Add your rating functionality here
}

// ==================== INITIALIZATION ====================
console.log('RecipeHub loaded successfully!');

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.recipe-card, .feature-card, .category-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
});