/**
 * Prompt Teacher Pro - Main Application
 * Navigation, initialization, ARIA state management, and global utilities
 */

/**
 * Initialize the application
 */
function initApp() {
    console.log('🎯 Prompt Teacher Pro initializing...');

    // Initialize navigation
    initNavigation();

    // Initialize all modules
    if (typeof initTechniques === 'function') initTechniques();
    if (typeof initPractice === 'function') initPractice();
    if (typeof initAnalyzer === 'function') initAnalyzer();
    if (typeof initTemplates === 'function') initTemplates();

    // Initialize keyboard shortcuts
    initKeyboardShortcuts();

    console.log('✅ Prompt Teacher Pro ready!');
}

/**
 * Initialize navigation system with ARIA support
 */
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            switchTab(targetTab, navButtons, tabContents);
        });

        // Keyboard navigation for tabs
        btn.addEventListener('keydown', (e) => {
            handleTabKeyboard(e, navButtons);
        });
    });
}

/**
 * Switch active tab with proper ARIA state updates
 */
function switchTab(targetTab, navButtons, tabContents) {
    // Update nav buttons
    navButtons.forEach(b => {
        const isActive = b.dataset.tab === targetTab;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        b.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    // Update tab panels
    tabContents.forEach(tab => {
        const isActive = tab.id === targetTab;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    // Trigger tab-specific actions
    onTabChange(targetTab);
}

/**
 * Handle keyboard navigation within tab list (WCAG 2.2 compliant)
 */
function handleTabKeyboard(e, navButtons) {
    const currentIndex = Array.from(navButtons).indexOf(e.target);
    let newIndex;

    switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault();
            newIndex = (currentIndex + 1) % navButtons.length;
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            newIndex = (currentIndex - 1 + navButtons.length) % navButtons.length;
            break;
        case 'Home':
            e.preventDefault();
            newIndex = 0;
            break;
        case 'End':
            e.preventDefault();
            newIndex = navButtons.length - 1;
            break;
        default:
            return;
    }

    navButtons[newIndex].focus();
    navButtons[newIndex].click();
}

/**
 * Handle tab changes
 */
function onTabChange(tabId) {
    // Focus management for screen readers
    const panel = document.getElementById(tabId);
    if (panel) {
        // Small delay to allow animation to complete
        setTimeout(() => {
            panel.focus();
        }, 100);
    }

    switch (tabId) {
        case 'analyzer':
            const input = document.getElementById('prompt-input');
            if (input) setTimeout(() => input.focus(), 150);
            break;
    }
}

/**
 * Global toast notification function
 */
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;

        // Announce to screen readers
        toast.setAttribute('role', 'alert');

        // Auto-hide after 3 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.setAttribute('role', 'status');
        }, 3000);
    }
}

/**
 * Keyboard shortcuts
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + number for tab navigation
        if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const tabs = ['guide', 'practice', 'analyzer', 'templates'];
            const tabIndex = parseInt(e.key) - 1;
            const tabBtn = document.querySelector(`[data-tab="${tabs[tabIndex]}"]`);
            if (tabBtn) tabBtn.click();
        }
    });
}

/**
 * Update ARIA attributes for technique pills
 */
function updateTechniquePillsAria(activePill) {
    document.querySelectorAll('.technique-pill').forEach(pill => {
        pill.setAttribute('aria-selected', pill === activePill ? 'true' : 'false');
    });
}

/**
 * Update ARIA for filter buttons
 */
function updateFilterButtonsAria(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.setAttribute('aria-pressed', btn === activeBtn ? 'true' : 'false');
    });
}

/**
 * Initialize on DOM ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Expose global utilities
window.showToast = showToast;
window.updateTechniquePillsAria = updateTechniquePillsAria;
window.updateFilterButtonsAria = updateFilterButtonsAria;
