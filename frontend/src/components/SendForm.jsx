import { useState } from 'react'
import { Send, AlertTriangle, Loader2, ShieldCheck } from 'lucide-react'
import SenderForm from './SenderForm'
import Editor from './Editor'
import RecipientInput from './RecipientInput'
import ProgressModal from './ProgressModal'
import Turnstile from './Turnstile'
import { startSendJob } from '../api'

export default function SendForm() {
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
  const [turnstileToken, setTurnstileToken] = useState(null)

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
    if (recipients.length > limit)
      return `Recipient count exceeds the ${limit} limit for this sender.`
    if (!turnstileToken)
      return 'Please complete the CAPTCHA below before sending.'
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
        turnstileToken,
      })
      setJob(result)
    } catch (err) {
      const detail = err.response?.data?.detail
      setError(
        detail || 'Failed to start send job. Check your credentials and try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setJob(null)
    setSender({ senderEmail: '', senderPassword: '', subject: '' })
    setHtmlBody('')
    setCsvFile(null)
    setCsvPreview([])
    setManualRows([])
    setError('')
    setTurnstileToken(null)
    setResetKey((k) => k + 1)
  }

  return (
    <>
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

        <Turnstile key={`ts-${resetKey}`} onToken={setTurnstileToken} />

        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
          >
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          onClick={handleSend}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl transition-all text-sm shadow-brand-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 bg-brand-gradient"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} aria-hidden="true" />
              Starting…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
              Send Emails
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-500 pt-2 inline-flex items-center justify-center gap-1.5 w-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
          Your credentials are never stored. All processing happens in your own session.
        </p>
      </div>

      {job && <ProgressModal jobId={job.job_id} total={job.total} onClose={reset} />}
    </>
  )
}
