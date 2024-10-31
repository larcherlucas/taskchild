//maintient l'état de l'utilisateur authentifié et du jeton d'authentification
//fournit des méthodes pour se connecter et se déconnecter
//fournit des getters pour obtenir l'utilisateur actuel et savoir si l'utilisateur est authentifié
//utilise le service d'authentification pour effectuer l'authentification
//utilise le service d'authentification pour se déconnecter
//utilise le service d'authentification pour obtenir le jeton d'authentification

import { defineStore } from 'pinia';
import { AuthService } from '@/services/auth/AuthService';
import type { AuthState, LoginCredentials, User } from '@/services/auth/types';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials: LoginCredentials) {
      const authService = AuthService.getInstance();
      try {
        const user = await authService.login(credentials);
        this.setUser(user);
        this.setToken(authService.getToken() as string);
        return user;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      const authService = AuthService.getInstance();
      await authService.logout();
      this.resetState();
    },

    setUser(user: User) {
      this.user = user;
      this.isAuthenticated = true;
    },

    setToken(token: string) {
      this.token = token;
    },

    resetState() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },
  },

  getters: {
    currentUser: (state) => state.user,
    userIsAuthenticated: (state) => state.isAuthenticated,
  },
});
