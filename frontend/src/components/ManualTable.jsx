import { Plus, Trash2 } from 'lucide-react'

export default function ManualTable({ rows, onChange }) {
  const updateRow = (index, field, value) => {
    const updated = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row,
    )
    onChange(updated)
  }

  const addRow = () => {
    onChange([...rows, { name: '', email: '' }])
  }

  const removeRow = (index) => {
    onChange(rows.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="px-3 py-2 font-medium text-xs uppercase tracking-wider w-8">#</th>
              <th className="px-3 py-2 font-medium text-xs uppercase tracking-wider">Name</th>
              <th className="px-3 py-2 font-medium text-xs uppercase tracking-wider">Email</th>
              <th className="px-3 py-2 font-medium w-12"></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">
                  No recipients yet. Click "Add Row" to start.
                </td>
              </tr>
            )}
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="px-3 py-2 text-gray-400 text-xs">{index + 1}</td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => updateRow(index, 'name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="email"
                    value={row.email}
                    onChange={(e) => updateRow(index, 'email', e.target.value)}
                    placeholder="john@example.com"
                    className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    aria-label={`Remove row ${index + 1}`}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addRow}
        className="inline-flex items-center gap-1.5 text-sm text-brand-700 hover:text-brand-800 font-semibold"
      >
        <Plus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
        Add Row
      </button>
    </div>
  )
}
