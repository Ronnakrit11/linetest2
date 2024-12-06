'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UserSelect } from './user-select';
import { LineUserManager } from '@/lib/store/line-users';

export function MessagesForm() {
  const [replyText, setReplyText] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendReply = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/messages/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          message: replyText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Store user ID if message was sent successfully
      LineUserManager.addUser(userId);
      
      // Clear input after successful send
      setReplyText('');
      toast({
        title: 'Success',
        description: 'Message sent successfully!',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">User ID</label>
          <UserSelect
            value={userId}
            onChange={setUserId}
            disabled={isLoading}
          />
          <Input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Or enter new LINE user ID"
            className="w-full mt-2"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Reply Message</label>
          <Input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply message"
            className="w-full"
            disabled={isLoading}
          />
        </div>

        <Button 
          onClick={handleSendReply}
          disabled={!replyText.trim() || !userId.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? 'Sending...' : 'Send Reply'}
        </Button>
      </div>
    </Card>
  );
}