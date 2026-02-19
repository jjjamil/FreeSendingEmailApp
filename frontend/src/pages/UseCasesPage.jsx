import { useNavigate } from 'react-router-dom'

const useCases = [
  {
    icon: '🧊',
    title: 'Cold Email Outreach',
    slug: 'cold-email-outreach',
    desc: 'Cold outreach is one of the most effective ways to generate leads — but tools like Instantly.ai, Lemlist, or Mailshake can cost anywhere from $30 to $100+ per month. Free Sending Email App gives you the same core functionality: personalized bulk emails sent through your own Gmail, with {Name} replacement, batch sending, and live progress tracking. No monthly fee.',
    links: [
      { label: 'Instantly.ai', href: 'https://instantly.ai' },
      { label: 'Lemlist', href: 'https://lemlist.com' },
      { label: 'Mailshake', href: 'https://mailshake.com' },
    ],
  },
  {
    icon: '💼',
    title: 'Virtual Assistants (VAs)',
    slug: 'virtual-assistants',
    desc: 'VAs managing email campaigns for multiple clients often need a lightweight, no-login tool they can use without connecting to their own Google account. Free Sending Email App lets VAs send on behalf of clients by simply using the client\'s Gmail App Password — no OAuth, no account linking, no risk to the VA\'s own account. It\'s the simplest way to send bulk emails for someone else.',
    links: [],
  },
  {
    icon: '📢',
    title: 'Small Business Announcements',
    slug: 'small-business-email',
    desc: 'Whether it\'s a product launch, a seasonal promotion, or a store update — small businesses don\'t need to pay for Mailchimp or Brevo just to send a few hundred emails. Upload your customer list as a CSV, write your message, and send. Free forever, no subscription required.',
    links: [
      { label: 'Mailchimp', href: 'https://mailchimp.com' },
      { label: 'Brevo', href: 'https://brevo.com' },
    ],
  },
  {
    icon: '🏠',
    title: 'Real Estate Agents',
    slug: 'real-estate-email-outreach',
    desc: 'Real estate agents regularly reach out to prospect lists, follow up with leads, or send property updates to multiple clients at once. Free Sending Email App makes it easy to personalize each email with the recipient\'s name and send to hundreds of contacts directly from your Gmail — without paying for a CRM add-on or email marketing tool.',
    links: [],
  },
  {
    icon: '🎯',
    title: 'Recruiters & HR Teams',
    slug: 'recruiter-bulk-email',
    desc: 'Sourcing candidates at scale means sending a lot of outreach emails. Recruiters can upload a CSV of candidate names and emails, write a personalized template using {Name}, and send to the entire list in one go. It beats copy-pasting the same email into Gmail one by one — and it\'s free.',
    links: [],
  },
  {
    icon: '🧑‍💻',
    title: 'Freelancers & Consultants',
    slug: 'freelancer-cold-email',
    desc: 'Freelancers prospecting for new clients often need to send cold emails regularly. Free Sending Email App is perfect for solo operators who don\'t want to commit to a paid tool. Use your own Gmail, keep your sending history clean, and reach potential clients without paying for tools like Hunter.io campaigns or Woodpecker.',
    links: [
      { label: 'Hunter.io', href: 'https://hunter.io' },
      { label: 'Woodpecker', href: 'https://woodpecker.co' },
    ],
  },
  {
    icon: '🎓',
    title: 'Schools & Non-Profits',
    slug: 'school-nonprofit-bulk-email',
    desc: 'Schools, community organizations, and non-profits often need to communicate with large groups of people on a tight budget. Free Sending Email App is completely free to use — no credit card, no sign-up. Just upload your contact list and send.',
    links: [],
  },
  {
    icon: '📊',
    title: 'Sales Teams & SDRs',
    slug: 'sales-team-cold-outreach',
    desc: 'Sales development reps need to hit volume without burning budget on expensive sequencing tools. Free Sending Email App handles personalized bulk sending with {Name} tags and batched delivery designed to stay within Gmail\'s daily limits. It\'s a great starting point before investing in platforms like Apollo.io or Outreach.',
    links: [
      { label: 'Apollo.io', href: 'https://apollo.io' },
      { label: 'Outreach', href: 'https://outreach.io' },
    ],
  },
]

export default function UseCasesPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0fdf4 100%)' }}>
      <div className="fixed top-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#c7d2fe' }} />
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#ddd6fe' }} />

      {/* Nav */}
      <nav className="relative z-10 max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src="/icon.svg" alt="Logo" className="w-7 h-7" />
          <span className="font-bold text-gray-800 text-sm">Free Sending Email</span>
        </div>
        <button
          onClick={() => navigate('/send')}
          className="text-sm font-semibold text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
          style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
        >
          Start Sending
        </button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-14 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
          Who Uses{' '}
          <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Free Sending Email App?
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          From cold outreach to client communications — here's how real people use it instead of paying for expensive email marketing tools.
        </p>
      </section>

      {/* Use Cases */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-16 space-y-6">
        {useCases.map((uc) => (
          <article key={uc.slug} id={uc.slug} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{uc.icon}</span>
              <h2 className="text-lg font-bold text-gray-800">{uc.title}</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{uc.desc}</p>
            {uc.links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-gray-400">Compare with:</span>
                {uc.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:text-blue-700 underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-10 text-center">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-3">Ready to start sending?</h2>
          <p className="text-gray-500 text-sm mb-6">No account needed. Just your Gmail and your message.</p>
          <button
            onClick={() => navigate('/send')}
            className="text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all text-base"
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            Start Sending for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-xs text-gray-400 border-t border-gray-200">
        Free Sending Email App For Gmail — Free forever. Your credentials are never stored.
      </footer>
    </div>
  )
}
