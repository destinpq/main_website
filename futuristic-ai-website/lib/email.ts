import nodemailer from 'nodemailer';
import { getSupportInquiryTemplate, getUserConfirmationTemplate } from './email-templates';

interface EmailData {
  subject: string;
  message: string;
  userEmail?: string;
  schedule?: string;
}

export async function sendSupportEmail({ subject, message, userEmail, schedule }: EmailData) {
  try {
    // Log email attempt
    console.log('Attempting to send email with the following configuration:');
    console.log(`Host: ${process.env.EMAIL_HOST || 'smtp.example.com'}`);
    console.log(`Port: ${process.env.EMAIL_PORT || '587'}`);
    console.log(`User: ${process.env.EMAIL_USER || 'not set'}`);
    console.log(`From: ${process.env.EMAIL_FROM || 'support@destinpq.com'}`);
    console.log(`Secure: ${process.env.EMAIL_SECURE === 'true'}`);
    
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.example.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASSWORD || '',
      },
      tls: {
        // Disable TLS verification in development
        rejectUnauthorized: process.env.NODE_ENV === 'production'
      },
      debug: true // Enable debug logs
    });

    // Prepare the timestamp
    const timestamp = new Date().toLocaleString();
    
    // Send email to support team
    const supportEmailResult = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'support@destinpq.com',
      to: 'support@destinpq.com',
      subject: `Chatbot Inquiry: ${subject}`,
      html: getSupportInquiryTemplate({
        message,
        userEmail,
        schedule,
        timestamp
      }),
    });
    
    console.log('Support email sent successfully:', supportEmailResult.messageId);
    
    // Send confirmation email to user if email is provided and schedule is immediate
    if (userEmail && (!schedule || schedule === 'immediately')) {
      try {
        const userEmailResult = await transporter.sendMail({
          from: process.env.EMAIL_FROM || 'support@destinpq.com',
          to: userEmail,
          subject: `We've Received Your Message - DestinPQ`,
          html: getUserConfirmationTemplate({
            message,
            userEmail,
            schedule,
            timestamp
          }),
        });
        
        console.log('User confirmation email sent successfully:', userEmailResult.messageId);
      } catch (userEmailError) {
        console.error('Error sending confirmation email to user:', userEmailError);
        // Continue execution even if user email fails
      }
    }

    return { success: true, messageId: supportEmailResult.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
} 