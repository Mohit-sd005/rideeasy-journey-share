
import apiClient from './api';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  rating?: number;
  profilePicture?: string;
  vehicleDetails?: string;
  completedRides?: number;
}

export const userService = {
  // Get current user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<UserProfile>('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profile: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await apiClient.put<UserProfile>('/users/profile', profile);
    return response.data;
  },

  // Update password
  updatePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await apiClient.put('/users/password', { currentPassword, newPassword });
  },

  // Upload profile picture
  uploadProfilePicture: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post<{ url: string }>('/users/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  // Get rider public profile
  getRiderProfile: async (riderId: string): Promise<UserProfile> => {
    const response = await apiClient.get<UserProfile>(`/users/rider/${riderId}`);
    return response.data;
  },
};
