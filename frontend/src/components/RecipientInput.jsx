import { Users, Upload, Pencil } from 'lucide-react'
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand-50 text-brand-600">
            <Users className="w-4 h-4" strokeWidth={2.4} aria-hidden="true" />
          </span>
          <h2 className="text-base font-bold text-gray-900">Recipients</h2>
        </div>
        {senderEmail && (
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              overLimit
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {count} / {limit} max · {isGmail ? 'Personal Gmail' : 'Workspace'}
          </span>
        )}
      </div>

      <div className="inline-flex p-1 bg-gray-100 rounded-lg">
        <button
          type="button"
          onClick={() => onModeChange('csv')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            mode === 'csv'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Upload className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
          Upload CSV
        </button>
        <button
          type="button"
          onClick={() => onModeChange('manual')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            mode === 'manual'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Pencil className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
          Enter Manually
        </button>
      </div>

      {overLimit && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
          You have {count} recipients but the limit for this sender is {limit}. Reduce the list before sending.
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
