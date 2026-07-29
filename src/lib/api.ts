import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { useAuthStore } from "@/features/auth/store/auth.store";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach access token to every request.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Refresh token + retry request automatically.
 */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    /**
     * Already retried?
     */
    if (originalRequest?._retry) {
      useAuthStore.getState().logout();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }

    /**
     * Unauthorized
     */
    if (error.response?.status === 401) {
      originalRequest._retry = true;

      const {
        refreshToken,
        updateSession,
        logout,
      } = useAuthStore.getState();

      if (!refreshToken) {
        logout();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            refresh_token: refreshToken,
          },
        );

        const {
          access_token,
          expires_in,
        } = response.data;

        updateSession(
          access_token,
          expires_in,
        );

        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return api(originalRequest);
      } catch {
        logout();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;