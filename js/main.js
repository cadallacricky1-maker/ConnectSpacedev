/**
 * ConnectSpace Website - Main JavaScript
 * Handles interactions and dynamic functionality
 */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    console.log('ConnectSpace website loaded successfully');
});

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleCTAClick);
    });

    // Navigation smooth scroll
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Pricing buttons
    const pricingButtons = document.querySelectorAll('.pricing-card .btn');
    pricingButtons.forEach(button => {
        button.addEventListener('click', handlePricingClick);
    });
}

/**
 * Handle contact form submission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate inputs
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate form submission
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    event.target.reset();
}

/**
 * Handle CTA button clicks
 */
function handleCTAClick(event) {
    console.log('CTA clicked');
    // Redirect to pricing page
    window.location.href = 'pricing.html';
}

/**
 * Handle navigation clicks
 */
function handleNavClick(event) {
    const href = event.target.getAttribute('href');
    
    // Allow default navigation for internal pages
    if (href && href !== '#') {
        console.log('Navigating to:', href);
    }
}

/**
 * Handle pricing plan selection
 */
function handlePricingClick(event) {
    const planName = event.target.closest('.pricing-card').querySelector('h3').textContent;
    console.log('Selected plan:', planName);
    alert(`You selected the ${planName} plan. Proceeding to checkout...`);
}

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Utility: Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Utility: Debounce function for event handlers
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Log page analytics
 */
function trackPageView() {
    const page = window.location.pathname;
    console.log('Page view:', page);
    // Add your analytics tracking here
}

// Track page views
trackPageView();