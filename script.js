const byId = (id) => document.getElementById(id);

// Cache DOM elements
const signUpButton = byId('signUp');
const signInButton = byId('signIn');
const container = byId('container');

// Form validation functions
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    return password.length >= 8;
};

// Add event listeners with error handling
const addFormSwitchListeners = () => {
    try {
        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
            // Focus on first input when switching
            const firstInput = document.querySelector('.sign-up-container input');
            if (firstInput) firstInput.focus();
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
            // Focus on first input when switching
            const firstInput = document.querySelector('.sign-in-container input');
            if (firstInput) firstInput.focus();
        });
    } catch (error) {
        console.error('Error adding event listeners:', error);
    }
};

// Add form validation
const addFormValidation = () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const passwordInput = form.querySelector('input[type="password"]');
            
            if (emailInput && !validateEmail(emailInput.value)) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }
            
            if (passwordInput && !validatePassword(passwordInput.value)) {
                alert('Password must be at least 8 characters');
                passwordInput.focus();
                return;
            }
            
            // If validation passes, you can submit the form
            console.log('Form submitted successfully');
            // Here you would typically make an API call or handle form submission
        });
    });
};

// Initialize the application
const init = () => {
    addFormSwitchListeners();
    addFormValidation();
    
    // Add keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            container.classList.remove('right-panel-active');
        }
        if (e.key === 'ArrowRight') {
            container.classList.add('right-panel-active');
        }
    });
};

// Start the application
document.addEventListener('DOMContentLoaded', init);
