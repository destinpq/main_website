import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | DestinPQ",
  description: "Refund and cancellation policy for DestinPQ consultation services",
};

export default function RefundCancellationPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
        Refund and Cancellation Policy
      </h1>
      
      <div className="prose prose-invert max-w-none text-gray-300">
        <p className="text-lg mb-6">
          This refund and cancellation policy outlines the terms for our AI consultation services 
          charged at <strong className="text-yellow-400">1000₹ per hour</strong>.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-yellow-400">Consultation Services Policy</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Cancellation Policy</h3>
        <ul className="list-disc space-y-3 pl-6 mb-6">
          <li><strong>24-Hour Notice:</strong> Consultations can be cancelled or rescheduled with at least 24 hours advance notice without any charges.</li>
          <li><strong>Less than 24 Hours:</strong> Cancellations made with less than 24 hours notice will incur a 50% charge of the scheduled consultation fee.</li>
          <li><strong>No-Show Policy:</strong> Failure to attend a scheduled consultation without prior notice will result in the full consultation fee being charged.</li>
          <li><strong>Emergency Situations:</strong> Genuine emergencies will be considered on a case-by-case basis for fee waiver.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Refund Policy</h3>
        <ul className="list-disc space-y-3 pl-6 mb-6">
          <li><strong>Service Dissatisfaction:</strong> If you are not satisfied with the consultation within the first 15 minutes, you may request a full refund.</li>
          <li><strong>Technical Issues:</strong> Full refund will be provided if the consultation cannot proceed due to technical issues on our end.</li>
          <li><strong>Consultant Absence:</strong> Full refund will be provided if our consultant fails to attend the scheduled session.</li>
          <li><strong>Partial Consultations:</strong> If a consultation is interrupted due to technical issues on our end, you will only be charged for the actual time spent in consultation.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Payment Terms</h3>
        <ul className="list-disc space-y-3 pl-6 mb-6">
          <li>Consultation fees are charged at <strong className="text-yellow-400">1000₹ per hour</strong></li>
          <li>Minimum consultation duration is 30 minutes (500₹)</li>
          <li>Sessions are billed in 15-minute increments after the minimum duration</li>
          <li>Payment is required in advance of the consultation session</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Refund Processing</h3>
        <ul className="list-disc space-y-3 pl-6 mb-6">
          <li>Approved refunds will be processed within 5-7 business days</li>
          <li>Refunds will be credited to the original payment method</li>
          <li>Bank transfer fees, if any, will be deducted from the refund amount</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Non-Refundable Situations</h3>
        <ul className="list-disc space-y-3 pl-6 mb-6">
          <li>Consultations that have been completed successfully</li>
          <li>Cancellations made after the consultation has started</li>
          <li>Requests made more than 48 hours after the consultation</li>
          <li>Consultations where deliverables or advice have been provided and utilized</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Rescheduling Policy</h3>
        <ul className="list-disc space-y-3 pl-6 mb-6">
          <li>Consultations can be rescheduled up to 2 times without additional charges</li>
          <li>Rescheduling requests must be made at least 12 hours in advance</li>
          <li>Third rescheduling request will incur a processing fee of 200₹</li>
        </ul>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-3 text-yellow-400">Contact Us</h3>
          <p>For any questions regarding this policy or to request a refund/cancellation, please contact us:</p>
          <ul className="list-none space-y-2 mt-3">
            <li><strong>Email:</strong> support@destinpq.com</li>
            <li><strong>Phone:</strong> +91-XXXXXXXXXX</li>
            <li><strong>Response Time:</strong> Within 24 hours</li>
          </ul>
        </div>

        <p className="text-sm mt-8 text-gray-400">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
        
        <p className="text-sm mt-4 text-gray-400">
          DestinPQ LLP reserves the right to modify this policy at any time. 
          Changes will be communicated via email and updated on our website.
        </p>
      </div>
    </div>
  );
} 