import { createContext, useContext } from "react";
import { getAdminToken } from "./admin-auth";
import type { PermissionAction } from "./admin-modules";

export type ModulePermission = {
  module_key: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
};

export type PermissionMap = Record<string, ModulePermission>;

export type AdminUserRow = {
  id: string;
  email: string;
  full_name: string;
  isSuperAdmin: boolean;
  isAdmin: boolean;
};

export function emptyPermission(module_key: string): ModulePermission {
  return { module_key, can_view: false, can_create: false, can_edit: false, can_delete: false };
}

export async function isSuperAdmin(_userId?: string): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  try {
    const res = await fetch("/api/auth.php?action=session", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return Boolean(data.session?.isSuper);
  } catch {
    return false;
  }
}

export async function fetchPermissions(userId: string): Promise<PermissionMap> {
  const token = getAdminToken();
  if (!token) return {};
  try {
    const res = await fetch(`/api/auth.php?action=permissions&userId=${encodeURIComponent(userId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.permissions || {};
  } catch {
    return {};
  }
}

export async function savePermissions(userId: string, perms: ModulePermission[]): Promise<null> {
  const token = getAdminToken();
  if (!token) return null;
  await fetch("/api/auth.php?action=save-permissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, permissions: perms }),
  });
  return null;
}

export async function listAdminUsers(): Promise<AdminUserRow[]> {
  const token = getAdminToken();
  if (!token) return [];
  try {
    const res = await fetch("/api/auth.php?action=users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.users || [];
  } catch {
    return [];
  }
}

export async function createAdminUserClient(input: {
  email: string;
  password: string;
  fullName: string;
  superAdmin?: boolean;
}): Promise<{ id: string }> {
  const token = getAdminToken();
  const res = await fetch("/api/auth.php?action=create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to create user");
  }
  return { id: data.id };
}

export async function deleteAdminUserClient(userId: string): Promise<void> {
  const token = getAdminToken();
  const res = await fetch("/api/auth.php?action=delete-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to delete user");
  }
}

export async function setAdminUserPasswordClient(userId: string, password: string): Promise<void> {
  const token = getAdminToken();
  const res = await fetch("/api/auth.php?action=set-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, password }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to set password");
  }
}

export async function setSuperAdminClient(userId: string, value: boolean): Promise<void> {
  const token = getAdminToken();
  const res = await fetch("/api/auth.php?action=set-super-admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, value }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to update super admin status");
  }
}

// React context
type PermissionsCtx = {
  isSuper: boolean;
  permissions: PermissionMap;
};

const Ctx = createContext<PermissionsCtx>({ isSuper: false, permissions: {} });

export const PermissionsProvider = Ctx.Provider;

export function useAdminPermissions() {
  const ctx = useContext(Ctx);
  const can = (moduleKey: string, action: PermissionAction) => {
    if (ctx?.isSuper) return true;
    const p = ctx?.permissions?.[moduleKey];
    if (!p) return false;
    return action === "view"
      ? p.can_view
      : action === "create"
        ? p.can_create
        : action === "edit"
          ? p.can_edit
          : p.can_delete;
  };
  return { isSuper: Boolean(ctx?.isSuper), permissions: ctx?.permissions ?? {}, can };
}
