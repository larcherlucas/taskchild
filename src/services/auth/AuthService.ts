//gère les fonctions liées à l'authentification.
import axios from 'axios';
import { LoginCredentials, User } from './types';

export class AuthService {
  private static instance: AuthService;

  private baseURL: string = import.meta.env.VITE_API_URL;

  private constructor() { }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data } = await axios.post(`${this.baseURL}/auth/login`, credentials);
      this.setToken(data.token);
      return data.user;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }

  async logout(): Promise<void> {
    this.removeToken();
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  removeToken(): void {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
