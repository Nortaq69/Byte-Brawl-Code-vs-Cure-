// Layout Management - Responsive Behavior and Layout Utilities

class LayoutManager {
    constructor() {
        this.currentBreakpoint = this.getBreakpoint();
        this.isMobile = this.currentBreakpoint === 'mobile';
        this.isTablet = this.currentBreakpoint === 'tablet';
        this.isDesktop = this.currentBreakpoint === 'desktop';
        
        this.initializeLayout();
        this.setupEventListeners();
    }

    initializeLayout() {
        this.updateLayoutClasses();
        this.initializeSidebar();
        this.initializeNavigation();
        this.initializeResponsiveElements();
    }

    setupEventListeners() {
        // Window resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Orientation change handler
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });

        // Scroll handler for sticky elements
        window.addEventListener('scroll', this.debounce(() => {
            this.handleScroll();
        }, 16));
    }

    // Breakpoint Detection
    getBreakpoint() {
        const width = window.innerWidth;
        if (width < 640) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    updateLayoutClasses() {
        const breakpoint = this.getBreakpoint();
        document.documentElement.setAttribute('data-breakpoint', breakpoint);
        
        // Update internal state
        this.currentBreakpoint = breakpoint;
        this.isMobile = breakpoint === 'mobile';
        this.isTablet = breakpoint === 'tablet';
        this.isDesktop = breakpoint === 'desktop';
    }

    // Sidebar Management
    initializeSidebar() {
        const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
        const sidebars = document.querySelectorAll('.sidebar-modern, .dashboard-sidebar-modern');
        
        sidebarToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        });

        // Close sidebar on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('sidebar-overlay')) {
                this.closeSidebar();
            }
        });

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
            }
        });
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar-modern, .dashboard-sidebar-modern');
        if (!sidebar) return;

        if (this.isMobile || this.isTablet) {
            if (sidebar.classList.contains('sidebar-open')) {
                this.closeSidebar();
            } else {
                this.openSidebar();
            }
        }
    }

    openSidebar() {
        const sidebar = document.querySelector('.sidebar-modern, .dashboard-sidebar-modern');
        if (!sidebar) return;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(overlay);
        sidebar.classList.add('sidebar-open');
        
        // Animate overlay
        setTimeout(() => overlay.style.opacity = '1', 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeSidebar() {
        const sidebar = document.querySelector('.sidebar-modern, .dashboard-sidebar-modern');
        const overlay = document.querySelector('.sidebar-overlay');
        
        if (sidebar) {
            sidebar.classList.remove('sidebar-open');
        }
        
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    // Navigation Management
    initializeNavigation() {
        const nav = document.querySelector('.nav-modern');
        if (!nav) return;

        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                nav.classList.add('nav-hidden');
            } else {
                // Scrolling up
                nav.classList.remove('nav-hidden');
            }
            
            lastScrollTop = scrollTop;
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        navLinks.classList.toggle('nav-links-open');
        
        // Animate menu items
        const links = navLinks.querySelectorAll('.nav-link-modern');
        links.forEach((link, index) => {
            if (navLinks.classList.contains('nav-links-open')) {
                link.style.animationDelay = `${index * 0.1}s`;
                link.classList.add('nav-link-animate');
            } else {
                link.classList.remove('nav-link-animate');
            }
        });
    }

    // Responsive Elements
    initializeResponsiveElements() {
        this.updateResponsiveElements();
        
        // Observe elements that need responsive updates
        const observer = new ResizeObserver(() => {
            this.updateResponsiveElements();
        });
        
        const responsiveElements = document.querySelectorAll('.responsive-element');
        responsiveElements.forEach(el => observer.observe(el));
    }

    updateResponsiveElements() {
        // Update grid columns based on screen size
        const grids = document.querySelectorAll('.grid-modern');
        grids.forEach(grid => {
            if (this.isMobile) {
                grid.style.gridTemplateColumns = '1fr';
            } else if (this.isTablet) {
                grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
            }
        });

        // Update masonry columns
        const masonry = document.querySelectorAll('.masonry-layout-modern');
        masonry.forEach(masonry => {
            if (this.isMobile) {
                masonry.style.columns = '1';
            } else if (this.isTablet) {
                masonry.style.columns = '2';
            } else {
                masonry.style.columns = '3';
            }
        });

        // Update card grid
        const cardGrids = document.querySelectorAll('.card-grid-modern');
        cardGrids.forEach(grid => {
            if (this.isMobile) {
                grid.style.gridTemplateColumns = '1fr';
            } else if (this.isTablet) {
                grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
            }
        });
    }

    // Scroll Management
    handleScroll() {
        this.updateStickyElements();
        this.updateParallaxElements();
        this.updateScrollProgress();
    }

    updateStickyElements() {
        const stickyElements = document.querySelectorAll('.sticky-element');
        const scrollTop = window.pageYOffset;
        
        stickyElements.forEach(element => {
            const offset = element.getAttribute('data-sticky-offset') || 0;
            const shouldStick = scrollTop > offset;
            
            if (shouldStick) {
                element.classList.add('sticky-active');
            } else {
                element.classList.remove('sticky-active');
            }
        });
    }

    updateParallaxElements() {
        const parallaxElements = document.querySelectorAll('.parallax');
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax-speed') || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    }

    // Resize Handling
    handleResize() {
        const newBreakpoint = this.getBreakpoint();
        
        if (newBreakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = newBreakpoint;
            this.updateLayoutClasses();
            this.updateResponsiveElements();
            this.handleBreakpointChange(newBreakpoint);
        }
    }

    handleBreakpointChange(newBreakpoint) {
        // Close mobile menu when switching to desktop
        if (newBreakpoint === 'desktop') {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.remove('nav-links-open');
            }
        }

        // Close sidebar on mobile
        if (newBreakpoint === 'mobile') {
            this.closeSidebar();
        }

        // Trigger custom breakpoint change event
        const event = new CustomEvent('breakpointChange', {
            detail: { breakpoint: newBreakpoint }
        });
        document.dispatchEvent(event);
    }

    handleOrientationChange() {
        // Recalculate layout after orientation change
        setTimeout(() => {
            this.updateLayoutClasses();
            this.updateResponsiveElements();
            this.handleResize();
        }, 100);
    }

    // Layout Utilities
    centerElement(element) {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        const top = Math.max(0, (windowHeight - rect.height) / 2);
        const left = Math.max(0, (windowWidth - rect.width) / 2);
        
        element.style.position = 'fixed';
        element.style.top = top + 'px';
        element.style.left = left + 'px';
        element.style.transform = 'none';
    }

    fitElementToViewport(element, padding = 20) {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight - (padding * 2);
        const windowWidth = window.innerWidth - (padding * 2);
        
        let scale = 1;
        
        if (rect.width > windowWidth) {
            scale = windowWidth / rect.width;
        }
        
        if (rect.height * scale > windowHeight) {
            scale = windowHeight / rect.height;
        }
        
        element.style.transform = `scale(${scale})`;
    }

    // Grid Management
    createGrid(container, items, columns = 3, gap = 20) {
        if (!container) return;
        
        container.style.display = 'grid';
        container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        container.style.gap = gap + 'px';
        
        items.forEach(item => {
            container.appendChild(item);
        });
    }

    // Masonry Layout
    createMasonry(container, items, columns = 3, gap = 20) {
        if (!container) return;
        
        container.style.columns = columns;
        container.style.columnGap = gap + 'px';
        
        items.forEach(item => {
            item.style.breakInside = 'avoid';
            item.style.marginBottom = gap + 'px';
            container.appendChild(item);
        });
    }

    // Flexbox Layout
    createFlexLayout(container, items, direction = 'row', wrap = true, justify = 'flex-start', align = 'stretch') {
        if (!container) return;
        
        container.style.display = 'flex';
        container.style.flexDirection = direction;
        container.style.flexWrap = wrap ? 'wrap' : 'nowrap';
        container.style.justifyContent = justify;
        container.style.alignItems = align;
        
        items.forEach(item => {
            container.appendChild(item);
        });
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

    // Public API
    getBreakpointInfo() {
        return {
            current: this.currentBreakpoint,
            isMobile: this.isMobile,
            isTablet: this.isTablet,
            isDesktop: this.isDesktop,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    // Event Listeners
    onBreakpointChange(callback) {
        document.addEventListener('breakpointChange', (e) => {
            callback(e.detail.breakpoint);
        });
    }

    onResize(callback) {
        window.addEventListener('resize', this.debounce(callback, 250));
    }

    onScroll(callback) {
        window.addEventListener('scroll', this.debounce(callback, 16));
    }
}

// Initialize Layout Manager
const layoutManager = new LayoutManager();

// Export for use in other modules
window.LayoutManager = layoutManager; 