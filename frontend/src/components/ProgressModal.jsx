import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { CheckCircle2, XCircle, Loader2, X, Inbox } from 'lucide-react'
import { getJobStatus } from '../api'

export default function ProgressModal({ jobId, total, onClose }) {
  const statusRef = useRef(null)

  useEffect(() => {
    if (!jobId) return

    const interval = setInterval(async () => {
      try {
        const data = await getJobStatus(jobId)
        statusRef.current?.update(data)

        if (data.status === 'done' || data.status === 'failed') {
          clearInterval(interval)
        }
      } catch {
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [jobId])

  return (
    <ModalContent jobId={jobId} total={total} onClose={onClose} ref={statusRef} />
  )
}

const ModalContent = forwardRef(function ModalContent({ total, onClose }, ref) {
  const [data, setData] = useState(null)
  const [showInfo, setShowInfo] = useState(false)

  useImperativeHandle(ref, () => ({
    update(newData) {
      setData(newData)
    },
  }))

  const sent = data?.sent ?? 0
  const failed = data?.failed ?? 0
  const results = data?.results ?? []
  const status = data?.status ?? 'pending'
  const progress = total > 0 ? Math.round(((sent + failed) / total) * 100) : 0
  const isDone = status === 'done' || status === 'failed'

  const statusLabel =
    {
      pending: 'Starting…',
      running: 'Sending emails…',
      done: 'All done!',
      failed: 'Connection failed',
    }[status] ?? 'Working…'

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="progress-modal-title"
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDone ? (
                status === 'done' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
                )
              ) : (
                <Loader2 className="w-5 h-5 text-brand-600 animate-spin" aria-hidden="true" />
              )}
              <div>
                <h3 id="progress-modal-title" className="text-base font-semibold text-gray-900">
                  Sending Emails
                </h3>
                <p className="text-xs text-gray-500">{statusLabel}</p>
              </div>
            </div>
            {isDone && (
              <button
                onClick={() => setShowInfo(true)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="px-6 pt-5">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>
                {sent + failed} of {total} processed
              </span>
              <span className="font-semibold text-gray-700">{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-brand-gradient h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-4 mt-3 text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                {sent} sent
              </span>
              <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                {failed} failed
              </span>
            </div>
          </div>

          <div className="px-6 pb-5 mt-4 max-h-64 overflow-y-auto space-y-1.5">
            {results.map((r, i) => (
              <div
                key={i}
                className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg ${
                  r.status === 'sent'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                <span className="truncate">
                  {r.name ? `${r.name} <${r.email}>` : r.email}
                </span>
                <span className="font-semibold inline-flex items-center gap-1 flex-shrink-0 ml-2">
                  {r.status === 'sent' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      Sent
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      Failed
                    </>
                  )}
                </span>
              </div>
            ))}
            {results.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-6">Waiting for results…</p>
            )}
          </div>

          {status === 'failed' && data?.error && (
            <div className="px-6 pb-5">
              <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                Error: {data.error}
              </p>
            </div>
          )}
        </div>
      </div>

      {showInfo && (
        <div
          className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 mb-4 mx-auto">
              <Inbox className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Need to send more emails?</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              Each Gmail account has a daily sending limit. If you've hit the cap, simply use a{' '}
              <strong>different Gmail account</strong> to continue sending.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-brand-gradient text-white text-sm font-bold py-2.5 rounded-xl shadow-brand hover:shadow-brand-lg transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
})
