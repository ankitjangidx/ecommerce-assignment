const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
  SIGNUP_API: BASE_URL + "/api/auth/signup",
  LOGIN_API: BASE_URL + "/api/auth/login",
  CHECK_USERNAME_API: BASE_URL + "/api/auth/checkusername",
};
