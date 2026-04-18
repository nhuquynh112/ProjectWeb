'use client'

export default function NoteList({ notes, deleteNote }) {
  return (
    <div className="space-y-4">
      {notes.map(note => (
        <div
          key={note.id}
          className="
            flex justify-between items-center p-4 rounded-xl

            bg-white border border-gray-300 shadow-sm
            dark:bg-white/5 dark:border-white/10

            backdrop-blur-md
            hover:shadow-md transition
          "
        >
          <div>
            <p className="font-medium text-black dark:text-white">
              {note.text}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {note.time}
            </p>
          </div>

          <button
            onClick={() => deleteNote(note.id)}
            className="
              bg-red-100 text-red-600 
              dark:bg-red-500/20 dark:text-red-300 
              px-3 py-1 rounded-lg
              hover:bg-red-200 dark:hover:bg-red-500/40
              transition
            "
          >
            Xóa
          </button>
        </div>
      ))}
    </div>
  )
}