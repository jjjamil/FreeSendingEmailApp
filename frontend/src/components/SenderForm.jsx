export default function SenderForm({ values, onChange }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">📧 Sender Details</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gmail Address
        </label>
        <input
          type="email"
          value={values.senderEmail}
          onChange={(e) => onChange('senderEmail', e.target.value)}
          placeholder="you@gmail.com"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          App Password
        </label>
        <input
          type="password"
          value={values.senderPassword}
          onChange={(e) => onChange('senderPassword', e.target.value)}
          placeholder="xxxx xxxx xxxx xxxx"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-400 mt-1">
          Use a Gmail App Password, not your regular password.{' '}
          <a
            href="https://myaccount.google.com/apppasswords"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            Generate one here
          </a>
        </p>
      </div>

    </div>
  )
}
