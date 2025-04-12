import { NextResponse } from 'next/server';
import { sendSupportEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { subject, message, userEmail, schedule } = data;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Log incoming request
    console.log('Received email request:', {
      subject,
      messagePreview: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
      userEmail: userEmail || 'not provided',
      schedule: schedule || 'not specified'
    });

    const result = await sendSupportEmail({
      subject: subject || 'New Chatbot Message',
      message,
      userEmail,
      schedule
    });

    if (!result.success) {
      console.error('Failed to send email:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully with ID:', result.messageId);
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error('Error in email API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 