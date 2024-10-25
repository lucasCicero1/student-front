import { defineStore } from 'pinia';

const loggedUser = window.sessionStorage.getItem('loggedUser');
const sessionToken = window.sessionStorage.getItem('token');

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: loggedUser ?? null,
    token: sessionToken ?? null,
  }),

  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
  },

  actions: {
    setToken(token) {
      window.sessionStorage.setItem('token', token);
      this.token = token;
    },

    setUser(user) {
      window.sessionStorage.setItem('loggedUser', user);
      this.user = user;
    },

    logout() {
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('loggedUser');
      this.user = null;
      this.token = null;
    },
  },
});
