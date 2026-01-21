// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project Window Tab Switching Logic
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.project-content-pane');
    const projectWindow = document.querySelector('.project-window');

    // Theme colors for each project
    const projectColors = {
        'poselab': '#ff6a00ff',   // Orange
        'roulette': '#ff2222ff',  // Red
        'aimap': '#6164ffff'      // Yellow
    };

    // Set initial color based on active tab
    const initialTab = document.querySelector('.tab-btn.active');
    if (initialTab && projectWindow) {
        const pid = initialTab.getAttribute('data-project');
        if (projectColors[pid]) {
            projectWindow.style.setProperty('--theme-color', projectColors[pid]);
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Get target project id
            const targetId = tab.getAttribute('data-project');

            // Apply Theme Color
            if (projectWindow && projectColors[targetId]) {
                projectWindow.style.setProperty('--theme-color', projectColors[targetId]);
            }

            // Hide all panes
            panes.forEach(pane => pane.classList.remove('active'));

            // Show target pane
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
});

// Add loading animation class to body
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;

    // Create ripple element
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    // Remove existing ripple if any (optional, but cleaner)
    const existingRipple = button.getElementsByClassName('ripple')[0];
    if (existingRipple) {
        existingRipple.remove();
    }

    button.appendChild(circle);

    // Remove ripple after animation
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// Apply ripple effect to relevant elements
document.addEventListener('DOMContentLoaded', () => {
    const rippleElements = document.querySelectorAll('.cta-button, .btn, .contact-link, .tab-btn');
    rippleElements.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.4);
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .cta-button, .btn, .contact-link, .tab-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
