import { defineStore } from 'pinia';

const sessionToken = window.sessionStorage.getItem('token');

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: sessionToken ?? null,
  }),

  getters: {
    getToken: (state) => state.token,
  },

  actions: {
    setToken(token) {
      window.sessionStorage.setItem('token', token);
      this.token = token;
    },
  },
});
