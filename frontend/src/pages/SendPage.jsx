import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SenderForm from '../components/SenderForm'
import Editor from '../components/Editor'
import RecipientInput from '../components/RecipientInput'
import ProgressModal from '../components/ProgressModal'
import { startSendJob } from '../api'
import AdBanner from '../components/AdBanner'

export default function SendPage() {
  const navigate = useNavigate()
  const [sender, setSender] = useState({
    senderEmail: '',
    senderPassword: '',
    subject: '',
  })
  const [htmlBody, setHtmlBody] = useState('')
  const [recipientMode, setRecipientMode] = useState('csv')
  const [csvFile, setCsvFile] = useState(null)
  const [csvPreview, setCsvPreview] = useState([])
  const [manualRows, setManualRows] = useState([])
  const [job, setJob] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const handleSenderChange = (field, value) => {
    setSender((prev) => ({ ...prev, [field]: value }))
  }

  const handleCsvChange = (file, rows) => {
    setCsvFile(file)
    setCsvPreview(rows)
  }

  const handleModeChange = (mode) => {
    setRecipientMode(mode)
    if (mode === 'csv') {
      setManualRows([])
    } else {
      setCsvFile(null)
      setCsvPreview([])
    }
  }

  const getRecipients = () => {
    if (recipientMode === 'csv') return csvPreview
    return manualRows.filter((r) => r.email)
  }

  const validate = () => {
    if (!sender.senderEmail) return 'Sender email is required.'
    if (!sender.senderPassword) return 'App password is required.'
    if (!sender.subject) return 'Subject line is required.'
    if (!htmlBody || htmlBody === '<p></p>') return 'Email body cannot be empty.'
    const recipients = getRecipients()
    if (recipients.length === 0) return 'Please add at least one recipient.'
    const isGmail = sender.senderEmail.toLowerCase().endsWith('@gmail.com')
    const limit = isGmail ? 400 : 900
    if (recipients.length > limit) return `Recipient count exceeds the ${limit} limit for this sender.`
    return null
  }

  const handleSend = async () => {
    setError('')
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      const recipients = getRecipients()
      const result = await startSendJob({
        senderEmail: sender.senderEmail,
        senderPassword: sender.senderPassword,
        subject: sender.subject,
        htmlBody,
        recipients: recipientMode === 'manual' ? recipients : undefined,
        csvFile: recipientMode === 'csv' ? csvFile : undefined,
      })
      setJob(result)
    } catch (err) {
      const detail = err.response?.data?.detail
      setError(detail || 'Failed to start send job. Check your credentials and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0fdf4 100%)' }}>
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: '#c7d2fe' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl" style={{ background: '#ddd6fe' }} />

      {/* Nav */}
      <nav className="relative z-10 max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
        >
          <img src="/icon.svg" alt="Logo" className="w-5 h-5" />
          ← Back to Home
        </button>
      </nav>

      <div className="relative z-10 py-6 px-4">
        {/* Hero header */}
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <div className="text-5xl mb-3">📨</div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Free Sending Email App For Gmail
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Send personalized bulk emails using your own Gmail account — free, no sign-up needed.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="bg-white text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm border border-gray-100">✉️ Personalized with {'{Name}'}</span>
            <span className="bg-white text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm border border-gray-100">📋 CSV or Manual Import</span>
            <span className="bg-white text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm border border-gray-100">⚡ Batch Sending</span>
            <span className="bg-white text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm border border-gray-100">🔒 Your Credentials Only</span>
          </div>
        </div>

        {/* Form sections */}
        <div className="max-w-3xl mx-auto space-y-5">
          <SenderForm values={sender} onChange={handleSenderChange} />
          <RecipientInput
            mode={recipientMode}
            onModeChange={handleModeChange}
            csvFile={csvFile}
            csvPreview={csvPreview}
            onCsvChange={handleCsvChange}
            manualRows={manualRows}
            onManualChange={setManualRows}
            senderEmail={sender.senderEmail}
          />
          <Editor
            key={resetKey}
            onChange={setHtmlBody}
            subject={sender.subject}
            onSubjectChange={(v) => handleSenderChange('subject', v)}
          />

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <span className="text-base">⚠️</span>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={loading}
            className="w-full text-white font-bold py-4 rounded-xl transition-all text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            style={{ background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            {loading ? '⏳ Starting...' : '🚀 Send Emails'}
          </button>

          <AdBanner />

          <p className="text-center text-gray-400 text-xs pb-6">
            Your credentials are never stored. All processing happens in your own session.
          </p>
        </div>
      </div>

      {job && (
        <ProgressModal
          jobId={job.job_id}
          total={job.total}
          onClose={() => {
            setJob(null)
            setSender({ senderEmail: '', senderPassword: '', subject: '' })
            setHtmlBody('')
            setCsvFile(null)
            setCsvPreview([])
            setManualRows([])
            setError('')
            setResetKey(k => k + 1)
          }}
        />
      )}
    </div>
  )
}
