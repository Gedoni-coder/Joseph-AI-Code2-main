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

/**
 * Response from login/signup endpoints
 * Returns auth token and user ID - full user details fetched via /auth/me
 */
export interface LoginSignupResponse {
  authToken: string;
  user_id: string;
}

/**
 * Full user record from /auth/me endpoint
 */
export interface UserRecord {
  id: number;
  created_at: string;
  name: string;
  email: string;
  account_id: number;
  role: string;
}

/**
 * Combined auth response used by the app
 * Contains token and full user details
 */
export interface AuthResponse {
  authToken: string;
  user: UserRecord;
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

  const { authToken, user_id } = await response.json();

  // Fetch full user details using the token
  const userDetails = await getMe(authToken);

  return {
    authToken,
    user: userDetails,
  };
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

  const { authToken, user_id } = await response.json();

  // Fetch full user details using the token
  const userDetails = await getMe(authToken);

  return {
    authToken,
    user: userDetails,
  };
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
  const response = await fetch(
    `${AUTH_API_BASE}/reset/request-reset-link?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to request reset link");
  }
}

/**
 * Update password using reset token
 * Requires authentication header with the magic link token
 */
export async function updatePassword(
  password: string,
  confirmPassword: string,
  token: string,
): Promise<void> {
  const response = await fetch(`${AUTH_API_BASE}/reset/update_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password,
      confirm_password: confirmPassword,
    }),
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
  magicToken: string,
  email: string,
): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_API_BASE}/reset/magic-link-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      magic_token: magicToken,
      email,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Magic link login failed");
  }

  const { authToken, user_id } = await response.json();

  // Fetch full user details using the token
  const userDetails = await getMe(authToken);

  return {
    authToken,
    user: userDetails,
  };
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
