// Navigation functions
function navigateTo(page) {
    if (page === 'client') {
        window.location.href = 'client/client.html';
    } else if (page === 'eman') {
        window.location.href = 'eman/eman.html';
    } else if (page === 'signup') {
        window.location.href = 'auth/signup.html';
    }
}

// Dropdown menu functionality
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
        if (!event.target.closest('#profileDropdownBtn')){
            const dropdown = document.getElementById('profileDropdown');
            if (dropdown) dropdown.style.display = 'none';
        }
    });
});

// Form validation for signup
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Simulate successful signup
        alert('Account created successfully! Redirecting...');
        setTimeout(() => {
            const userType = document.getElementById('userType').value;
            if (userType === 'client') {
                window.location.href = '../client/client.html';
            } else {
                window.location.href = '../eman/eman.html';
            }
        }, 1000);
    });

    // Show/hide shop address field for E-Men
    document.getElementById('userType').addEventListener('change', function() {
        const shopAddressGroup = document.getElementById('shopAddressGroup');
        if (this.value === 'eman') {
            shopAddressGroup.style.display = 'block';
        } else {
            shopAddressGroup.style.display = 'none';
        }
    });
}