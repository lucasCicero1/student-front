import { defineStore } from 'pinia';

const loggedUser = window.localStorage.getItem('loggedUser');
const sessionToken = window.localStorage.getItem('token');

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
      window.localStorage.setItem('token', token);
      this.token = token;
    },

    setUser(user) {
      window.localStorage.setItem('loggedUser', user);
      this.user = user;
    },

    logout() {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('loggedUser');
      this.user = null;
      this.token = null;
    },
  },
});
