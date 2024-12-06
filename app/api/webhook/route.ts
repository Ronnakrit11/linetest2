import { WebhookRequestBody } from '@line/bot-sdk';
import { lineClient } from '@/lib/line-client';
import { lineConfig } from '@/lib/line-config';
import { headers } from 'next/headers';
import crypto from 'crypto';

export async function POST(request: Request) {
  const body: WebhookRequestBody = await request.json();
  const headersList = headers();
  const signature = headersList.get('x-line-signature');

  // Verify webhook signature
  const channelSecret = lineConfig.channelSecret;
  const bodyString = JSON.stringify(body);
  const hash = crypto
    .createHmac('SHA256', channelSecret)
    .update(bodyString)
    .digest('base64');

  if (signature !== hash) {
    return new Response('Invalid signature', { status: 403 });
  }

  try {
    await Promise.all(
      body.events.map(async (event) => {
        if (event.type !== 'message' || event.message.type !== 'text') {
          return;
        }

        const { replyToken } = event;
        const { text } = event.message;

        // Simple echo response
        await lineClient.replyMessage(replyToken, {
          type: 'text',
          text: `You said: ${text}`,
        });
      })
    );

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('Error handling webhook:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}