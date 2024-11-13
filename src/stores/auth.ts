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
    login(email: string, password: string) {
      // Exemple d'utilisateur stocké en dur
      const mockUser = {
        id: '1',
        name: 'Lucas',
        email: 'lucas.larcher@exemple.com',
        password: 'password123', // Mot de passe simulé
      };

      if (email === mockUser.email && password === mockUser.password) {
        this.token = 'dummy-token';  // Générer un token simulé
        this.user = mockUser;
        this.rememberMe = false;
        this.saveToken();  // Sauvegarder le token dans localStorage
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    },

    saveToken() {
      if (this.rememberMe) {
        localStorage.setItem('authToken', this.token as string);
      } else {
        sessionStorage.setItem('authToken', this.token as string);
      }
    },

    loadToken() {
      this.token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || null;
    },

    logout() {
      this.token = null;
      this.user = null;
      this.rememberMe = false;
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    },
  },
});
