'use client'
import { useState } from 'react'

export default function NoteForm({ setNotes }) {
  const [text, setText] = useState('')

  const handleAdd = () => {
    if (!text.trim()) return

    const newNote = {
      id: Date.now(),
      text,
      time: new Date().toLocaleString()
    }

    setNotes(prev => [...prev, newNote])
    setText('')
  }

  return (
    <div className="flex gap-3 mb-6">
      
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập ghi chú mới..."
        className="
          flex-1 px-4 py-3 rounded-xl border outline-none

          bg-white border-gray-300 text-black placeholder-gray-500
          dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder-gray-400
        "
      />

      <button
        type="button"
        onClick={handleAdd}
        className="
          px-5 py-3 rounded-xl 
          bg-gradient-to-r from-purple-500 to-pink-500 
          text-white font-medium 
          hover:opacity-90 transition
        "
      >
        + Thêm
      </button>

    </div>
  )
}