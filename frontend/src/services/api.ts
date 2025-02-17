import { ApiResponse, User, Profile, MediaItem } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      };

      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      return {
        data: data.data,
        error: data.error,
        status: response.status,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'An error occurred',
        status: 500,
      };
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Profile endpoints
  async getProfile(userId: string): Promise<ApiResponse<Profile>> {
    return this.request(`/profiles/${userId}`);
  }

  async updateProfile(userId: string, data: Partial<Profile>): Promise<ApiResponse<Profile>> {
    return this.request(`/profiles/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Discovery endpoints
  async getProfiles(params: {
    userType?: string;
    genre?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<Profile[]>> {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    return this.request(`/profiles?${queryParams}`);
  }

  async likeProfile(userId: string): Promise<ApiResponse<{ match: boolean }>> {
    return this.request(`/profiles/${userId}/like`, {
      method: 'POST',
    });
  }

  async passProfile(userId: string): Promise<ApiResponse<void>> {
    return this.request(`/profiles/${userId}/pass`, {
      method: 'POST',
    });
  }

  // Media endpoints
  async uploadMedia(
    file: File,
    type: 'audio' | 'image'
  ): Promise<ApiResponse<MediaItem>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.request('/media/upload', {
      method: 'POST',
      headers: {
        // Remove Content-Type to let browser set it with boundary
        'Content-Type': undefined as any,
      },
      body: formData,
    });
  }

  async deleteMedia(mediaId: string): Promise<ApiResponse<void>> {
    return this.request(`/media/${mediaId}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService(); 