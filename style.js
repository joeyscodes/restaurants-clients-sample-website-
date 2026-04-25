// Osteria N.3 - Optimized + Reservation Confirmation

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// RESERVATION FORM with confirmation message (No page reload)
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state on button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(this);
        
        try {
            // Submit to Formspree (replace with your actual Formspree endpoint if different)
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                // Show success toast message
                showToast('✓ Reservation request sent! We\'ll confirm within 24 hours.', 'success');
                this.reset(); // Clear form
            } else {
                showToast('❌ Something went wrong. Please try again or call us.', 'error');
            }
        } catch (error) {
            showToast('❌ Network error. Please check your connection.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Toast notification function
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) existingToast.remove();
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toast.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});
