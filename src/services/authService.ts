
import apiClient from './api';

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    phoneNumber: string;
  };
}

export const authService = {
  login: async (payload: LoginPayload, role: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(`/auth/${role}/login`, payload);
    if (response.data.token) {
      localStorage.setItem('auth-token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  signup: async (payload: SignupPayload, role: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(`/auth/${role}/register`, payload);
    if (response.data.token) {
      localStorage.setItem('auth-token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  googleAuth: async (token: string, role: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(`/auth/${role}/google`, { token });
    if (response.data.token) {
      localStorage.setItem('auth-token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
  },
};
