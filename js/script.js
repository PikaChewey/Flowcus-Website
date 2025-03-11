// Wait for document to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();

    // Add smooth scroll behavior for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize animations for cards and UI elements
    function initAnimations() {
        // Initialize the Focus Flow card animations and unblock buttons
        initFocusFlowCard();
        
        // Add animation to feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-in');
        });

        // Add animation to step cards
        const stepCards = document.querySelectorAll('.step-card');
        stepCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('animate-in');
        });

        // Add animation to testimonial cards
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
            card.classList.add('animate-in');
        });

        // Add hover animation to buttons
        const buttons = document.querySelectorAll('.cta-button, .secondary-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.classList.add('button-hover');
            });
            button.addEventListener('mouseleave', function() {
                this.classList.remove('button-hover');
            });
        });

        // Add click animations to buttons
        document.querySelectorAll('.cta-button, .secondary-button, .unblock-button').forEach(button => {
            button.addEventListener('click', function(e) {
                // Create a ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                // Position the ripple
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size/2}px`;
                ripple.style.top = `${e.clientY - rect.top - size/2}px`;
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Initialize Focus Flow card animations
    function initFocusFlowCard() {
        // Animate stats counter for screen time
        const screenTimeElement = document.getElementById('totalScreenTime');
        const targetTime = '3h 24m';
        const hours = parseInt(targetTime.split('h')[0]);
        const minutes = parseInt(targetTime.split('h ')[1]);
        const totalMinutes = (hours * 60) + minutes; // 3h 24m = 204 minutes
        animateCounter(screenTimeElement, 0, totalMinutes, 2000, true, 'hours');
        
        // Animate stats counter for sites visited
        const sitesVisitedElement = document.getElementById('sitesVisited');
        animateCounter(sitesVisitedElement, 0, 4, 1500, false); // Animate from 0 to 4 sites
        
        // Toggle More Details button functionality
        const moreDetailsBtn = document.getElementById('moreDetailsBtn');
        const websiteDetailsDropdown = document.getElementById('websiteDetailsDropdown');
        
        if (moreDetailsBtn) {
            moreDetailsBtn.addEventListener('click', function() {
                websiteDetailsDropdown.classList.toggle('active');
                this.textContent = websiteDetailsDropdown.classList.contains('active') 
                    ? 'Hide Details' 
                    : 'More Details';
            });
        }
        
        // Add hover effect to block button
        const blockBtn = document.getElementById('blockBtn');
        if (blockBtn) {
            blockBtn.addEventListener('mouseenter', function() {
                this.classList.add('button-hover');
            });
            blockBtn.addEventListener('mouseleave', function() {
                this.classList.remove('button-hover');
            });
            
            // Add click event (just animation, no actual blocking)
            blockBtn.addEventListener('click', function(e) {
                const input = document.getElementById('blockSite');
                if (input && input.value.trim()) {
                    // Flash success animation
                    input.style.borderColor = '#10b981';
                    input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.2)';
                    
                    // Reset after a moment
                    setTimeout(() => {
                        input.value = '';
                        input.style.borderColor = '';
                        input.style.boxShadow = '';
                    }, 1000);
                }
            });
        }
    }

    // Add the animated counter function to display stats with animation
    function animateCounter(element, start, end, duration, isTime, timeUnit = 'hours') {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // If it's a time value, format it according to timeUnit
            if (isTime) {
                if (timeUnit === 'hours') {
                    const hours = Math.floor(value / 60);
                    const minutes = value % 60;
                    element.textContent = `${hours}h ${minutes}m`;
                } else {
                    // Just minutes display
                    element.textContent = `${value}m`;
                }
            } else {
                element.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }

    // Animate the stats when the page loads
    const statNumbers = document.querySelectorAll('.stat-number');
    setTimeout(() => {
        statNumbers.forEach(stat => {
            let value = stat.textContent;
            if (value.includes('h')) {
                // Convert "5h 42m" to minutes for animation
                const hoursPart = parseInt(value.split('h')[0]);
                const minutesPart = parseInt(value.split('h')[1]);
                const totalMinutes = hoursPart * 60 + minutesPart;
                animateCounter(stat, 0, totalMinutes, 1500);
            } else {
                animateCounter(stat, 0, parseInt(value), 1500);
            }
        });
    }, 500);
}); 