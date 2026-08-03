import { randomBytes, randomUUID } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import os from 'os';
import path from 'path';
import bcrypt from 'bcryptjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const envPath = path.join(root, '.env.local');
const storePath = path.join(root, 'data', 'users.json');
const desktopCandidates = [
  path.join(os.homedir(), 'OneDrive', 'Escritorio'),
  path.join(os.homedir(), 'Desktop'),
  path.join(os.homedir(), 'Escritorio'),
];
const desktopPath =
  desktopCandidates.find((candidate) => existsSync(candidate)) || desktopCandidates[0];
const credentialsPath = path.join(desktopPath, 'CREDENCIALES-KITNEGOCIO.txt');
const reset = process.argv.includes('--reset');

function readEnvFile() {
  if (!existsSync(envPath)) return {};
  return Object.fromEntries(
    readFileSync(envPath, 'utf8')
      .split(/\r?\n/)
      .filter((line) => /^[A-Za-z_][A-Za-z0-9_]*=/.test(line))
      .map((line) => {
        const index = line.indexOf('=');
        return [
          line.slice(0, index),
          line.slice(index + 1).trim().replace(/^["']|["']$/g, ''),
        ];
      })
  );
}

function makePassword(prefix) {
  return `${prefix}${randomBytes(6).toString('base64url')}!9`;
}

function readStore() {
  if (!existsSync(storePath)) return { users: [], activities: [] };
  try {
    const value = JSON.parse(readFileSync(storePath, 'utf8'));
    return {
      users: Array.isArray(value.users) ? value.users : [],
      activities: Array.isArray(value.activities) ? value.activities : [],
    };
  } catch {
    return { users: [], activities: [] };
  }
}

async function upsertUser(store, input) {
  const index = store.users.findIndex((user) => user.email === input.email);
  if (index >= 0 && !reset) return { user: store.users[index], password: null };

  const existing = index >= 0 ? store.users[index] : null;
  const user = {
    id: existing?.id || randomUUID().replaceAll('-', ''),
    email: input.email,
    fullName: input.fullName,
    phone: '',
    passwordHash: await bcrypt.hash(input.password, 12),
    plan: 'full',
    status: 'active',
    role: input.role,
    createdAt: existing?.createdAt || new Date().toISOString(),
  };

  if (index >= 0) store.users[index] = user;
  else store.users.push(user);
  return { user, password: input.password };
}

const env = readEnvFile();
const adminEmail =
  (env.SUPER_ADMIN_EMAILS || 'admin@kitnegocio.com')
    .split(',')[0]
    .trim()
    .toLowerCase();
const buyerEmail = 'cliente.demo@kitnegocio.com';
const adminPassword = makePassword('Admin-');
const buyerPassword = makePassword('Cliente-');
const store = readStore();

const admin = await upsertUser(store, {
  email: adminEmail,
  fullName: 'Administrador KitNegocio',
  role: 'super_admin',
  password: adminPassword,
});
const buyer = await upsertUser(store, {
  email: buyerEmail,
  fullName: 'Cliente de Presentación',
  role: 'buyer',
  password: buyerPassword,
});

mkdirSync(path.dirname(storePath), { recursive: true });
writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`, 'utf8');

mkdirSync(desktopPath, { recursive: true });
writeFileSync(
  credentialsPath,
  [
    'KITNEGOCIO — CREDENCIALES DE PRESENTACIÓN',
    '==========================================',
    '',
    'URL: http://localhost:3000/es/miembros#area-privada',
    '',
    'SUPER ADMINISTRADOR',
    `Correo: ${admin.user.email}`,
    `Contraseña: ${admin.password || '(conservada; ejecute con --reset para cambiarla)'}`,
    '',
    'CLIENTE / COMPRADOR',
    `Correo: ${buyer.user.email}`,
    `Contraseña: ${buyer.password || '(conservada; ejecute con --reset para cambiarla)'}`,
    '',
    'Seguridad:',
    '- Las contraseñas se guardan cifradas (bcrypt) dentro de la aplicación.',
    '- Este archivo contiene credenciales de demostración. Elimínelo antes de publicar.',
    '- En producción, configure Supabase y cambie todas las credenciales.',
    '',
    `Generado: ${new Date().toLocaleString('es-MX')}`,
  ].join('\r\n'),
  'utf8'
);

console.log(
  JSON.stringify({
    ok: true,
    users: store.users.length,
    admin: admin.user.email,
    buyer: buyer.user.email,
    credentialsPath,
  })
);
