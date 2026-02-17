import { useNavigate } from 'react-router-dom'

const features = [
  {
    icon: '✉️',
    title: 'Personalized Emails',
    desc: 'Use {Name} anywhere in your email body and it automatically gets replaced with each recipient\'s name.',
  },
  {
    icon: '📋',
    title: 'CSV or Manual Import',
    desc: 'Upload a CSV file with your recipient list or add them manually row by row — your choice.',
  },
  {
    icon: '⚡',
    title: 'Batch Sending',
    desc: 'Emails are sent in smart batches to stay within Gmail\'s daily limits and avoid spam filters.',
  },
  {
    icon: '🔒',
    title: 'Your Credentials Only',
    desc: 'We never store your Gmail password. Everything runs through your own account using an App Password.',
  },
  {
    icon: '🖼️',
    title: 'Image Support',
    desc: 'Insert images directly into your email body. Images are compressed and hosted automatically.',
  },
  {
    icon: '📊',
    title: 'Live Progress Tracking',
    desc: 'Watch your emails send in real time with a live progress bar and per-recipient status.',
  },
]

const steps = [
  { number: '01', title: 'Enter your Gmail', desc: 'Use your Gmail address and a Gmail App Password — not your regular password. Takes 2 minutes to set up.' },
  { number: '02', title: 'Add recipients', desc: 'Upload a CSV file (email, name columns) or add recipients manually. Name column is optional.' },
  { number: '03', title: 'Write & send', desc: 'Compose your email in the rich text editor, then hit Send. Watch the progress in real time.' },
]

const faqs = [
  {
    q: 'Is this really free?',
    a: 'Yes, completely free. No subscription, no credit card, no account needed. You just use your own Gmail to send.',
  },
  {
    q: 'How many emails can I send?',
    a: 'Personal Gmail accounts (@gmail.com) can send up to 400 emails per day. Google Workspace accounts can send up to 900 per day.',
  },
  {
    q: 'Is my Gmail password safe?',
    a: 'We never store your credentials. They are used only for the current session to authenticate with Gmail\'s SMTP server and are gone the moment you close the tab.',
  },
  {
    q: 'What is a Gmail App Password?',
    a: 'A Gmail App Password is a 16-character code Google generates so third-party apps can send email on your behalf securely without using your real password. You can create one in your Google Account security settings.',
  },
  {
    q: 'Can I use formatting and images?',
    a: 'Yes. The built-in editor supports bold, italic, underline, bullet lists, links, and image uploads.',
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0fdf4 100%)' }}>
      {/* Decorative blobs */}
      <div className="fixed top-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#c7d2fe' }} />
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#ddd6fe' }} />

      {/* Nav */}
      <nav className="relative z-10 max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
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
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="text-6xl mb-5">📨</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
          Send Bulk Emails Free<br />
          <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Using Your Own Gmail
          </span>
        </h1>
        <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
          No sign-up. No subscription. No third-party servers storing your data.
          Just your Gmail account, a recipient list, and your message — sent in minutes.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/send')}
            className="text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all text-base"
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            Start Sending for Free
          </button>
          <a
            href="#how-it-works"
            className="bg-white text-gray-700 font-semibold px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all text-base border border-gray-200"
          >
            How It Works
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {['No sign-up required', 'Free forever', 'Your credentials only', 'Up to 400 emails/day'].map((badge) => (
            <span key={badge} className="bg-white text-gray-500 text-xs px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              ✓ {badge}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Everything You Need to Send at Scale</h2>
        <p className="text-gray-400 text-sm text-center mb-10">Powerful features, zero cost.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">How It Works</h2>
        <p className="text-gray-400 text-sm text-center mb-10">Three steps and your emails are on their way.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.number} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div
                className="text-2xl font-extrabold mb-3 inline-block"
                style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {s.number}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-sm text-center mb-10">Everything you need to know before you start.</p>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-1">{faq.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-3">Ready to send your first campaign?</h2>
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
