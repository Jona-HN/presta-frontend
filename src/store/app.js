// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    loggedIn: false,
  }),
  actions: {
    changeStatus(loggedIn) {
      this.loggedIn = loggedIn;
    }
  },
  getters: {
    isLoggedIn: (state) => state.loggedIn,
  }
});