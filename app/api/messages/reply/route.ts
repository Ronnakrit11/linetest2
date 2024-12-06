import { lineClient } from '@/lib/line-client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId, message } = await request.json();

    if (!userId || !message) {
      return NextResponse.json(
        { error: 'User ID and message are required' },
        { status: 400 }
      );
    }

    await lineClient.pushMessage(userId, {
      type: 'text',
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending LINE message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}