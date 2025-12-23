import { defineStore } from 'pinia';
import type { IAuthRequestDto } from 'src/stores/Auth/dtos/iauth-request-dto';
import ApiService from 'src/services/api-service';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    role: '',
    token: '',
  }),

  actions: {
    async login(user: IAuthRequestDto): Promise<string> {
      const token = await ApiService.post<string>('/auth', user);
      localStorage.setItem('token', token);

      const decryptedToken = token.split('.') ?? [];
      const responseData = JSON.parse(atob(decryptedToken[1]));
      const role = responseData.role;
      localStorage.setItem('role', role);

      return token;
    },
  },
});
