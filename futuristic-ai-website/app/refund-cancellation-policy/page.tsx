import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | DestinPQ",
  description: "Refund and cancellation policy for DestinPQ consultation services",
};

export default function RefundCancellationPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
        Refund Policy
      </h1>
      
      <div className="prose prose-invert max-w-none text-gray-300">
        <p className="text-lg">
          Please note that as our offerings are service-based, we do not provide refunds once services have commenced or been rendered. We remain committed to client satisfaction and encourage you to contact us with any concerns so that we may address them appropriately.
        </p>
      </div>
    </div>
  );
} 