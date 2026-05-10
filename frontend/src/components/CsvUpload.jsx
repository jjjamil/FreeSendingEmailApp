import Papa from 'papaparse'
import { useRef } from 'react'
import { UploadCloud, FileText, X, AlertTriangle } from 'lucide-react'

export default function CsvUpload({ csvFile, preview, onFileChange }) {
  const inputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return

    Papa.parse(file, {
      complete: (result) => {
        const rows = result.data
          .filter((row) => row.length >= 1 && row[0].trim())
          .map((row) => ({ email: row[0].trim(), name: (row[1] || '').trim() }))
        onFileChange(file, rows)
      },
      skipEmptyLines: true,
    })
  }

  const clearFile = () => {
    onFileChange(null, [])
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-xl p-7 text-center cursor-pointer transition-colors ${
          csvFile
            ? 'border-emerald-200 bg-emerald-50/40'
            : 'border-gray-200 hover:border-brand-300 hover:bg-brand-50/40'
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFile}
        />
        {csvFile ? (
          <div className="flex flex-col items-center gap-1.5">
            <FileText className="w-6 h-6 text-emerald-600" aria-hidden="true" />
            <p className="text-sm font-semibold text-gray-900">{csvFile.name}</p>
            <p className="text-xs text-gray-500">{preview.length} recipient(s) loaded</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                clearFile()
              }}
              className="mt-1 inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              Remove file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <UploadCloud className="w-7 h-7 text-gray-400" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-700">Click to upload a CSV</p>
            <p className="text-xs text-gray-500">
              Columns: <strong>email</strong> (col 1), <strong>name</strong> (col 2, optional)
            </p>
            <p className="text-xs text-amber-700 font-medium inline-flex items-center gap-1 mt-0.5">
              <AlertTriangle className="w-3 h-3" aria-hidden="true" />
              No header row — start data on row 1
            </p>
          </div>
        )}
      </div>

      {preview.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 max-h-56 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left sticky top-0">
              <tr>
                <th className="px-4 py-2 font-medium text-xs uppercase tracking-wider">#</th>
                <th className="px-4 py-2 font-medium text-xs uppercase tracking-wider">Email</th>
                <th className="px-4 py-2 font-medium text-xs uppercase tracking-wider">Name</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((row, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-4 py-1.5 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-1.5 text-gray-700">{row.email}</td>
                  <td className="px-4 py-1.5 text-gray-700">{row.name || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
