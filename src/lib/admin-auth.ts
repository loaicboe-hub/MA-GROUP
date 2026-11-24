// Standalone Admin Authentication for MA GROUP.
// Completely local and independent — zero external backend dependencies.

export type AdminSession = {
  userId: string;
  email: string;
  fullName?: string;
  isAdmin: boolean;
  isSuper?: boolean;
};

export type LocalAdminUser = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  createdAt: string;
};

// Configurable master administrator
export const MASTER_ADMIN = {
  id: "super-admin-master",
  email: "",
  password: "",
  fullName: "MA GROUP Administrator",
  isSuperAdmin: true,
  isAdmin: true,
};

const SESSION_KEY = "magroup_admin_session_v1";
const USERS_KEY = "magroup_admin_users_store_v1";

export function getStoredLocalUsers(): LocalAdminUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredLocalUsers(users: LocalAdminUser[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // Ignore quota errors
  }
}

export async function signIn(email: string, password: string): Promise<string | null> {
  const normEmail = email.trim().toLowerCase();
  const trimmedPass = password.trim();

  // 1. Check Master Super Admin (only if configured with non-empty credentials)
  if (MASTER_ADMIN.email && normEmail === MASTER_ADMIN.email && trimmedPass === MASTER_ADMIN.password) {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          userId: MASTER_ADMIN.id,
          email: MASTER_ADMIN.email,
          fullName: MASTER_ADMIN.fullName,
          isAdmin: true,
          isSuper: true,
        }),
      );
    }
    return null;
  }

  // 2. Check local users store
  const localUsers = getStoredLocalUsers();
  const localMatch = localUsers.find(
    (u) => u.email.toLowerCase() === normEmail && u.password === trimmedPass,
  );
  if (localMatch) {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          userId: localMatch.id,
          email: localMatch.email,
          fullName: localMatch.fullName,
          isAdmin: true,
          isSuper: localMatch.isSuperAdmin,
        }),
      );
    }
    return null;
  }

  return "Invalid email or password";
}

export async function signUp(email: string, password: string, fullName: string): Promise<string | null> {
  const normEmail = email.trim().toLowerCase();
  if (password.length < 10) {
    return "Password must be at least 10 characters";
  }

  const currentUsers = getStoredLocalUsers();
  const exists = currentUsers.some((u) => u.email.toLowerCase() === normEmail);
  if (exists) {
    return "An account with this email already exists.";
  }

  const isFirstUser = currentUsers.length === 0;
  const newLocalUser: LocalAdminUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    email: normEmail,
    password,
    fullName: fullName.trim() || normEmail,
    isSuperAdmin: isFirstUser,
    isAdmin: true,
    createdAt: new Date().toISOString(),
  };

  currentUsers.push(newLocalUser);
  saveStoredLocalUsers(currentUsers);

  if (typeof window !== "undefined") {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        userId: newLocalUser.id,
        email: newLocalUser.email,
        fullName: newLocalUser.fullName,
        isAdmin: true,
        isSuper: newLocalUser.isSuperAdmin,
      }),
    );
  }

  return null;
}

export async function signOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.email) {
      return {
        userId: parsed.userId || parsed.email,
        email: parsed.email,
        fullName: parsed.fullName,
        isAdmin: true,
        isSuper: Boolean(parsed.isSuper),
      };
    }
  } catch {
    return null;
  }
  return null;
}

export async function requestPasswordReset(email: string): Promise<string | null> {
  const normEmail = email.trim().toLowerCase();
  const users = getStoredLocalUsers();
  const found = users.some((u) => u.email.toLowerCase() === normEmail);
  if (!found) {
    return "No account found with this email address.";
  }
  return null;
}

export async function updatePassword(password: string): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const sessionRaw = localStorage.getItem(SESSION_KEY);
  if (sessionRaw) {
    try {
      const s = JSON.parse(sessionRaw);
      const users = getStoredLocalUsers();
      const found = users.find((u) => u.email.toLowerCase() === s.email?.toLowerCase());
      if (found) {
        found.password = password;
        saveStoredLocalUsers(users);
      }
    } catch {
      // Ignore
    }
  }
  return null;
}
