import Papa from 'papaparse'
import { useRef } from 'react'

export default function CsvUpload({ csvFile, preview, onFileChange }) {
  const inputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return

    Papa.parse(file, {
      complete: (result) => {
        const rows = result.data
          .filter((row) => row.length >= 2 && row[0].trim() && row[1].trim())
          .map((row) => ({ email: row[0].trim(), name: row[1].trim() }))
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
    <div className="space-y-3">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
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
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">{csvFile.name}</p>
            <p className="text-xs text-gray-400">{preview.length} recipient(s) found</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); clearFile() }}
              className="text-xs text-red-400 hover:text-red-600 font-medium mt-1"
            >
              Remove file
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Click to upload a CSV file</p>
            <p className="text-xs text-gray-400">
              Expected columns: <strong>email</strong> (col 1), <strong>name</strong> (col 2)
            </p>
            <p className="text-xs text-amber-500 font-medium mt-1">
              ⚠️ No header row — start directly with data on row 1
            </p>
          </div>
        )}
      </div>

      {preview.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left sticky top-0">
              <tr>
                <th className="px-4 py-2 font-medium">#</th>
                <th className="px-4 py-2 font-medium">Email</th>
                <th className="px-4 py-2 font-medium">Name</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((row, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-4 py-1 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-1">{row.email}</td>
                  <td className="px-4 py-1">{row.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
