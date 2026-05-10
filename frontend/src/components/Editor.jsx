import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { useRef, useState } from 'react'
import axios from 'axios'
import {
  Bold, Italic, Underline as UnderlineIcon,
  List, Link as LinkIcon, Image as ImageIconLucide,
  Loader2, PenLine,
} from 'lucide-react'

const ToolbarButton = ({ onClick, active, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    aria-label={title}
    aria-pressed={active}
    className={`inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
      active
        ? 'bg-brand-100 text-brand-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
        class: 'tiptap-editor p-4',
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

      const baseUrl = import.meta.env.PUBLIC_API_URL || import.meta.env.VITE_API_URL || ''
      const res = await axios.post(`${baseUrl}/api/upload-image`, formData)
      editor.chain().focus().setImage({ src: res.data.url }).run()
    } catch (err) {
      console.error('Image upload error:', err)
      alert('Image upload failed: ' + (err?.response?.data?.detail || err?.message || 'Unknown error'))
    } finally {
      setUploadingImage(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 pb-0">
        <div className="flex items-center gap-2.5 mb-5">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand-50 text-brand-600">
            <PenLine className="w-4 h-4" strokeWidth={2.4} aria-hidden="true" />
          </span>
          <h2 className="text-base font-bold text-gray-900">Email</h2>
        </div>

        <div className="mb-5">
          <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
            Subject
          </label>
          <input
            id="email-subject"
            type="text"
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            placeholder="e.g. Quick question about your podcast"
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
          <p className="text-xs text-gray-500">
            Use{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-brand-700 font-mono">{'{Name}'}</code>{' '}
            to personalize each email with the recipient's name.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-4 py-2 border-y border-gray-100 bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold"
        >
          <Bold className="w-4 h-4" strokeWidth={2.4} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic"
        >
          <Italic className="w-4 h-4" strokeWidth={2.4} aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" strokeWidth={2.4} aria-hidden="true" />
        </ToolbarButton>

        <span className="w-px h-5 bg-gray-300 mx-1.5" aria-hidden="true" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List className="w-4 h-4" strokeWidth={2.4} aria-hidden="true" />
        </ToolbarButton>

        <span className="w-px h-5 bg-gray-300 mx-1.5" aria-hidden="true" />

        <ToolbarButton onClick={insertLink} active={editor.isActive('link')} title="Add Link">
          <LinkIcon className="w-4 h-4" strokeWidth={2.4} aria-hidden="true" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => imageInputRef.current?.click()}
          title={uploadingImage ? 'Uploading…' : 'Upload Image'}
        >
          {uploadingImage ? (
            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <ImageIconLucide className="w-4 h-4" strokeWidth={2.4} aria-hidden="true" />
          )}
        </ToolbarButton>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <EditorContent editor={editor} className="text-sm text-gray-800" />
    </div>
  )
}
