import { MessagesForm } from '@/components/messages/messages-form';

export default function MessagesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">LINE Message Reply</h1>
      <MessagesForm />
    </div>
  );
}