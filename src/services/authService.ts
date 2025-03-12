
import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface TokenRefreshRequest {
  email: string;
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<void> {
    await api.post('/api/auth/register', userData);
  },

  async refreshToken(refreshData: TokenRefreshRequest): Promise<AuthResponse> {
    const response = await api.post('/api/auth/refresh', refreshData);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
};
