// This module is temporarily disabled because it was causing the app to crash
// It attempted to initialize at module load time before React could mount
// TODO: Re-enable this with lazy loading or after React has mounted

// import { makeElementExplainable } from "./joseph-global-explain";

// Demo function to make specific elements explainable
// This function is currently disabled due to initialization issues
// TODO: Re-implement with proper lazy loading
export function initializeDemoExplainableElements() {
  console.log('Demo explainable elements feature is currently disabled');
  // Feature disabled to prevent app crashes
}

// Auto-initialize when script loads - but only after a delay to ensure DOM is ready
// This is wrapped in a try-catch to prevent it from breaking the app if there are issues
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Only auto-initialize if we're in a browser environment and document is ready
  const autoInitialize = () => {
    try {
      // Check if document.body exists before trying to query selectors
      if (document.body) {
        initializeDemoExplainableElements();
      }
    } catch (error) {
      console.error('Failed to initialize demo explainable elements:', error);
    }
  };

  // Defer initialization to allow React to fully mount
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitialize);
  } else {
    // DOMContentLoaded already fired, schedule for next microtask
    setTimeout(autoInitialize, 0);
  }
}
