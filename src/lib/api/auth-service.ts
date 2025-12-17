const AUTH_API_BASE = import.meta.env.VITE_AUTH_API_BASE || "";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  authToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface UserRecord {
  id: string;
  email: string;
  name: string;
}

export interface ResetPasswordRequest {
  password: string;
  passwordResetToken: string;
}

/**
 * Login with email and password
 */
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
}

/**
 * Signup with email and password
 */
export async function signup(data: SignupRequest): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_API_BASE}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }

  return response.json();
}

/**
 * Get the current user record using the auth token
 */
export async function getMe(token: string): Promise<UserRecord> {
  const response = await fetch(`${AUTH_API_BASE}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get user");
  }

  return response.json();
}

/**
 * Request password reset link
 */
export async function requestResetLink(email: string): Promise<void> {
  const response = await fetch(`${AUTH_API_BASE}/reset/request-reset-link`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to request reset link");
  }
}

/**
 * Update password using reset token
 */
export async function updatePassword(
  data: ResetPasswordRequest,
): Promise<void> {
  const response = await fetch(`${AUTH_API_BASE}/reset/update_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update password");
  }
}

/**
 * Login with magic token (password reset flow)
 */
export async function loginWithMagicToken(
  token: string,
): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_API_BASE}/reset/magic-link-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ passwordResetToken: token }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Magic link login failed");
  }

  return response.json();
}

/**
 * Logout (clear token from storage)
 * Note: The backend handles httpOnly cookies, so we just need to clear local state
 */
export function logout(): void {
  // httpOnly cookies are cleared by the browser on logout
  // Just ensure no token is stored in localStorage
  localStorage.removeItem("authToken");
  localStorage.removeItem("authTokenExpiry");
}
