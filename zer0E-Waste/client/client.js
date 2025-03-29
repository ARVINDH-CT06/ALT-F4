// client.js - Zer0e-Waste Client Dashboard Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the client dashboard
    initClientDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadClientData();
});

function initClientDashboard() {
    // Set up profile dropdown functionality
    const profileBtn = document.getElementById('profileDropdownBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            const dropdown = document.getElementById('profileDropdown');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#profileDropdownBtn')) {
            const dropdown = document.getElementById('profileDropdown');
            if (dropdown) dropdown.style.display = 'none';
        }
    });
    
    // Add animation to feature cards
    animateFeatureCards();
}

function setupEventListeners() {
    // Navigation to feature pages
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature') || 
                          this.querySelector('h3').textContent.toLowerCase().replace(' ', '');
            navigateToFeature(feature);
        });
    });
    
    // Set up any other global client-side event listeners
}

function loadClientData() {
    // In a real app, this would fetch data from your backend
    console.log('Loading client data...');
    
    // Simulate loading user data
    setTimeout(() => {
        updateUIWithSampleData();
    }, 500);
}

function updateUIWithSampleData() {
    // Update with sample data (replace with real data in production)
    const sampleData = {
        userName: "Rahul Sharma",
        upcomingPickups: 2,
        ecoPoints: 150,
        recentActivity: [
            { type: "pickup", id: "EW12345", status: "Scheduled", date: "2023-06-15" },
            { type: "donation", id: "DN1001", status: "Completed", date: "2023-06-10" }
        ]
    };
    
    // Update profile information
    const profileElements = document.querySelectorAll('.profile-info');
    profileElements.forEach(el => {
        if (el.id === 'userName') el.textContent = sampleData.userName;
        if (el.id === 'ecoPoints') el.textContent = sampleData.ecoPoints;
    });
}

function navigateToFeature(feature) {
    const featureMap = {
        'pickuprequest': 'pickup.html',
        'pickup': 'pickup.html',
        'facilitylocator': 'facility.html',
        'facility': 'facility.html',
        'ewaste': 'ewaste.html',
        'feedback': 'feedback.html',
        'notify': 'notify.html',
        'myexx': 'myexx.html',
        'donate': 'donate.html'
    };
    
    const normalizedFeature = feature.toLowerCase().replace(/ /g, '');
    
    if (featureMap[normalizedFeature]) {
        window.location.href = featureMap[normalizedFeature];
    } else {
        console.warn(`Unknown feature: ${feature}`);
        // Default to pickup page
        window.location.href = 'pickup.html';
    }
}

function animateFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        card.style.transform = 'translateY(20px)';
        card.style.opacity = '0';
        card.style.transition = `all 0.3s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, 100);
    });
}

// Client-specific utility functions
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showLoading(show = true) {
    const loader = document.getElementById('globalLoader') || createGlobalLoader();
    loader.style.display = show ? 'flex' : 'none';
}

function createGlobalLoader() {
    const loader = document.createElement('div');
    loader.id = 'globalLoader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
    `;
    document.body.appendChild(loader);
    return loader;
}

