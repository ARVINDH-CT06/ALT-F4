// signup.js - Zer0e-Waste Registration Form Functionality

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const signupForm = document.getElementById('signupForm');
    const userTypeSelect = document.getElementById('userType');
    const shopAddressGroup = document.getElementById('shopAddressGroup');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthBar = document.querySelector('.strength-bar');
    
    // Show/hide shop address field based on user type
    userTypeSelect.addEventListener('change', function() {
        if (this.value === 'eman') {
            shopAddressGroup.style.display = 'block';
            // Add animation class
            shopAddressGroup.classList.add('field-visible');
        } else {
            shopAddressGroup.style.display = 'none';
            shopAddressGroup.classList.remove('field-visible');
        }
    });

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const strength = calculatePasswordStrength(this.value);
        updateStrengthIndicator(strength);
    });

    // Form submission handler
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            showLoadingState();
            
            // In a real app, this would be an AJAX call
            setTimeout(() => {
                handleSuccessfulSignup();
            }, 1500);
        }
    });

    // Real-time validation for confirm password
    confirmPasswordInput.addEventListener('input', function() {
        if (passwordInput.value !== this.value) {
            this.setCustomValidity('Passwords do not match');
            this.classList.add('invalid');
        } else {
            this.setCustomValidity('');
            this.classList.remove('invalid');
        }
    });

    // Helper Functions
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Complexity checks
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        return Math.min(strength, 5); // Cap at 5
    }

    function updateStrengthIndicator(strength) {
        const colors = ['#e53935', '#ef5350', '#ffa726', '#66bb6a', '#2e7d32'];
        const width = (strength / 5) * 100;
        
        strengthBar.style.width = `${width}%`;
        strengthBar.style.backgroundColor = colors[strength - 1] || colors[0];
    }

    function validateForm() {
        let isValid = true;
        
        // Check required fields
        const requiredFields = signupForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('invalid');
                isValid = false;
            } else {
                field.classList.remove('invalid');
            }
        });
        
        // Special password validation
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.classList.add('invalid');
            showErrorToast('Passwords do not match');
            isValid = false;
        }
        
        // Validate email format
        const emailField = document.getElementById('email');
        if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
            emailField.classList.add('invalid');
            showErrorToast('Please enter a valid email address');
            isValid = false;
        }
        
        return isValid;
    }

    function showLoadingState() {
        const submitButton = signupForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <div class="spinner"></div>
            <span>Creating Account...</span>
        `;
        
        // Revert button if submission fails (not shown in this example)
        return originalText;
    }

    function handleSuccessfulSignup() {
        // Show success message
        showSuccessToast('Account created successfully!');
        
        // Redirect based on user type
        setTimeout(() => {
            const userType = userTypeSelect.value;
            if (userType === 'client') {
                window.location.href = '../client/client.html';
            } else {
                window.location.href = '../eman/eman.html';
            }
        }, 2000);
    }

    function showErrorToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast error';
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

    function showSuccessToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});

