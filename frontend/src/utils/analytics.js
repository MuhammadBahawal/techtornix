// Visitor tracking utility
let sessionId = null;

// Generate or get session ID
const getSessionId = () => {
    if (!sessionId) {
        sessionId = localStorage.getItem('visitor_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('visitor_session_id', sessionId);
        }
    }
    return sessionId;
};

// Track page visit
export const trackPageVisit = async (pageUrl = window.location.pathname) => {
    try {
        const response = await fetch('https://techtornix.com/api/analytics/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                page_url: pageUrl,
                session_id: getSessionId(),
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            console.warn('Failed to track page visit:', response.statusText);
        }
    } catch (error) {
        console.warn('Error tracking page visit:', error);
    }
};

// Track page visit with debouncing to avoid multiple calls
let trackingTimeout = null;
export const trackPageVisitDebounced = (pageUrl = window.location.pathname) => {
    if (trackingTimeout) {
        clearTimeout(trackingTimeout);
    }

    trackingTimeout = setTimeout(() => {
        trackPageVisit(pageUrl);
    }, 1000); // 1 second delay
};

// Initialize tracking for the current page
export const initializeTracking = () => {
    // Track initial page load
    trackPageVisit();

    // Track page visibility changes (when user comes back to tab)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            trackPageVisitDebounced();
        }
    });
};
