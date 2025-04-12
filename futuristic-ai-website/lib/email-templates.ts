interface EmailTemplateData {
  message: string;
  userEmail?: string;
  schedule?: string;
  timestamp?: string;
}

/**
 * Generates HTML for the support inquiry email template
 */
export function getSupportInquiryTemplate({
  message,
  userEmail,
  schedule,
  timestamp = new Date().toLocaleString()
}: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DestinPQ Support Inquiry</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .logo {
          max-width: 150px;
        }
        .content {
          padding: 20px 0;
        }
        .message-box {
          background-color: #f5f5f5;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
        }
        .user-info {
          background-color: #f8f9fa;
          padding: 10px 15px;
          border-radius: 4px;
          margin-top: 15px;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #777;
        }
        .button {
          display: inline-block;
          background-color: #ffc107;
          color: #333;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://destinpq.com/thunh.png" alt="DestinPQ Logo" class="logo">
          <h1>New Support Inquiry</h1>
        </div>
        
        <div class="content">
          <p>A new message has been received through the DestinPQ website chatbot.</p>
          
          <div class="message-box">
            <h3>User Message:</h3>
            <p>${message}</p>
          </div>
          
          <div class="user-info">
            ${userEmail ? `<p><strong>User Email:</strong> ${userEmail}</p>` : '<p><strong>User Email:</strong> Not provided</p>'}
            ${schedule ? `<p><strong>Email Preference:</strong> ${schedule}</p>` : ''}
            <p><strong>Timestamp:</strong> ${timestamp}</p>
          </div>
          
          ${userEmail ? `
          <div style="text-align: center; margin-top: 20px;">
            <a href="mailto:${userEmail}" class="button">Reply to User</a>
          </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <p>This is an automated message from the DestinPQ website. Please do not reply directly to this email.</p>
          <p>&copy; ${new Date().getFullYear()} DestinPQ. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates HTML for the user confirmation email template
 */
export function getUserConfirmationTemplate({
  message,
  userEmail,
  schedule,
  timestamp = new Date().toLocaleString()
}: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DestinPQ Message Received</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .header h1 {
          color: #333;
          margin-top: 10px;
        }
        .logo {
          max-width: 150px;
        }
        .content {
          padding: 20px 0;
        }
        .message-box {
          background-color: #f5f5f5;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #777;
        }
        .button {
          display: inline-block;
          background-color: #ffc107;
          color: #333;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          margin-top: 15px;
        }
        .highlight {
          color: #ffc107;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://destinpq.com/thunh.png" alt="DestinPQ Logo" class="logo">
          <h1>We've Received Your Message</h1>
        </div>
        
        <div class="content">
          <p>Thank you for reaching out to us. Our team has received your inquiry and will get back to you shortly.</p>
          
          <div class="message-box">
            <h3>Your Message:</h3>
            <p>${message}</p>
            <p><strong>Sent on:</strong> ${timestamp}</p>
          </div>
          
          <p>Based on your preferences, you've chosen to receive updates <span class="highlight">${schedule || 'immediately'}</span>.</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://destinpq.com/solutions" class="button">Explore Our Solutions</a>
          </div>
        </div>
        
        <div class="footer">
          <p>If you need immediate assistance, please contact us at support@destinpq.com</p>
          <p>&copy; ${new Date().getFullYear()} DestinPQ. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
} 