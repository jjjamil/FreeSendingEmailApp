import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { useRef, useState } from 'react'
import axios from 'axios'

const ToolbarButton = ({ onClick, active, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
      active
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
)

export default function Editor({ onChange, subject, onSubjectChange }) {
  const imageInputRef = useRef(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    editorProps: {
      attributes: {
        class: 'tiptap-editor p-3',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const insertLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const compressImage = (file) =>
    new Promise((resolve) => {
      const MAX_WIDTH = 1200
      const QUALITY = 0.85

      const img = new window.Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(url)
        const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1
        const canvas = document.createElement('canvas')
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', QUALITY)
      }
      img.src = url
    })

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    e.target.value = ''

    setUploadingImage(true)
    try {
      const compressed = await compressImage(file)
      const formData = new FormData()
      formData.append('file', new File([compressed], 'image.jpg', { type: 'image/jpeg' }))

      const res = await axios.post('/api/upload-image', formData)
      editor.chain().focus().setImage({ src: res.data.url }).run()
    } catch (err) {
      console.error('Image upload error:', err)
      console.error('Response:', err?.response?.data)
      alert('Image upload failed: ' + (err?.response?.data?.detail || err?.message || 'Unknown error'))
    } finally {
      setUploadingImage(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 pb-0">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">✍️ Email</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            placeholder="e.g. Need an extra hand with podcast editing?"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
          <p className="text-xs text-gray-400">
            Use <code className="bg-gray-100 px-1 rounded">{'{Name}'}</code> to personalize each email with the recipient's name.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-4 py-2 border-b border-gray-200 bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold"
        >
          <strong>B</strong>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic"
        >
          <em>I</em>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Underline"
        >
          <span className="underline">U</span>
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet List"
        >
          &#8226; List
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton onClick={insertLink} active={editor.isActive('link')} title="Add Link">
          Link
        </ToolbarButton>

        <ToolbarButton onClick={() => imageInputRef.current?.click()} title="Upload Image">
          {uploadingImage ? '⏳' : 'Image'}
        </ToolbarButton>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} className="min-h-[220px] text-sm text-gray-800" />
    </div>
  )
}
