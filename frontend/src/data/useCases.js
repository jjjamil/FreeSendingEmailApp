// Each use case becomes its own SEO landing page at /use-cases/[slug]
export const USE_CASES = [
  {
    slug: 'cold-email-outreach',
    icon: 'Snowflake',
    title: 'Cold Email Outreach',
    shortTitle: 'Cold Outreach',
    seoTitle: 'Free Cold Email Outreach Tool — Gmail-Based Bulk Sender',
    seoDescription:
      'Run cold email campaigns free through your own Gmail. Personalized {Name} placeholders, CSV import, and live progress tracking — without paying for Instantly, Lemlist, or Mailshake.',
    metaKeywords: 'cold email tool free, gmail cold email, cold outreach software free, alternative to instantly, alternative to lemlist',
    intro:
      'Cold email outreach is one of the most effective ways to generate leads — but commercial tools like Instantly.ai, Lemlist, and Mailshake charge $30 to $100+ per month. Free Sending Email gives you the core functionality, no monthly fee.',
    sections: [
      {
        h: 'Why use Gmail for cold outreach?',
        p: 'Sending cold emails directly through your own Gmail keeps your sender reputation tied to a domain you already use. Gmail handles SPF, DKIM, and DMARC authentication automatically — meaning your emails are signed and authenticated by Google itself, which most paid tools spend their first onboarding hour helping you set up.',
      },
      {
        h: 'How to send personalized cold emails for free',
        p: 'Drop a CSV of (email, name) pairs into the upload area, write your pitch using {Name} where the recipient\'s name should appear, and hit send. Each email is delivered individually through your Gmail SMTP, batched to stay within daily limits and reduce spam-flag risk.',
      },
      {
        h: 'When you should consider a paid tool instead',
        p: 'If you need email warmup, A/B subject testing, automated follow-up sequences, or reply detection, a paid platform will serve you better. For volumes under 400/day, founders running their own outreach, and freelancers prospecting clients — this works.',
      },
    ],
    compare: [
      { name: 'Instantly.ai', href: 'https://instantly.ai', priceNote: 'from $37/mo' },
      { name: 'Lemlist', href: 'https://lemlist.com', priceNote: 'from $39/mo' },
      { name: 'Mailshake', href: 'https://mailshake.com', priceNote: 'from $59/mo' },
    ],
  },
  {
    slug: 'virtual-assistants',
    icon: 'Briefcase',
    title: 'Virtual Assistants & Email VAs',
    shortTitle: 'Virtual Assistants',
    seoTitle: 'Bulk Email Tool for Virtual Assistants — No OAuth, No Account Linking',
    seoDescription:
      'Virtual assistants managing multiple client inboxes can send bulk emails on a client\'s behalf using just an App Password — no OAuth flow, no account linking. Free and instant.',
    metaKeywords: 'bulk email tool for VA, email tool for virtual assistant, send email on behalf of client, gmail app password tool',
    intro:
      'Virtual assistants juggling multiple client inboxes need a no-login tool — one that doesn\'t connect to their personal Google account or require an OAuth flow per client. Free Sending Email lets a VA paste in a client\'s Gmail address + App Password and send on the client\'s behalf, in seconds.',
    sections: [
      {
        h: 'Why VAs prefer App Password access over OAuth',
        p: 'OAuth-based tools require the client to grant access to their Google account, which often triggers security warnings and revokes when the VA\'s session expires. App Passwords are scoped specifically to email sending, can be revoked instantly by the client, and don\'t expose any other Google account data.',
      },
      {
        h: 'A typical VA workflow',
        p: 'The client generates a Gmail App Password and shares it with the VA. The VA opens Free Sending Email, enters the client\'s Gmail and the App Password, uploads the campaign CSV, writes the message, and hits send. Nothing is stored — the next campaign for a different client starts fresh.',
      },
      {
        h: 'Safety considerations',
        p: 'App Passwords are sender-only and can be revoked anytime by the client from their Google account security page. We never store credentials. Once the tab closes, the password is gone from memory. For long-term VA arrangements, we recommend the client rotates App Passwords periodically as a hygiene measure.',
      },
    ],
    compare: [],
  },
  {
    slug: 'small-business-email',
    icon: 'Megaphone',
    title: 'Small Business Announcements',
    shortTitle: 'Small Business',
    seoTitle: 'Free Bulk Email for Small Business — Send Customer Announcements',
    seoDescription:
      'Send product launch announcements, seasonal promos, and customer updates to your full email list — free. No Mailchimp subscription required for a few hundred emails per month.',
    metaKeywords: 'small business email tool free, bulk email for small business, alternative to mailchimp, free email marketing small business',
    intro:
      'Most small businesses don\'t need to pay $20 to $300 per month for Mailchimp or Brevo to send a few hundred emails. Whether you\'re announcing a product launch, running a seasonal promo, or just keeping customers in the loop, Gmail can handle it — and Free Sending Email makes it batch-friendly.',
    sections: [
      {
        h: 'When Gmail is enough for your business',
        p: 'If your customer list is under a few thousand and you send fewer than five campaigns per month, Gmail (or Workspace) is sufficient. You skip the monthly subscription, the contact-count pricing tiers, and the unsubscribe-management overhead of a full ESP.',
      },
      {
        h: 'When you outgrow this approach',
        p: 'Once you need automated transactional emails, drip sequences, list segmentation, branded templates, or volume above ~900/day, a real ESP becomes worth it. Until then, you\'re paying for features you won\'t use.',
      },
      {
        h: 'Pro tip: keep your list clean',
        p: 'Bouncing emails hurt your Gmail sender reputation. Periodically remove addresses that bounce, and let recipients reply "unsubscribe" — then manually drop them from your CSV. It takes more effort than Mailchimp\'s click-to-unsubscribe, but the cost savings make it worth it for low-volume senders.',
      },
    ],
    compare: [
      { name: 'Mailchimp', href: 'https://mailchimp.com', priceNote: 'from $13/mo' },
      { name: 'Brevo', href: 'https://brevo.com', priceNote: 'from $9/mo' },
    ],
  },
  {
    slug: 'real-estate-email-outreach',
    icon: 'Home',
    title: 'Real Estate Agents',
    shortTitle: 'Real Estate',
    seoTitle: 'Free Email Outreach Tool for Real Estate Agents — Gmail Bulk Sender',
    seoDescription:
      'Real estate agents can send personalized property updates, listing alerts, and lead follow-ups in bulk through Gmail — free, without paying for a CRM email add-on.',
    metaKeywords: 'real estate email tool, bulk email real estate agent, gmail real estate marketing, free crm alternative real estate',
    intro:
      'Real estate is a relationship business — and that means a lot of email. Agents follow up with leads, send listing alerts to buyer pools, share market updates with past clients, and pitch new sellers. Most CRM email add-ons charge per-agent monthly. Gmail can do this for free.',
    sections: [
      {
        h: 'Personalized listing emails at scale',
        p: 'Build a CSV of your buyer leads with their name and email. Write a single template using {Name} where you\'d normally type each recipient\'s name. Free Sending Email replaces the placeholder per-recipient and sends each email individually through your Gmail — looks just like you wrote it one-by-one.',
      },
      {
        h: 'Past-client check-ins',
        p: 'Quarterly check-in emails to past clients keep referrals flowing. Maintain a CSV of past clients and run a quick "thinking of you, market update attached" send each quarter. Personalized with their name, sent from your Gmail, no marketing automation tool required.',
      },
      {
        h: 'CRM users — when this complements your existing tools',
        p: 'If you use a real estate CRM (Follow Up Boss, kvCORE, etc.), this isn\'t a replacement — but it\'s a great add-on for one-off campaigns, FSBO outreach lists, or sending to leads that aren\'t in your CRM yet.',
      },
    ],
    compare: [],
  },
  {
    slug: 'recruiter-bulk-email',
    icon: 'Target',
    title: 'Recruiters & HR Teams',
    shortTitle: 'Recruiters',
    seoTitle: 'Free Recruiter Outreach Tool — Bulk Personalized Emails for Sourcing',
    seoDescription:
      'Recruiters can send personalized candidate outreach in bulk through Gmail — upload a CSV, write your template with {Name}, and send to your sourced list in one click. Free.',
    metaKeywords: 'recruiter email tool free, bulk email recruiter, candidate outreach gmail, free sourcing tool',
    intro:
      'Sourcing at scale means sending a lot of outreach emails. Whether you\'re working a hot req or running a quarterly nurture campaign for your talent pool, copy-pasting templates one by one in Gmail isn\'t a strategy. Free Sending Email lets you blast personalized outreach without paying for an ATS-add-on or a sourcing tool.',
    sections: [
      {
        h: 'CSV-driven candidate outreach',
        p: 'Export your sourced list (LinkedIn Recruiter, Apollo, Hunter, etc.) to CSV with name and email columns. Write your template using {Name} where each candidate\'s first name goes. Send the whole list in one go through your Gmail — each candidate gets a personally-addressed email.',
      },
      {
        h: 'In-house HR for internal communications',
        p: 'Internal HR teams use this for company-wide announcements that need a personal touch — birthday recognitions, anniversary notes, custom benefits enrollment reminders. Personalize each one without manual copy-paste.',
      },
      {
        h: 'Compliance considerations',
        p: 'When sending candidate outreach, observe local regulations (GDPR for EU candidates, CAN-SPAM for US). Free Sending Email is the sending mechanism — you\'re responsible for your list source, opt-out handling, and content compliance.',
      },
    ],
    compare: [],
  },
  {
    slug: 'freelancer-cold-email',
    icon: 'UserRound',
    title: 'Freelancers & Consultants',
    shortTitle: 'Freelancers',
    seoTitle: 'Free Cold Email Tool for Freelancers — Pitch Clients via Gmail',
    seoDescription:
      'Solo freelancers and consultants can prospect clients via cold email free, using their own Gmail. No monthly subscription to Hunter campaigns, Woodpecker, or other paid tools.',
    metaKeywords: 'freelancer cold email tool, consultant prospecting tool, free cold email solo, alternative to woodpecker, alternative to hunter campaigns',
    intro:
      'As a solo freelancer or consultant, prospecting is part of the job — but committing to a $40/month outreach tool when you\'re not yet sure how often you\'ll use it is a poor trade. Free Sending Email is the right starting point: send cold emails through your own Gmail, keep your domain reputation clean, and only graduate to paid tools when your volume justifies it.',
    sections: [
      {
        h: 'Why your own Gmail beats a "warmup-included" tool early on',
        p: 'New freelancers often get pushed toward tools that include domain warmup as a feature. But for a few dozen prospects per week from your established personal Gmail, warmup isn\'t the bottleneck — your message and offer are. Free Sending Email lets you focus on those, not on tooling.',
      },
      {
        h: 'A simple weekly outreach rhythm',
        p: 'Maintain one CSV per niche or service. Each week, add 20–30 new prospects, write a personalized template using {Name}, and send. Track replies in your Gmail inbox like you would any conversation. No funnel software, no sequence tool, just real one-on-one outreach at scale.',
      },
      {
        h: 'When to upgrade',
        p: 'When you\'re sending 100+ prospects per week and need automated follow-ups, Woodpecker, Hunter Campaigns, or Smartlead are worth the cost. Until then, this saves you ~$500/year.',
      },
    ],
    compare: [
      { name: 'Hunter Campaigns', href: 'https://hunter.io', priceNote: 'from $34/mo' },
      { name: 'Woodpecker', href: 'https://woodpecker.co', priceNote: 'from $29/mo' },
    ],
  },
  {
    slug: 'school-nonprofit-bulk-email',
    icon: 'GraduationCap',
    title: 'Schools & Non-Profits',
    shortTitle: 'Schools & Non-Profits',
    seoTitle: 'Free Bulk Email for Schools and Non-Profits — Reach Your Community',
    seoDescription:
      'Schools, PTAs, churches, and non-profits can send personalized announcements to large lists of families, members, or donors through Gmail — completely free.',
    metaKeywords: 'free email tool nonprofit, school bulk email, church email tool free, pta bulk email, donor email free',
    intro:
      'Schools, churches, PTAs, community groups, and non-profits often need to communicate with hundreds of families, members, or donors on a tight or zero budget. Free Sending Email is exactly that — free. No credit card, no signup, no per-contact pricing.',
    sections: [
      {
        h: 'Common scenarios we see',
        p: 'PTA event reminders, school enrollment updates, fundraising appeals, weekly newsletters to congregations, volunteer call-outs, and donor thank-you messages. All work well from a school or organization Gmail with personalized {Name} fields.',
      },
      {
        h: 'Use a Workspace account if you can',
        p: 'If your school or org has a Google Workspace account (custom domain), you can send up to 900 emails per day instead of the personal Gmail 400/day cap. The workflow is identical, you just enter the Workspace email address and an App Password.',
      },
      {
        h: 'Why this beats a free Mailchimp tier for some non-profits',
        p: 'Mailchimp\'s free tier limits you to one audience and adds their branding. Free Sending Email has no audience cap, no per-month send limit beyond Gmail\'s daily cap, and no third-party branding — emails come from your Gmail just like any other message.',
      },
    ],
    compare: [],
  },
  {
    slug: 'sales-team-cold-outreach',
    icon: 'TrendingUp',
    title: 'Sales Teams & SDRs',
    shortTitle: 'Sales Teams',
    seoTitle: 'Free Sales Outreach Tool — Personalized Bulk Emails via Gmail SMTP',
    seoDescription:
      'Sales teams and SDRs can prospect via personalized cold emails through their own Gmail — free, with {Name} placeholder support and Gmail-safe batch sending.',
    metaKeywords: 'sdr email tool free, sales prospecting tool free, alternative to apollo, alternative to outreach io, gmail bulk sales email',
    intro:
      'Sales reps and SDRs need to hit volume without burning the team\'s budget on enterprise sequencing tools. For early-stage teams, founder-led sales, or running a quick test campaign before committing to Apollo or Outreach, Free Sending Email is a way to get personalized outreach into market today, not next quarter when procurement closes.',
    sections: [
      {
        h: 'Use it for testing before paying',
        p: 'Before committing to a $99/seat/month sequencing platform, test your messaging with a few hundred prospects through your own Gmail. If your reply rate is poor, no platform will fix that. If it\'s strong, you\'ve already proven the offer before buying tooling.',
      },
      {
        h: 'Founder-led sales',
        p: 'For founders running pre-Series-A outbound personally, paying $99/month for a sequencer is a tax on validating your market. Use your own founder-email Gmail (which carries built-in credibility), personalize with {Name}, and reply manually. The personal touch beats automation at this stage anyway.',
      },
      {
        h: 'When you graduate to a real sequencer',
        p: 'Once you have a defined SDR motion with multi-touch sequences, reply detection, A/B testing, and inbox rotation across multiple sender domains — Apollo, Outreach.io, or Smartlead are worth it. Free Sending Email is the bridge to get there.',
      },
    ],
    compare: [
      { name: 'Apollo.io', href: 'https://apollo.io', priceNote: 'from $59/seat/mo' },
      { name: 'Outreach', href: 'https://outreach.io', priceNote: 'enterprise pricing' },
    ],
  },
]
