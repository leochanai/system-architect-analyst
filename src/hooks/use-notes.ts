"use client"

import { useState, useEffect } from 'react'

export interface Note {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  tags?: string[]
}

export function useNotes(docSlug: string) {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const storageKey = `notes-${docSlug}`

  // 从 localStorage 加载笔记
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedNotes = localStorage.getItem(storageKey)
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes))
        }
      } catch (error) {
        console.error('Failed to load notes:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [storageKey])

  // 保存笔记到 localStorage
  const saveNotes = (newNotes: Note[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(newNotes))
        setNotes(newNotes)
      } catch (error) {
        console.error('Failed to save notes:', error)
        // 如果 localStorage 满了，尝试清理旧数据
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          alert('存储空间已满，请清理一些旧笔记')
        }
      }
    }
  }

  // 添加笔记
  const addNote = (content: string, tags?: string[]) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags
    }
    const updatedNotes = [...notes, newNote]
    saveNotes(updatedNotes)
    return newNote
  }

  // 更新笔记
  const updateNote = (id: string, content: string, tags?: string[]) => {
    const updatedNotes = notes.map(note => 
      note.id === id 
        ? { ...note, content, tags, updatedAt: new Date().toISOString() }
        : note
    )
    saveNotes(updatedNotes)
  }

  // 删除笔记
  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id)
    saveNotes(updatedNotes)
  }

  // 清空所有笔记
  const clearNotes = () => {
    saveNotes([])
  }

  // 导出笔记
  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `notes-${docSlug}-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // 导入笔记
  const importNotes = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const importedNotes = JSON.parse(content)
          if (Array.isArray(importedNotes)) {
            // 合并导入的笔记，避免重复
            const existingIds = new Set(notes.map(n => n.id))
            const newNotes = importedNotes.filter(n => !existingIds.has(n.id))
            saveNotes([...notes, ...newNotes])
            resolve()
          } else {
            reject(new Error('Invalid notes format'))
          }
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }

  // 获取所有章节的笔记统计
  const getAllNotesStats = () => {
    if (typeof window === 'undefined') return {}
    
    const stats: Record<string, number> = {}
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('notes-')) {
        try {
          const notes = JSON.parse(localStorage.getItem(key) || '[]')
          const slug = key.replace('notes-', '')
          stats[slug] = notes.length
        } catch (error) {
          console.error(`Failed to parse notes for ${key}:`, error)
        }
      }
    })
    return stats
  }

  return {
    notes,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
    clearNotes,
    exportNotes,
    importNotes,
    getAllNotesStats
  }
}
