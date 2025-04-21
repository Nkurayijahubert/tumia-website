import mail from '@sendgrid/mail';

// Initialize SendGrid
const apiKey = process.env.SENDGRID_API_KEY;
if (apiKey) {
  mail.setApiKey(apiKey);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  // If SendGrid API key is not set, log a warning and return
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key is not set. Email not sent.');
    return false;
  }

  try {
    await mail.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || '',
      html: params.html || '',
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendWaitlistNotification(entry: {
  name: string;
  email: string;
  company: string;
  role: string;
}): Promise<boolean> {
  return sendEmail({
    to: 'team@tumia.app',
    from: 'noreply@tumia.app', // This must be a verified sender in your SendGrid account
    subject: 'New Waitlist Signup: ' + entry.name,
    html: `
      <h2>New Waitlist Entry</h2>
      <p>A new user has joined the Tumia waitlist:</p>
      <ul>
        <li><strong>Name:</strong> ${entry.name}</li>
        <li><strong>Email:</strong> ${entry.email}</li>
        <li><strong>Company:</strong> ${entry.company}</li>
        <li><strong>Role:</strong> ${entry.role}</li>
      </ul>
      <p>Log in to your dashboard to view all waitlist entries.</p>
    `,
    text: `
      New Waitlist Entry\n\n
      A new user has joined the Tumia waitlist:\n
      Name: ${entry.name}\n
      Email: ${entry.email}\n
      Company: ${entry.company}\n
      Role: ${entry.role}\n\n
      Log in to your dashboard to view all waitlist entries.
    `,
  });
}