import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    // Log to console for debugging
    console.log("Form submitted:", formState);
    
    try {
      // Format the message
      const formattedMessage = `
Contact Form Submission:
------------------------
Name: ${formState.name}
Email: ${formState.email}
Company: ${formState.company || 'Not provided'}
Message:
${formState.message}
      `.trim();
      
      // Send the email using the API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: 'Website Contact Form Submission',
          message: formattedMessage,
          userEmail: formState.email,
          schedule: 'immediately',
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormState({ name: "", email: "", company: "", message: "" });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'success' && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
          <p className="text-green-400 text-sm">Thank you for your message! We've received your inquiry and will get back to you soon.</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-red-400 text-sm">
            There was a problem sending your message. Please try again or contact us via WhatsApp.
            {errorMessage && <span className="block mt-1">{errorMessage}</span>}
          </p>
        </div>
      )}
    
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-yellow-400">
            Your Name
          </label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="bg-black border-[1.5px] border-gray-700 hover:border-yellow-500/50 focus:border-yellow-500 rounded-xl h-14 px-4 text-white placeholder:text-gray-500"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-yellow-400">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className="bg-black border-[1.5px] border-gray-700 hover:border-yellow-500/50 focus:border-yellow-500 rounded-xl h-14 px-4 text-white placeholder:text-gray-500"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium text-yellow-400">
            Company Name <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <Input
            id="company"
            name="company"
            value={formState.company}
            onChange={handleChange}
            placeholder="Your organization"
            className="bg-black border-[1.5px] border-gray-700 hover:border-yellow-500/50 focus:border-yellow-500 rounded-xl h-14 px-4 text-white placeholder:text-gray-500"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-yellow-400">
            Your Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            placeholder="Tell us about your project or inquiry..."
            className="bg-black border-[1.5px] border-gray-700 hover:border-yellow-500/50 focus:border-yellow-500 rounded-xl p-4 text-white placeholder:text-gray-500 min-h-[160px] resize-none"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg py-6 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
} 