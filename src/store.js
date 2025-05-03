import { create } from 'zustand'

// Define the store's state interface
const useStore = create((set) => ({
  // State
  count: 0,
  user: null,
  theme: 'light',
  isLoading: false,  
  error: null,

  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  
  // Async action example
  fetchUser: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/users/${userId}`)
      const user = await response.json()
      set({ user, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  // Toggle theme example
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),

  // Reset state
  reset: () => set({ 
    count: 0, 
    user: null, 
    theme: 'light', 
    isLoading: false, 
    error: null 
  }),
}))

export default useStore
