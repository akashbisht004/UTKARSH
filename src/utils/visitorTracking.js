// Utility functions for tracking website visitors

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

const getCurrentDay = () => {
  return new Date().getDay();
};

// Initialize visitor data if not exists
const initializeVisitorData = () => {
  const visitorData = localStorage.getItem('visitorData');
  if (!visitorData) {
    const initialData = {
      daily: {},
      weekly: Array(7).fill(0),
      total: 0,
      lastUpdated: getCurrentDate()
    };
    localStorage.setItem('visitorData', JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(visitorData);
};

// Track a new visitor
export const trackVisitor = () => {
  const visitorData = initializeVisitorData();
  const today = getCurrentDate();
  const currentDay = getCurrentDay();

  // Update daily count
  visitorData.daily[today] = (visitorData.daily[today] || 0) + 1;
  
  // Update weekly count
  visitorData.weekly[currentDay] = (visitorData.weekly[currentDay] || 0) + 1;
  
  // Update total count
  visitorData.total += 1;
  
  // Update last updated timestamp
  visitorData.lastUpdated = today;

  // Save to localStorage
  localStorage.setItem('visitorData', JSON.stringify(visitorData));
  
  return visitorData;
};

// Get visitor statistics
export const getVisitorStats = () => {
  const visitorData = initializeVisitorData();
  const today = getCurrentDate();
  
  // Calculate week-over-week growth
  const currentWeekTotal = visitorData.weekly.reduce((a, b) => a + b, 0);
  const lastWeekTotal = visitorData.total - currentWeekTotal;
  const growth = lastWeekTotal > 0 
    ? ((currentWeekTotal - lastWeekTotal) / lastWeekTotal) * 100 
    : 0;

  return {
    daily: visitorData.daily[today] || 0,
    weekly: visitorData.weekly,
    total: visitorData.total,
    growth: growth.toFixed(1),
    lastUpdated: visitorData.lastUpdated
  };
};

// Reset visitor data (for testing purposes)
export const resetVisitorData = () => {
  localStorage.removeItem('visitorData');
  return initializeVisitorData();
}; 