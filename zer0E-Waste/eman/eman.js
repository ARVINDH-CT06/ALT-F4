// E-Man Dashboard Functions
function navigateToFeature(feature) {
    const featurePages = {
        'pickups': 'pickups.html',
        'myexx': 'myexx.html',
        'ewaste': 'ewaste.html'
    };
    
    if (featurePages[feature]) {
        window.location.href = featurePages[feature];
    }
}

// Initialize E-Man Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Profile dropdown toggle
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
    
    // Simulate real-time pickup updates
    setInterval(updatePickupStatus, 30000);
});

function updatePickupStatus() {
    // In a real app, this would fetch from server
    console.log("Checking for new pickups...");
}