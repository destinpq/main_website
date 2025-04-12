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
    // Enhanced logging for debugging
    console.log('==== EMAIL SENDING ATTEMPT ====');
    console.log('Subject:', subject);
    console.log('User Email:', userEmail || 'Not provided');
    console.log('Email Configuration:');
    console.log(`Host: ${process.env.EMAIL_HOST}`);
    console.log(`Port: ${process.env.EMAIL_PORT}`);
    console.log(`User: ${process.env.EMAIL_USER}`);
    console.log(`From: ${process.env.EMAIL_FROM}`);
    console.log(`Secure: ${process.env.EMAIL_SECURE}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    
    // Create a transporter with detailed debug
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        // Disable TLS verification in development
        rejectUnauthorized: process.env.NODE_ENV === 'production'
      },
      logger: true,
      debug: true // Enable debug logs
    });

    // Verify connection configuration
    try {
      const verification = await transporter.verify();
      console.log('Transporter verification:', verification);
    } catch (verifyError) {
      console.error('Email verification failed:', verifyError);
    }
    
    // Prepare the timestamp
    const timestamp = new Date().toLocaleString();
    
    // Try/catch block specifically for sending the email
    try {
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
      
      // Send confirmation email to user if email is provided
      if (userEmail) {
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
    } catch (emailSendError: any) {
      console.error('Error in sendMail operation:', emailSendError);
      console.error('Error code:', emailSendError.code);
      console.error('Error response:', emailSendError.response);
      
      return { 
        success: false, 
        error: emailSendError,
        errorCode: emailSendError.code || 'UNKNOWN',
        errorResponse: emailSendError.response || 'No response'
      };
    }
  } catch (error) {
    console.error('Outer error in email sending:', error);
    return { success: false, error };
  }
} 