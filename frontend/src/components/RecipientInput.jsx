import CsvUpload from './CsvUpload'
import ManualTable from './ManualTable'

export default function RecipientInput({
  mode,
  onModeChange,
  csvFile,
  csvPreview,
  onCsvChange,
  manualRows,
  onManualChange,
  senderEmail,
}) {
  const isGmail = senderEmail?.toLowerCase().endsWith('@gmail.com')
  const limit = isGmail ? 400 : 900
  const count = mode === 'csv' ? csvPreview.length : manualRows.length
  const overLimit = count > limit

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">👥 Recipients</h2>
        {senderEmail && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${overLimit ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
            {count} / {limit} max &middot; {isGmail ? 'Personal Gmail' : 'Work Email'}
          </span>
        )}
      </div>

      {/* Toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onModeChange('csv')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            mode === 'csv'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Upload CSV
        </button>
        <button
          type="button"
          onClick={() => onModeChange('manual')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            mode === 'manual'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Enter Manually
        </button>
      </div>

      {overLimit && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          You have {count} recipients but the limit for this sender is {limit}. Please reduce the list before sending.
        </p>
      )}

      {mode === 'csv' ? (
        <CsvUpload csvFile={csvFile} preview={csvPreview} onFileChange={onCsvChange} />
      ) : (
        <ManualTable rows={manualRows} onChange={onManualChange} />
      )}
    </div>
  )
}
