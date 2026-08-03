import { existsSync, readFileSync } from 'fs';
import os from 'os';
import path from 'path';

const desktopCandidates = [
  path.join(os.homedir(), 'OneDrive', 'Escritorio'),
  path.join(os.homedir(), 'Desktop'),
  path.join(os.homedir(), 'Escritorio'),
];
const desktopPath =
  desktopCandidates.find((candidate) => existsSync(candidate)) || desktopCandidates[0];
const credentialsPath = path.join(desktopPath, 'CREDENCIALES-KITNEGOCIO.txt');
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

function parseCredentials() {
  const content = readFileSync(credentialsPath, 'utf8');
  const sections = content.split(/SUPER ADMINISTRADOR|CLIENTE \/ COMPRADOR/);
  const parseSection = (section) => ({
    email: section.match(/Correo:\s*(.+)/)?.[1]?.trim(),
    password: section.match(/Contraseña:\s*(.+)/)?.[1]?.trim(),
  });
  return {
    admin: parseSection(sections[1] || ''),
    buyer: parseSection(sections[2] || ''),
  };
}

async function login(credentials) {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    signal: AbortSignal.timeout(30000),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `Login failed (${response.status})`);
  const cookie = response.headers.get('set-cookie')?.split(';')[0] || '';
  return { data, cookie };
}

async function authenticatedGet(pathname, cookie) {
  return fetch(`${baseUrl}${pathname}`, {
    headers: { Cookie: cookie },
    signal: AbortSignal.timeout(30000),
  });
}

const credentials = parseCredentials();
if (!credentials.admin.email || !credentials.admin.password) {
  throw new Error('Admin presentation credentials were not found');
}
if (!credentials.buyer.email || !credentials.buyer.password) {
  throw new Error('Buyer presentation credentials were not found');
}

const admin = await login(credentials.admin);
const adminOverview = await authenticatedGet('/api/admin/overview', admin.cookie);
const buyer = await login(credentials.buyer);
const buyerSession = await authenticatedGet('/api/auth/me', buyer.cookie);
const buyerDownload = await authenticatedGet(
  '/api/download?file=mar-2026/guia-instagram-30-posts.pdf',
  buyer.cookie
);

const checks = {
  adminLogin: admin.data.user?.role === 'super_admin',
  adminPanel: adminOverview.status === 200,
  buyerLogin: buyer.data.user?.role === 'buyer',
  buyerSession: buyerSession.status === 200,
  protectedDownload: buyerDownload.status === 200,
};

console.log(JSON.stringify({ ok: Object.values(checks).every(Boolean), checks }));
if (!Object.values(checks).every(Boolean)) process.exitCode = 1;
