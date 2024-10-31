//store Pinia dédié à la gestion de l'utilisateur connecté.
import { defineStore } from 'pinia';
import type { User } from '@/types';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    currentUser: null,
    isAuthenticated: false,
    loading: false,
  }),

  getters: {
    isAdmin: (state) => state.currentUser?.role === 'admin',
  },

  actions: {
    setUser(user: User | null) {
      this.currentUser = user;
      this.isAuthenticated = !!user;
    },

    async login(email: string, password: string) {
      this.loading = true;
      try {
        // Implémentez votre logique de connexion ici
        const user = {
          id: '1', email, name: 'John Doe', role: 'user' as const,
        };
        this.setUser(user);
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.setUser(null);
    },
  },
});
