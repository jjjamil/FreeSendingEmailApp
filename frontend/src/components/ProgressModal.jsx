import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
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

  const statusLabel = {
    pending: 'Starting...',
    running: 'Sending emails...',
    done: 'All done!',
    failed: 'Connection failed',
  }[status] ?? 'Working...'

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-800">Sending Emails</h3>
              <p className="text-sm text-gray-500">{statusLabel}</p>
            </div>
            {status === 'done' || status === 'failed' ? (
              <button
                onClick={() => setShowInfo(true)}
                className="text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                Close
              </button>
            ) : (
              <span className="text-xs text-gray-400 animate-pulse">In progress...</span>
            )}
          </div>

          {/* Progress bar */}
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>{sent + failed} of {total} processed</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="text-green-600">✓ {sent} sent</span>
              <span className="text-red-500">✗ {failed} failed</span>
            </div>
          </div>

          {/* Results list */}
          <div className="px-6 pb-4 mt-3 max-h-64 overflow-y-auto space-y-1">
            {results.map((r, i) => (
              <div
                key={i}
                className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg ${
                  r.status === 'sent' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                }`}
              >
                <span>{r.name} &lt;{r.email}&gt;</span>
                <span className="font-medium">{r.status === 'sent' ? '✓ Sent' : '✗ Failed'}</span>
              </div>
            ))}
            {results.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">Waiting for results...</p>
            )}
          </div>

          {status === 'failed' && data?.error && (
            <div className="px-6 pb-4">
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                Error: {data.error}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info modal shown when Close is clicked */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center space-y-4">
            <div className="text-3xl">📬</div>
            <h3 className="text-base font-semibold text-gray-800">Need to send more emails?</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Each Gmail account has a daily sending limit. If you've hit the cap, simply use a
              <strong> different Gmail account</strong> to continue sending to the rest of your list.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
})
