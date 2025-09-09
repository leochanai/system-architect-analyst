"use client"

import { useState, useRef } from "react"
import { 
  StickyNote, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Download, 
  Upload,
  Calendar,
  Tag,
  ChevronRight,
  ChevronLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotes, type Note } from "@/hooks/use-notes"
import { cn } from "@/lib/utils"

interface NotesPanelProps {
  docSlug: string
}

export function NotesPanel({ docSlug }: NotesPanelProps) {
  const { 
    notes, 
    isLoading, 
    addNote, 
    updateNote, 
    deleteNote, 
    clearNotes,
    exportNotes,
    importNotes
  } = useNotes(docSlug)

  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newNoteContent, setNewNoteContent] = useState("")
  const [editingContent, setEditingContent] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      addNote(newNoteContent.trim())
      setNewNoteContent("")
    }
  }

  const handleStartEdit = (note: Note) => {
    setEditingId(note.id)
    setEditingContent(note.content)
  }

  const handleSaveEdit = () => {
    if (editingId && editingContent.trim()) {
      updateNote(editingId, editingContent.trim())
      setEditingId(null)
      setEditingContent("")
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingContent("")
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        await importNotes(file)
        alert('笔记导入成功')
      } catch (error) {
        alert('导入失败：' + (error as Error).message)
      }
      // 清空 input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <>
      {/* 切换按钮 */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "fixed right-4 top-1/2 -translate-y-1/2 z-40 shadow-lg",
          "bg-background/95 backdrop-blur-sm hover:bg-accent",
          "transition-all duration-300",
          isOpen && "right-[384px]"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <>
            <StickyNote className="h-4 w-4" />
            {notes.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                {notes.length}
              </span>
            )}
          </>
        )}
      </Button>

      {/* 笔记面板 */}
      <div
        className={cn(
          "fixed right-0 top-0 h-screen w-96 bg-background border-l shadow-xl",
          "transform transition-transform duration-300 z-30",
          "flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* 头部 */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <StickyNote className="h-5 w-5" />
              学习笔记
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            为当前章节添加学习笔记
          </p>
        </div>

        {/* 工具栏 */}
        <div className="flex items-center gap-2 p-4 border-b">
          <Button
            variant="outline"
            size="sm"
            onClick={exportNotes}
            disabled={notes.length === 0}
          >
            <Download className="h-4 w-4 mr-1" />
            导出
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-1" />
            导入
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          {notes.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm('确定要清空所有笔记吗？')) {
                  clearNotes()
                }
              }}
              className="ml-auto text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              清空
            </Button>
          )}
        </div>

        {/* 新增笔记输入框 */}
        <div className="p-4 border-b">
          <div className="space-y-2">
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="记录学习要点、疑问或想法..."
              className="w-full min-h-[100px] p-3 text-sm bg-muted rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleAddNote()
                }
              }}
            />
            <Button 
              className="w-full" 
              onClick={handleAddNote}
              disabled={!newNoteContent.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              添加笔记
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Cmd/Ctrl + Enter 快速添加
            </p>
          </div>
        </div>

        {/* 笔记列表 */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="text-center text-muted-foreground py-8">
              加载中...
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <StickyNote className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>还没有笔记</p>
              <p className="text-sm mt-2">开始记录您的学习心得吧</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="group relative bg-muted rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {editingId === note.id ? (
                    // 编辑模式
                    <div className="space-y-2">
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full min-h-[100px] p-2 text-sm bg-background rounded resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={!editingContent.trim()}
                        >
                          <Save className="h-3 w-3 mr-1" />
                          保存
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-3 w-3 mr-1" />
                          取消
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // 显示模式
                    <>
                      <div className="pr-16">
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {note.content}
                        </p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(note.createdAt)}</span>
                          {note.updatedAt !== note.createdAt && (
                            <>
                              <span>•</span>
                              <span>编辑于 {formatDate(note.updatedAt)}</span>
                            </>
                          )}
                        </div>
                        {note.tags && note.tags.length > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            <Tag className="h-3 w-3 text-muted-foreground" />
                            {note.tags.map((tag, i) => (
                              <span key={i} className="text-xs bg-background px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleStartEdit(note)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => {
                              if (confirm('确定要删除这条笔记吗？')) {
                                deleteNote(note.id)
                              }
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部统计 */}
        {notes.length > 0 && (
          <div className="border-t p-4 text-sm text-muted-foreground text-center">
            共 {notes.length} 条笔记
          </div>
        )}
      </div>
    </>
  )
}
