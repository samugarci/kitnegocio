import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth-store';

/**
 * Legacy endpoint — access is now session-based.
 * Returns whether the current cookie session is authorized.
 */
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = token ? verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ hasAccess: false, authenticated: false });
    }

    const hasAccess = ['demo_active', 'active', 'trialing'].includes(session.status);
    return NextResponse.json({
      hasAccess,
      authenticated: true,
      email: session.email,
      plan: session.plan,
      status: session.status,
    });
  } catch (error) {
    console.error('Verify access error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Verification failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
