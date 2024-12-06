import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LINE Messaging API Integration
          </h1>
          <p className="text-xl text-gray-600">
            Your Next.js application is ready to receive and respond to LINE messages
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Webhook Status</h2>
            <p className="text-gray-600">
              Webhook endpoint: <code className="bg-gray-100 px-2 py-1 rounded">/api/webhook</code>
            </p>
            <p className="text-gray-600 mt-2">
              Configure this endpoint in your LINE Developers Console
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Configuration</h2>
            <p className="text-gray-600">
              Required environment variables:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              <li>LINE_CHANNEL_ACCESS_TOKEN</li>
              <li>LINE_CHANNEL_SECRET</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}