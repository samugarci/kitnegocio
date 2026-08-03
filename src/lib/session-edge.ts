/** Edge-compatible session verify for middleware (Web Crypto). */

export type EdgeSession = {
  sub: string;
  email: string;
  name: string;
  plan: string;
  status: string;
  role: 'super_admin' | 'buyer';
  exp: number;
};

function b64urlToBytes(input: string): Uint8Array {
  const pad = input.length % 4 === 0 ? '' : '='.repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, '+').replace(/_/g, '/') + pad;
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function bytesToB64url(bytes: ArrayBuffer): string {
  const view = new Uint8Array(bytes);
  let binary = '';
  for (let i = 0; i < view.length; i += 1) binary += String.fromCharCode(view[i]);
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export async function verifySessionTokenEdge(token: string): Promise<EdgeSession | null> {
  try {
    const [header, data, signature] = token.split('.');
    if (!header || !data || !signature) return null;

    const secret = process.env.AUTH_SECRET || 'kitnegocio-dev-secret-change-me';
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const expected = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(`${header}.${data}`)
    );
    if (bytesToB64url(expected) !== signature) return null;

    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(data))) as EdgeSession;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;

    const adminEmails = (process.env.SUPER_ADMIN_EMAILS || '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);
    const role =
      payload.role === 'super_admin' || adminEmails.includes((payload.email || '').toLowerCase())
        ? 'super_admin'
        : 'buyer';

    return { ...payload, role };
  } catch {
    return null;
  }
}
