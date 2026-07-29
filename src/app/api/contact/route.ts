import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name, email, subject, message, paymentRef } = await request.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // In production, send email via SendGrid, Resend, etc.
  console.log('Support request:', { name, email, subject, message, paymentRef });

  return NextResponse.json({
    success: true,
    ticketId: `UY-${Date.now().toString(36).toUpperCase()}`,
  });
}
