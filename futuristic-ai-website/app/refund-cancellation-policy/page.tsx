import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | DestinPQ",
  description: "Refund and cancellation policy for DestinPQ services",
};

export default function RefundCancellationPolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Refund and Cancellation Policy</h1>
      <div className="prose max-w-none">
        <p>This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:</p>
        
        <ol className="list-decimal space-y-4 pl-6">
          <li>Cancellations will only be considered if the request is made 2 days of placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.</li>
          
          <li>DESTINPQ LLP does not accept cancellation requests for perishable items like flowers, eatables, etc. However, the refund / replacement can be made if the user establishes that the quality of the product delivered is not good.</li>
          
          <li>In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within 2 days of receipt of products.</li>
          
          <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 2 days of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.</li>
          
          <li>In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.</li>
        </ol>
        
        <p className="mt-6">In case of any refunds approved by DESTINPQ LLP, it will take 2 days for the refund to be processed to you.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Return Policy</h2>
        <p>We offer refund / exchange within first 2 days from the date of your purchase. If 2 days have passed since your purchase, you will not be offered a return, exchange or refund of any kind.</p>
        
        <p>In order to become eligible for a return or an exchange:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>The purchased item should be unused and in the same condition as you received it</li>
          <li>The item must have original packaging</li>
          <li>If the item that you purchased on a sale, then the item may not be eligible for a return / exchange</li>
        </ul>
        
        <p className="mt-4">Further, only such items are replaced by us (based on an exchange request), if such items are found defective or damaged.</p>
        
        <p>You agree that there may be a certain category of products / items that are exempted from returns or refunds. Such categories of the products would be identified to you at the item of purchase.</p>
        
        <p>For exchange / return accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further, if the same has been approved after the quality check at our end, your request (i.e. return / exchange) will be processed in accordance with our policies.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Policy</h2>
        <p>The orders for the user are shipped through registered domestic courier companies and/or speed post only. Orders are shipped within 2 days from the date of the order and/or payment or as per the delivery date agreed at the time of order confirmation and delivering of the shipment, subject to courier company / post office norms.</p>
        
        <p>Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. Delivery of all orders will be made to the address provided by the buyer at the time of purchase. Delivery of our services will be confirmed on your email ID as specified at the time of registration.</p>
        
        <p>If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case be), the same is not refundable.</p>
      </div>
    </div>
  );
} 