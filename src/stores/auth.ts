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
      const mockUser = {
        id: '1',
        name: 'Lucas',
        email: 'lucas.larcher@exemple.com',
        password: 'password123',
      };

      if (email === mockUser.email && password === mockUser.password) {
        this.token = 'dummy-token';  // Générer un token simulé
        this.user = mockUser;
        this.rememberMe = false;
        this.saveToken();
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    },

    // Nouvelle méthode signup pour l'inscription
    signup(name: string, email: string, password: string) {
      // Exemple d'inscription simulée (vous pouvez remplacer ceci par un appel API)
      const mockNewUser = {
        id: '2',
        name: name,
        email: email,
        password: password,  // Vous devez probablement hacher le mot de passe dans une application réelle
      };

      this.user = mockNewUser;
      this.token = 'dummy-token'; // Générer un token simulé
      this.saveToken();

      return true;  // Retourne true si l'inscription réussie
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
