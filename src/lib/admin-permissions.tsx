import { createContext, useContext } from "react";

import {
  MASTER_ADMIN,
  getStoredLocalUsers,
  saveStoredLocalUsers,
  type LocalAdminUser,
} from "./admin-auth";
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

const PERMS_STORE_KEY = "magroup_user_permissions_v1";

function getStoredPermissions(): Record<string, PermissionMap> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PERMS_STORE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStoredPermissions(allPerms: Record<string, PermissionMap>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PERMS_STORE_KEY, JSON.stringify(allPerms));
  } catch {
    // Ignore
  }
}

export function emptyPermission(module_key: string): ModulePermission {
  return { module_key, can_view: false, can_create: false, can_edit: false, can_delete: false };
}

export async function isSuperAdmin(userId: string): Promise<boolean> {
  if (MASTER_ADMIN.email && (userId === MASTER_ADMIN.id || userId === MASTER_ADMIN.email)) return true;

  const localUsers = getStoredLocalUsers();
  const localMatch = localUsers.find((u) => u.id === userId || u.email.toLowerCase() === userId.toLowerCase());
  if (localMatch) return Boolean(localMatch.isSuperAdmin);

  return false;
}

export async function fetchPermissions(userId: string): Promise<PermissionMap> {
  const stored = getStoredPermissions();
  if (stored[userId]) {
    return stored[userId];
  }
  return {};
}

export async function savePermissions(userId: string, perms: ModulePermission[]): Promise<null> {
  const stored = getStoredPermissions();
  const userMap = stored[userId] || {};
  for (const p of perms) {
    userMap[p.module_key] = p;
  }
  stored[userId] = userMap;
  saveStoredPermissions(stored);
  return null;
}

export async function listAdminUsers(): Promise<AdminUserRow[]> {
  const result: AdminUserRow[] = [];
  const seenEmails = new Set<string>();

  if (MASTER_ADMIN.email) {
    result.push({
      id: MASTER_ADMIN.id,
      email: MASTER_ADMIN.email,
      full_name: MASTER_ADMIN.fullName,
      isSuperAdmin: true,
      isAdmin: true,
    });
    seenEmails.add(MASTER_ADMIN.email.toLowerCase());
  }

  const localUsers = getStoredLocalUsers();
  for (const u of localUsers) {
    const emailNorm = u.email.toLowerCase();
    if (!seenEmails.has(emailNorm)) {
      result.push({
        id: u.id,
        email: u.email,
        full_name: u.fullName,
        isSuperAdmin: u.isSuperAdmin,
        isAdmin: u.isAdmin,
      });
      seenEmails.add(emailNorm);
    }
  }

  return result;
}

export async function createAdminUserClient(input: {
  email: string;
  password: string;
  fullName: string;
  superAdmin?: boolean;
}): Promise<{ id: string }> {
  const normEmail = input.email.trim().toLowerCase();
  const users = getStoredLocalUsers();

  if ((MASTER_ADMIN.email && normEmail === MASTER_ADMIN.email.toLowerCase()) || users.some((u) => u.email.toLowerCase() === normEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const newId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const newUser: LocalAdminUser = {
    id: newId,
    email: normEmail,
    password: input.password,
    fullName: input.fullName.trim() || normEmail,
    isSuperAdmin: Boolean(input.superAdmin),
    isAdmin: true,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveStoredLocalUsers(users);

  return { id: newId };
}

export async function deleteAdminUserClient(userId: string): Promise<void> {
  if (MASTER_ADMIN.email && (userId === MASTER_ADMIN.id || userId === MASTER_ADMIN.email)) {
    throw new Error("Cannot delete the master super admin account.");
  }

  const users = getStoredLocalUsers().filter((u) => u.id !== userId && u.email !== userId);
  saveStoredLocalUsers(users);
}

export async function setAdminUserPasswordClient(userId: string, password: string): Promise<void> {
  const users = getStoredLocalUsers();
  const found = users.find((u) => u.id === userId || u.email === userId);
  if (found) {
    found.password = password;
    saveStoredLocalUsers(users);
  }
}

export async function setSuperAdminClient(userId: string, value: boolean): Promise<void> {
  if (MASTER_ADMIN.email && (userId === MASTER_ADMIN.id || userId === MASTER_ADMIN.email)) {
    if (!value) throw new Error("Cannot revoke super admin from the master super admin account.");
    return;
  }

  const users = getStoredLocalUsers();
  const found = users.find((u) => u.id === userId || u.email === userId);
  if (found) {
    found.isSuperAdmin = value;
    saveStoredLocalUsers(users);
  }
}

// ---- React context -------------------------------------------------------

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
