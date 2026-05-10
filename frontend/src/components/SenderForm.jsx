import { Mail, KeyRound, ExternalLink } from 'lucide-react'

export default function SenderForm({ values, onChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand-50 text-brand-600">
          <Mail className="w-4 h-4" strokeWidth={2.4} aria-hidden="true" />
        </span>
        <h2 className="text-base font-bold text-gray-900">Sender Details</h2>
      </div>

      <div>
        <label htmlFor="sender-email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Gmail Address
        </label>
        <input
          id="sender-email"
          type="email"
          autoComplete="email"
          value={values.senderEmail}
          onChange={(e) => onChange('senderEmail', e.target.value)}
          placeholder="you@gmail.com"
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
        />
      </div>

      <div>
        <label htmlFor="sender-password" className="block text-sm font-medium text-gray-700 mb-1.5">
          App Password
        </label>
        <div className="relative">
          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
          <input
            id="sender-password"
            type="password"
            autoComplete="off"
            value={values.senderPassword}
            onChange={(e) => onChange('senderPassword', e.target.value)}
            placeholder="xxxx xxxx xxxx xxxx"
            className="w-full border border-gray-200 rounded-lg pl-9 pr-3.5 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow font-mono"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          Use a Gmail App Password, not your regular password.{' '}
          <a
            href="https://myaccount.google.com/apppasswords"
            target="_blank"
            rel="noreferrer"
            className="text-brand-600 hover:text-brand-700 font-medium inline-flex items-center gap-0.5"
          >
            Generate one
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </p>
      </div>
    </div>
  )
}
