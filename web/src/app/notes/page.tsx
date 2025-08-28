"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  StickyNote, 
  ArrowRight, 
  Download, 
  Search,
  Calendar,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { navigation } from "@/lib/navigation"

interface NotesSummary {
  slug: string
  title: string
  chapter: string
  count: number
  notes: any[]
  lastUpdated?: string
}

export default function NotesPage() {
  const [notesSummary, setNotesSummary] = useState<NotesSummary[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAllNotes()
  }, [])

  const loadAllNotes = () => {
    if (typeof window === 'undefined') return

    const summary: NotesSummary[] = []
    
    // 遍历所有章节
    navigation.forEach(chapter => {
      chapter.items?.forEach(item => {
        if (item.href) {
          const slug = item.href.replace('/docs/', '')
          const storageKey = `notes-${slug}`
          
          try {
            const savedNotes = localStorage.getItem(storageKey)
            if (savedNotes) {
              const notes = JSON.parse(savedNotes)
              if (notes.length > 0) {
                // 找到最近更新时间
                const lastUpdated = notes.reduce((latest: string, note: any) => {
                  const noteDate = note.updatedAt || note.createdAt
                  return noteDate > latest ? noteDate : latest
                }, notes[0].createdAt)

                summary.push({
                  slug,
                  title: item.title,
                  chapter: chapter.title,
                  count: notes.length,
                  notes,
                  lastUpdated
                })
              }
            }
          } catch (error) {
            console.error(`Failed to load notes for ${slug}:`, error)
          }
        }
      })
    })

    // 按最近更新时间排序
    summary.sort((a, b) => {
      const dateA = a.lastUpdated || ''
      const dateB = b.lastUpdated || ''
      return dateB.localeCompare(dateA)
    })

    setNotesSummary(summary)
    setIsLoading(false)
  }

  const exportAllNotes = () => {
    const allNotes: Record<string, any> = {}
    
    notesSummary.forEach(item => {
      allNotes[item.slug] = {
        title: item.title,
        chapter: item.chapter,
        notes: item.notes
      }
    })

    const dataStr = JSON.stringify(allNotes, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `all-notes-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const filteredSummary = notesSummary.filter(item => {
    const query = searchQuery.toLowerCase()
    return (
      item.title.toLowerCase().includes(query) ||
      item.chapter.toLowerCase().includes(query) ||
      item.notes.some(note => note.content.toLowerCase().includes(query))
    )
  })

  const totalNotes = notesSummary.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* 页面标题 */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <StickyNote className="h-10 w-10 text-primary" />
          我的学习笔记
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          查看和管理所有章节的学习笔记
        </p>
      </div>

      {/* 统计和工具栏 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{notesSummary.length}</div>
            <div className="text-sm text-muted-foreground">章节有笔记</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{totalNotes}</div>
            <div className="text-sm text-muted-foreground">条笔记总数</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索笔记..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-muted rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button onClick={exportAllNotes} disabled={totalNotes === 0}>
            <Download className="h-4 w-4 mr-2" />
            导出全部
          </Button>
        </div>
      </div>

      {/* 笔记列表 */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-pulse text-muted-foreground">加载中...</div>
        </div>
      ) : filteredSummary.length === 0 ? (
        <div className="text-center py-12">
          <StickyNote className="h-16 w-16 mx-auto mb-4 text-muted-foreground/20" />
          <p className="text-lg text-muted-foreground">
            {searchQuery ? '没有找到匹配的笔记' : '还没有任何笔记'}
          </p>
          {!searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              开始学习并记录您的心得吧
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredSummary.map((item) => (
            <div
              key={item.slug}
              className="group relative overflow-hidden rounded-xl border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{item.chapter}</p>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    
                    {/* 显示最新的笔记预览 */}
                    <div className="space-y-2 mb-4">
                      {item.notes.slice(0, 2).map((note, index) => (
                        <div key={index} className="bg-muted rounded-lg p-3">
                          <p className="text-sm line-clamp-2">{note.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(note.createdAt)}
                          </p>
                        </div>
                      ))}
                      {item.count > 2 && (
                        <p className="text-sm text-muted-foreground">
                          还有 {item.count - 2} 条笔记...
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{item.count} 条笔记</span>
                      </div>
                      {item.lastUpdated && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>最后更新: {formatDate(item.lastUpdated)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Link href={`/docs/${item.slug}`}>
                    <Button variant="ghost" size="icon" className="ml-4">
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* 装饰性背景 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
