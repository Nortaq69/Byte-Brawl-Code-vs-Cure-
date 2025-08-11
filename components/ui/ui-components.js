// Modern UI Components - Enhanced Interactions and Animations

class ModernUIComponents {
    constructor() {
        this.initializeComponents();
        this.setupEventListeners();
    }

    initializeComponents() {
        this.initializeParticleField();
        this.initializeCircuitGrid();
        this.initializeNeonLines();
        this.initializeThemeToggle();
        this.initializeTooltips();
        this.initializeModals();
        this.initializeTabs();
        this.initializeDropdowns();
        this.initializeSliders();
        this.initializeToggles();
        this.initializeProgressBars();
        this.initializeAnimations();
    }

    setupEventListeners() {
        // Global event listeners
        document.addEventListener('DOMContentLoaded', () => {
            this.setupKeyboardShortcuts();
            this.setupScrollEffects();
            this.setupHoverEffects();
        });

        // Window resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    // Particle Field Animation
    initializeParticleField() {
        const particleField = document.getElementById('particleField');
        if (!particleField) return;

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-cyan);
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.1};
                animation: particleFloat ${Math.random() * 10 + 10}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleField.appendChild(particle);
        }
    }

    // Circuit Grid Animation
    initializeCircuitGrid() {
        const circuitGrid = document.getElementById('circuitGrid');
        if (!circuitGrid) return;

        // Add circuit nodes
        for (let i = 0; i < 20; i++) {
            const node = document.createElement('div');
            node.className = 'circuit-node';
            node.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-cyan);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--primary-cyan);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: circuitPulse ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            circuitGrid.appendChild(node);
        }
    }

    // Neon Lines Animation
    initializeNeonLines() {
        const neonLines = document.getElementById('neonLines');
        if (!neonLines) return;

        // Create animated neon lines
        for (let i = 0; i < 5; i++) {
            const line = document.createElement('div');
            line.className = 'neon-line';
            line.style.cssText = `
                position: absolute;
                height: 1px;
                background: linear-gradient(90deg, transparent, var(--primary-cyan), transparent);
                width: ${Math.random() * 200 + 100}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: neonFlow ${Math.random() * 4 + 3}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            neonLines.appendChild(line);
        }
    }

    // Theme Toggle
    initializeThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition effect
        document.documentElement.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    }

    // Tooltips
    initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-modern';
            tooltip.textContent = element.getAttribute('data-tooltip');
            
            element.addEventListener('mouseenter', () => {
                document.body.appendChild(tooltip);
                this.positionTooltip(element, tooltip);
                setTimeout(() => tooltip.classList.add('show'), 100);
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 300);
            });
        });
    }

    positionTooltip(element, tooltip) {
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 10;
        
        // Adjust if tooltip goes off screen
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = rect.bottom + 10;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }

    // Modals
    initializeModals() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });

        // Close modal on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay-modern')) {
                this.closeModal(e.target);
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal-overlay-modern.show');
                if (openModal) {
                    this.closeModal(openModal);
                }
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay-modern';
        overlay.appendChild(modal.cloneNode(true));
        document.body.appendChild(overlay);
        
        // Add close button if not present
        const closeBtn = overlay.querySelector('.modal-close-modern');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal(overlay));
        }
        
        setTimeout(() => overlay.classList.add('show'), 10);
    }

    closeModal(overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    }

    // Tabs
    initializeTabs() {
        const tabContainers = document.querySelectorAll('.tabs-container-modern');
        
        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll('.tab-button-modern');
            const contents = container.querySelectorAll('.tab-content-modern');
            
            tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs and contents
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding content
                    tab.classList.add('active');
                    if (contents[index]) {
                        contents[index].classList.add('active');
                    }
                });
            });
            
            // Activate first tab by default
            if (tabs.length > 0) {
                tabs[0].click();
            }
        });
    }

    // Dropdowns
    initializeDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown-container-modern');
        
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger-modern');
            const menu = dropdown.querySelector('.dropdown-menu-modern');
            
            if (!trigger || !menu) return;
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                }
            });
            
            // Toggle dropdown on trigger click
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = menu.style.opacity === '1';
                
                if (isOpen) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                } else {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                }
            });
        });
    }

    // Sliders
    initializeSliders() {
        const sliders = document.querySelectorAll('.slider-modern');
        
        sliders.forEach(slider => {
            const valueDisplay = slider.parentElement.querySelector('.slider-value-modern');
            
            const updateValue = () => {
                if (valueDisplay) {
                    valueDisplay.textContent = slider.value;
                }
                
                // Update slider track color
                const percentage = (slider.value - slider.min) / (slider.max - slider.min) * 100;
                slider.style.background = `linear-gradient(90deg, 
                    var(--primary-cyan) 0%, 
                    var(--primary-cyan) ${percentage}%, 
                    var(--background-card) ${percentage}%, 
                    var(--background-card) 100%)`;
            };
            
            slider.addEventListener('input', updateValue);
            updateValue(); // Initial update
        });
    }

    // Toggle Switches
    initializeToggles() {
        const toggles = document.querySelectorAll('.toggle-switch-modern input');
        
        toggles.forEach(toggle => {
            toggle.addEventListener('change', () => {
                const slider = toggle.nextElementSibling;
                if (toggle.checked) {
                    slider.style.background = 'linear-gradient(135deg, var(--primary-cyan), var(--secondary-blue))';
                } else {
                    slider.style.background = 'var(--background-card)';
                }
            });
        });
    }

    // Progress Bars
    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar-modern');
        
        progressBars.forEach(bar => {
            const container = bar.parentElement;
            const text = container.querySelector('.progress-text-modern');
            
            const updateProgress = (value) => {
                bar.style.width = value + '%';
                if (text) {
                    text.textContent = value + '%';
                }
            };
            
            // Animate progress on load
            const targetValue = parseInt(bar.getAttribute('data-value') || '0');
            let currentValue = 0;
            
            const animate = () => {
                if (currentValue < targetValue) {
                    currentValue += 1;
                    updateProgress(currentValue);
                    requestAnimationFrame(animate);
                }
            };
            
            animate();
        });
    }

    // Animation System
    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.showSearch();
            }
            
            // Ctrl/Cmd + / for help
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                this.showHelp();
            }
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }

    // Hover Effects
    setupHoverEffects() {
        const hoverElements = document.querySelectorAll('.hover-effect');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
        });
    }

    createRippleEffect(event) {
        const ripple = document.createElement('span');
        const rect = event.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(0, 255, 231, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        event.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Utility Methods
    debounce(func, wait) {
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

    handleResize() {
        // Recalculate tooltip positions
        const tooltips = document.querySelectorAll('.tooltip-modern.show');
        tooltips.forEach(tooltip => {
            const element = document.querySelector(`[data-tooltip="${tooltip.textContent}"]`);
            if (element) {
                this.positionTooltip(element, tooltip);
            }
        });
    }

    showSearch() {
        // Implement search functionality
        console.log('Search triggered');
    }

    showHelp() {
        // Implement help functionality
        console.log('Help triggered');
    }

    // Toast Notification System
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast-modern ${type}`;
        toast.textContent = message;
        
        const container = document.getElementById('toastContainer') || document.body;
        container.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Loading System
    showLoading(message = 'Loading...') {
        const overlay = document.getElementById('loadingOverlay');
        if (!overlay) return;
        
        const messageEl = overlay.querySelector('.loading-message-modern');
        if (messageEl) {
            messageEl.textContent = message;
        }
        
        overlay.style.display = 'flex';
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    // Form Validation
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
        });
        
        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = message;
        error.style.cssText = `
            color: var(--error-red);
            font-size: 0.8rem;
            margin-top: 0.25rem;
            animation: fadeInUp 0.3s ease-out;
        `;
        
        field.parentNode.appendChild(error);
        field.style.borderColor = 'var(--error-red)';
    }

    clearFieldError(field) {
        const error = field.parentNode.querySelector('.field-error');
        if (error) {
            error.remove();
        }
        field.style.borderColor = '';
    }
}

// Initialize UI Components
const modernUI = new ModernUIComponents();

// Export for use in other modules
window.ModernUI = modernUI; 