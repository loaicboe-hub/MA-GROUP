// Persistent Server-Side Admin Authentication for MA GROUP.
// Connects to /api/auth backed by Hostinger MySQL database.

export type AdminSession = {
  userId: string;
  email: string;
  fullName?: string;
  isAdmin: boolean;
  isSuper?: boolean;
};

const TOKEN_KEY = "magroup_admin_token";
const SESSION_CACHE_KEY = "magroup_admin_session_cache";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(SESSION_CACHE_KEY);
  }
}

export async function signIn(email: string, password: string): Promise<string | null> {
  try {
    const res = await fetch("/api/auth?action=login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return data.error || "Invalid email or password";
    }

    setAdminToken(data.token);
    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(data.user));
    }
    return null;
  } catch (err: any) {
    return err.message || "Failed to communicate with authentication server";
  }
}

export async function signUp(_email: string, _password: string, _fullName: string): Promise<string | null> {
  return "Public registration is disabled. Please contact your system administrator.";
}

export async function signOut(): Promise<void> {
  const token = getAdminToken();
  if (token) {
    try {
      await fetch("/api/auth?action=logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // Ignore network errors on logout
    }
  }
  setAdminToken(null);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  if (typeof window === "undefined") return null;
  const token = getAdminToken();
  if (!token) return null;

  try {
    const res = await fetch("/api/auth?action=session", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      setAdminToken(null);
      return null;
    }
    const data = await res.json();
    if (data.authenticated && data.session) {
      localStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(data.session));
      return data.session;
    }
    setAdminToken(null);
    return null;
  } catch {
    // If offline / network error, return cached session if available
    const cached = localStorage.getItem(SESSION_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  }
}

export async function requestPasswordReset(email: string): Promise<string | null> {
  try {
    const res = await fetch("/api/auth?action=forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
    const data = await res.json();
    return data.error || null;
  } catch (err: any) {
    return err.message || "Failed to send reset link";
  }
}

export async function updatePassword(password: string, token: string): Promise<string | null> {
  try {
    const res = await fetch("/api/auth?action=reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return data.error || "Failed to reset password";
    }
    return null;
  } catch (err: any) {
    return err.message || "Failed to update password";
  }
}
