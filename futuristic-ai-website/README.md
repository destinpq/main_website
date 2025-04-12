# DestinPQ Website

A modern, futuristic website for DestinPQ with AI features and chatbot.

## Features

- Responsive, modern UI with dark/light mode
- Interactive chatbot assistant with email notification
- OpenAI integration for advanced features
- Email notification system for customer support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/destinpq-website.git
cd destinpq-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:

```
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Email Configuration
EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email_username
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@destinpq.com
```

5. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Email Notification System

The website includes a chatbot assistant that sends email notifications to the support team whenever a user interacts with it:

- All chatbot messages are forwarded to support@destinpq.com
- After the second message, users are asked for their email address for follow-up
- Email configuration can be customized in the .env file

To test the email functionality:
1. Configure the SMTP settings in your .env file
2. Open the website and interact with the chatbot
3. Check the support@destinpq.com inbox for new messages

## Deployment

The site can be deployed to Vercel or any Node.js hosting:

```bash
npm run build
npm run start
```

## License

This project is licensed under the MIT License. 