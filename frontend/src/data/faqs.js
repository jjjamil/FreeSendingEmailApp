export const FAQS = [
  {
    q: 'Is this really free?',
    a: 'Yes — completely free, forever. No subscription, no credit card, no account needed. You authenticate with your own Gmail using a Google App Password, and emails are sent directly through your Gmail account.',
  },
  {
    q: 'How many emails can I send per day?',
    a: 'Personal Gmail accounts (@gmail.com) can send up to 400 recipients per day. Google Workspace accounts (custom domains) can send up to 900 per day. These limits are set by Google, not by us.',
  },
  {
    q: 'Is my Gmail password safe?',
    a: 'We never store your credentials. Your Gmail App Password is used only for the current sending session to authenticate with Gmail\'s SMTP server, and it is discarded the moment you close the tab. Nothing is logged, nothing is persisted.',
  },
  {
    q: 'What is a Gmail App Password and how do I get one?',
    a: 'A Gmail App Password is a 16-character code Google generates so third-party apps can send email on your behalf without using your real password. You can create one in your Google Account security settings under "App Passwords". 2-Step Verification must be enabled on your Google account first.',
  },
  {
    q: 'Can I personalize each email with the recipient\'s name?',
    a: 'Yes. Use the {Name} placeholder anywhere in your subject or body, and it will be automatically replaced with each recipient\'s name from your CSV or manual list. The placeholder is case-insensitive — {name}, {NAME}, and {Name} all work.',
  },
  {
    q: 'Can I include images, formatting, and links?',
    a: 'Yes. The built-in editor supports bold, italic, underline, bullet lists, hyperlinks, and image uploads. Images are automatically compressed and hosted before being inserted into your email body.',
  },
  {
    q: 'Will my emails land in inbox or spam?',
    a: 'Deliverability depends on your Gmail account\'s reputation, your email content, and your recipient list — not on us. Sending from an established Gmail account, avoiding spammy language, and keeping your list clean all improve inbox placement. Emails go through Gmail\'s SMTP, so SPF/DKIM/DMARC are handled by Google.',
  },
]
