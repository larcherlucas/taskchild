import { defineStore } from 'pinia';

interface AuthState {
  user: null | User;
  token: null | string;
  rememberMe: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    rememberMe: false,
  }),
  actions: {
    login(password: string) {
      const DEMO_PASSWORD = 'VueEstLeMaitreDuFront';
      const mockUser = {
        id: '1',
        name: 'Lucas',
        email: 'lucas@example.com',
      };

      if (password === DEMO_PASSWORD) {
        this.token = 'dummy-token';  // Générer un token simulé
        this.user = mockUser;
        this.rememberMe = false;
        this.saveToken();
        return true;
      } else {
        throw new Error('Mot de passe incorrect - Utilisez le mot de passe fourni dans la modale');
      }
    },

    saveToken() {
      if (this.rememberMe) {
        localStorage.setItem('authToken', this.token as string);
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        sessionStorage.setItem('authToken', this.token as string);
        sessionStorage.setItem('user', JSON.stringify(this.user));
      }
    },

    loadToken() {
      this.token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || null;
      const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (userStr) {
        try {
          this.user = JSON.parse(userStr);
        } catch {
          this.user = null;
        }
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.rememberMe = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('user');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    currentUser: (state) => state.user,
  },
});