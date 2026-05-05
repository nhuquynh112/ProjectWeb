'use client'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

export default function Home() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('notes')) || []
    setNotes(data)
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <div className="
      min-h-screen

      bg-gray-100 text-black
      dark:bg-gradient-to-br 
      dark:from-[#0f172a] 
      dark:via-[#111827] 
      dark:to-[#020617]
      dark:text-white
    ">
      
      {/* HEADER FIXED */}
      <Header count={notes.length} />

      {/* CONTENT */}
      <div className="flex justify-center pt-24 px-4">
        <div className="w-full max-w-2xl">
          <NoteForm setNotes={setNotes} />
          <NoteList notes={notes} deleteNote={deleteNote} />
        </div>
      </div>

    </div>
  )
}