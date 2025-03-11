// Wait for document to load
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return; // Skip if href is just "#"
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Stagger the animations
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Handle the CTA button animations
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add functionality to unblock buttons
    const unblockButtons = document.querySelectorAll('.unblock-button');
    unblockButtons.forEach(button => {
        button.addEventListener('click', function() {
            const websiteElement = this.parentElement;
            websiteElement.style.opacity = '0.5';
            this.textContent = 'Unblocking...';
            
            // Simulate unblocking process
            setTimeout(() => {
                websiteElement.style.height = '0';
                websiteElement.style.padding = '0';
                websiteElement.style.margin = '0';
                websiteElement.style.overflow = 'hidden';
                
                setTimeout(() => {
                    websiteElement.remove();
                }, 300);
            }, 800);
        });
    });

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-header, .step-card, .testimonial-card, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-in');
            }
        });
    };

    // Add CSS classes for animation
    const style = document.createElement('style');
    style.textContent = `
        .section-header, .step-card, .testimonial-card, .team-member {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Initialize scroll animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}); 