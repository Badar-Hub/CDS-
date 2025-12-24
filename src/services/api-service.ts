import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import _axios from 'axios';
import { Notify, Loading } from 'quasar';
import type { RequestDto } from './interface/irequest-dto';

interface ApiErrorResponse {
  detail: string | string[];
  message?: string;
}

export default class ApiService {
  static axios = _axios.create({
    baseURL: process.env.VUE_APP_SERVER_ADDRESS ?? 'http://localhost:7071/api',
    timeout: 15000,
    headers: {
      Accept: 'application/json',
    },
  });

  static axiosInterceptor = ApiService.addInterceptor();

  static addInterceptor(): void {
    ApiService.axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      } else {
        config.headers.authorization = '';
      }
      return config;
    });
  }

  static async get<T>(url: string): Promise<T> {
    try {
      const res = await ApiService.axios.get<T>(url);
      return res.data;
    } catch (error) {
      ApiService.handleError(error as AxiosError<ApiErrorResponse>);
      return Promise.reject(error as Error);
    }
  }

  static async post<T>(
    url: string,
    body: unknown,
    sendAsFormData = false,
    timeoutMs = 8000,
  ): Promise<T> {
    try {
      let reqBody: RequestDto<unknown> | FormData;

      if (sendAsFormData) {
        reqBody = ApiService.getFormData(body as Record<string, Blob | string>);
      } else {
        reqBody = { data: body };
      }
      Loading.show({ message: 'Please wait...' });
      const res = await ApiService.axios.post<T>(url, reqBody, {
        timeout: timeoutMs,
        // headers: { 'Content-Type': 'multipart/form-data', Accept: '*/*' },
      });
      Loading.hide();
      ApiService.showSuccess((res.data as unknown as { message: string }).message);
      return res.data;
    } catch (error) {
      ApiService.handleError(error as AxiosError<ApiErrorResponse>);
      return Promise.reject(error as Error);
    }
  }

  static async put<T>(
    url: string,
    body?: unknown,
    sendAsFormData = false,
    timeoutMs = 8000,
  ): Promise<T> {
    try {
      let reqBody: RequestDto<unknown> | FormData;

      if (sendAsFormData) {
        reqBody = ApiService.getFormData(body as Record<string, Blob | string>);
      } else {
        reqBody = { data: body };
      }
      Loading.show({ message: 'Please wait...' });
      const res = await ApiService.axios.put<T>(url, reqBody, {
        timeout: timeoutMs,
      });
      Loading.hide();
      ApiService.showSuccess((res.data as unknown as { message: string }).message);
      return res.data;
    } catch (error) {
      ApiService.handleError(error as AxiosError<ApiErrorResponse>);
      return Promise.reject(error as Error);
    }
  }

  static async delete<T>(url: string): Promise<T> {
    try {
      const res = await ApiService.axios.delete<T>(url);
      ApiService.showSuccess((res.data as unknown as { message: string }).message);
      return res.data;
    } catch (error) {
      ApiService.handleError(error as AxiosError<ApiErrorResponse>);
      return Promise.reject(error as Error);
    }
  }

  private static handleError(error: AxiosError<ApiErrorResponse>) {
    Loading.hide();
    if (error.response?.status == 422) {
      let template = '<span>';
      const err = error.response.data?.detail;
      if (Array.isArray(err) && err.length) {
        err.forEach((x: string, i: number) => {
          template += `<li>${x}</li> ${i == err.length - 1 ? '' : '<br />'} `;
        });
      } else if (typeof err === 'string') {
        template += err;
      } else {
        template += 'Please resolve some validation error(s)';
      }
      template += '</span>';

      Notify.create({
        html: true,
        message: template,
        timeout: 50000,
        color: 'red-9',
        actions: [
          {
            label: 'Dismiss',
            color: 'white',
            class: 'text-weight-bold',
          },
        ],
      });
    } else if (error.response?.status == 401) {
      window.location.href = '/login';
      localStorage.clear();
      Notify.create({
        icon: 'warning',
        message: 'Unauthorized',
        timeout: 5000,
        color: 'red-9',
      });
    } else if (error.response?.status == 500) {
      const detail = error.response.data?.detail;
      Notify.create({
        icon: 'warning',
        message: typeof detail === 'string' ? detail : 'Server error occurred.',
        timeout: 5000,
        color: 'red-9',
      });
    } else {
      const detail = error.response?.data?.detail;
      Notify.create({
        icon: 'warning',
        message: typeof detail === 'string' ? detail : 'Sorry, something went wrong.',
        timeout: 5000,
        color: 'red-9',
      });
    }
  }

  private static showSuccess(message: string) {
    Notify.create({
      icon: 'check_circle',
      message,
      timeout: 3000,
      color: 'primary',
    });
  }

  private static getFormData(object: Record<string, Blob | string>): FormData {
    return Object.entries(object).reduce((fd, [key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((v) => fd.append(key, v));
      } else {
        fd.append(key, val);
      }
      return fd;
    }, new FormData());
  }
}
