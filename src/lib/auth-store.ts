import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export type PlanId = 'full' | 'starter' | 'pro';
export type UserRole = 'super_admin' | 'buyer';
export type ActivityType =
  | 'register'
  | 'login'
  | 'logout'
  | 'download'
  | 'subscription_update';

export type LocalUser = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  passwordHash: string;
  plan: PlanId;
  status: 'demo_active' | 'active' | 'canceled';
  role: UserRole;
  createdAt: string;
  lastLoginAt?: string;
};

export type LocalActivity = {
  id: string;
  userId: string;
  type: ActivityType;
  detail: string;
  createdAt: string;
};

type StoreFile = { users: LocalUser[]; activities: LocalActivity[] };

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'users.json');

/** In-memory cache — avoids slow OneDrive disk reads on every request */
let memoryStore: StoreFile | null = null;
let loadPromise: Promise<StoreFile> | null = null;
let persistTimer: ReturnType<typeof setTimeout> | null = null;
let persistChain: Promise<void> = Promise.resolve();

function configuredAdminEmails(): Set<string> {
  return new Set(
    (process.env.SUPER_ADMIN_EMAILS || '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function roleForEmail(email: string, storedRole: UserRole = 'buyer'): UserRole {
  return storedRole === 'super_admin' || configuredAdminEmails().has(email.trim().toLowerCase())
    ? 'super_admin'
    : 'buyer';
}

function normalizeStore(parsed: Partial<StoreFile>): StoreFile {
  const adminEmails = configuredAdminEmails();
  return {
    users: (parsed.users || []).map((user) => ({
      ...user,
      role:
        user.role === 'super_admin' || adminEmails.has(user.email.toLowerCase())
          ? 'super_admin'
          : 'buyer',
    })),
    activities: parsed.activities || [],
  };
}

async function readStoreFromDisk(): Promise<StoreFile> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    return normalizeStore(JSON.parse(raw) as Partial<StoreFile>);
  } catch {
    const empty: StoreFile = { users: [], activities: [] };
    await fs.writeFile(STORE_PATH, JSON.stringify(empty, null, 2), 'utf8');
    return empty;
  }
}

async function ensureStore(): Promise<StoreFile> {
  if (memoryStore) return memoryStore;
  if (!loadPromise) {
    loadPromise = readStoreFromDisk()
      .then((store) => {
        memoryStore = store;
        return store;
      })
      .finally(() => {
        loadPromise = null;
      });
  }
  return loadPromise;
}

function schedulePersist() {
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    persistTimer = null;
    const snapshot = memoryStore;
    if (!snapshot) return;
    persistChain = persistChain
      .then(async () => {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(STORE_PATH, JSON.stringify(snapshot, null, 2), 'utf8');
      })
      .catch((err) => {
        console.error('auth-store persist error:', err);
      });
  }, 50);
}

async function mutateStore(mutator: (store: StoreFile) => void): Promise<StoreFile> {
  const store = await ensureStore();
  mutator(store);
  memoryStore = store;
  schedulePersist();
  return store;
}

export async function findLocalUserByEmail(email: string): Promise<LocalUser | null> {
  const store = await ensureStore();
  const normalized = email.trim().toLowerCase();
  return store.users.find((u) => u.email === normalized) || null;
}

export async function findLocalUserById(id: string): Promise<LocalUser | null> {
  const store = await ensureStore();
  return store.users.find((u) => u.id === id) || null;
}

export async function createLocalUser(input: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  plan: PlanId;
}): Promise<LocalUser> {
  const email = input.email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(input.password, 8);
  let created: LocalUser | null = null;

  await mutateStore((store) => {
    if (store.users.some((u) => u.email === email)) {
      throw new Error('EMAIL_EXISTS');
    }
    created = {
      id: randomBytes(16).toString('hex'),
      email,
      fullName: input.fullName.trim(),
      phone: (input.phone || '').trim(),
      passwordHash,
      plan: 'full',
      status: 'active',
      role: roleForEmail(email),
      createdAt: new Date().toISOString(),
    };
    store.users.push(created);
  });

  return created!;
}

export async function verifyLocalPassword(
  email: string,
  password: string
): Promise<LocalUser | null> {
  const user = await findLocalUserByEmail(email);
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  const role = roleForEmail(user.email, user.role);
  const lastLoginAt = new Date().toISOString();

  // Update memory immediately; disk write is deferred (non-blocking)
  void mutateStore((store) => {
    const index = store.users.findIndex((candidate) => candidate.id === user.id);
    if (index >= 0) {
      store.users[index] = { ...store.users[index], role, lastLoginAt };
    }
  });

  return { ...user, role, lastLoginAt };
}

export async function recordLocalActivity(
  userId: string,
  type: ActivityType,
  detail: string
): Promise<void> {
  await mutateStore((store) => {
    store.activities.unshift({
      id: randomBytes(12).toString('hex'),
      userId,
      type,
      detail,
      createdAt: new Date().toISOString(),
    });
    store.activities = store.activities.slice(0, 1000);
  });
}

export async function getLocalAdminOverview() {
  const store = await ensureStore();
  return {
    users: store.users.map(({ passwordHash: _passwordHash, ...user }) => user),
    activities: store.activities,
  };
}

export async function updateLocalUserByAdmin(
  id: string,
  patch: {
    plan?: PlanId;
    status?: LocalUser['status'];
    role?: UserRole;
    fullName?: string;
    phone?: string;
  }
) {
  let safeUser: Omit<LocalUser, 'passwordHash'> | null = null;
  await mutateStore((store) => {
    const index = store.users.findIndex((user) => user.id === id);
    if (index < 0) return;
    const cleanPatch = Object.fromEntries(
      Object.entries(patch).filter(([, value]) => value !== undefined)
    ) as typeof patch;
    store.users[index] = {
      ...store.users[index],
      ...cleanPatch,
      ...(cleanPatch.fullName !== undefined
        ? { fullName: cleanPatch.fullName.trim() }
        : {}),
      ...(cleanPatch.phone !== undefined ? { phone: cleanPatch.phone.trim() } : {}),
    };
    const { passwordHash: _passwordHash, ...rest } = store.users[index];
    safeUser = rest;
  });
  return safeUser;
}

export async function clearLocalActivities(): Promise<number> {
  let cleared = 0;
  await mutateStore((store) => {
    cleared = store.activities.length;
    store.activities = [];
  });
  return cleared;
}

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  plan: PlanId;
  status: string;
  role: UserRole;
  exp: number;
};

function sessionSecret(): string {
  return process.env.AUTH_SECRET || 'kitnegocio-dev-secret-change-me';
}

function b64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function fromB64url(input: string) {
  const pad = input.length % 4 === 0 ? '' : '='.repeat(4 - (input.length % 4));
  return Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/') + pad, 'base64');
}

export function signSession(payload: Omit<SessionPayload, 'exp'>, days = 14): string {
  const body: SessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + days * 24 * 60 * 60,
  };
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const data = b64url(JSON.stringify(body));
  const sig = createHmac('sha256', sessionSecret()).update(`${header}.${data}`).digest();
  return `${header}.${data}.${b64url(sig)}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [header, data, signature] = token.split('.');
    if (!header || !data || !signature) return null;
    const expected = createHmac('sha256', sessionSecret()).update(`${header}.${data}`).digest();
    const actual = fromB64url(signature);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
    const payload = JSON.parse(fromB64url(data).toString('utf8')) as SessionPayload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = 'kitnegocio_session';
