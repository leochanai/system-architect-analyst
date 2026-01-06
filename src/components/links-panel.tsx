"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Link2,
  Plus,
  Trash2,
  X,
  ArrowRight,
  ArrowLeft,
  ArrowUpDown,
  Search,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLinks, type DocLink } from "@/hooks/use-links"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/navigation"

interface LinksPanelProps {
  docSlug: string
  docTitle: string
}

// 获取所有文档信息的辅助函数
function getAllDocs() {
  const docs: Array<{ slug: string; title: string; chapter: string }> = []
  
  navigation.forEach(chapter => {
    chapter.items?.forEach(item => {
      if (item.href) {
        docs.push({
          slug: item.href.replace('/docs/', ''),
          title: item.title,
          chapter: chapter.title
        })
      }
    })
  })
  
  return docs
}

// 根据 slug 获取文档信息
function getDocInfo(slug: string) {
  const docs = getAllDocs()
  return docs.find(doc => doc.slug === slug)
}

export function LinksPanel({ docSlug, docTitle }: LinksPanelProps) {
  const {
    addLink,
    deleteLink,
    getOutgoingLinks,
    getIncomingLinks,
    isLoading
  } = useLinks(docSlug)

  const [isAddingLink, setIsAddingLink] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  
  const outgoingLinks = getOutgoingLinks(docSlug)
  const incomingLinks = getIncomingLinks(docSlug)
  
  const allDocs = getAllDocs()
  
  // 过滤可添加的文档（排除当前文档和已链接的文档）
  const availableDocs = allDocs.filter(doc => {
    if (doc.slug === docSlug) return false // 排除当前文档
    
    // 排除已有正向链接的文档
    const hasOutgoing = outgoingLinks.some(link => link.toSlug === doc.slug)
    if (hasOutgoing) return false
    
    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        doc.title.toLowerCase().includes(query) ||
        doc.chapter.toLowerCase().includes(query)
      )
    }
    
    return true
  })

  const handleAddLink = () => {
    if (selectedDoc) {
      const success = addLink(docSlug, selectedDoc, description)
      if (success) {
        setIsAddingLink(false)
        setSelectedDoc(null)
        setDescription("")
        setSearchQuery("")
      } else {
        alert('该链接已存在')
      }
    }
  }

  const handleCancelAdd = () => {
    setIsAddingLink(false)
    setSelectedDoc(null)
    setDescription("")
    setSearchQuery("")
  }

  if (isLoading) {
    return <div className="p-4 text-center text-muted-foreground">加载中...</div>
  }

  return (
    <div className="space-y-5">
      {/* 正向链接（当前文档指向的） */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold flex items-center gap-1.5 text-muted-foreground uppercase tracking-wider">
            <ArrowRight className="h-3 w-3 text-blue-500" />
            正向链接
            <span className="text-[10px] font-normal">({outgoingLinks.length})</span>
          </h3>
          {!isAddingLink && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsAddingLink(true)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        {isAddingLink ? (
          <div className="space-y-2 p-3 border rounded-lg bg-muted/30">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索章节..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-background rounded-md border focus:outline-none focus:ring-1 focus:ring-ring"
                autoFocus
              />
            </div>
            
            {availableDocs.length > 0 ? (
              <>
                <div className="max-h-32 overflow-y-auto space-y-0.5 pr-1">
                  {availableDocs.map(doc => (
                    <button
                      key={doc.slug}
                      onClick={() => setSelectedDoc(doc.slug)}
                      className={cn(
                        "w-full text-left p-1.5 rounded-md text-xs transition-colors",
                        selectedDoc === doc.slug
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      <div className="font-medium leading-tight">{doc.title}</div>
                      <div className="text-[10px] opacity-70 mt-0.5">{doc.chapter}</div>
                    </button>
                  ))}
                </div>
                
                {selectedDoc && (
                  <textarea
                    placeholder="添加描述（可选）..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-1.5 text-xs bg-background rounded-md border resize-none focus:outline-none focus:ring-1 focus:ring-ring"
                    rows={2}
                  />
                )}
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleAddLink}
                    disabled={!selectedDoc}
                  >
                    确定
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelAdd}
                  >
                    取消
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                {searchQuery ? '没有找到匹配的章节' : '没有可添加的链接'}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-1.5">
            {outgoingLinks.length > 0 ? (
              outgoingLinks.map(link => {
                const targetDoc = getDocInfo(link.toSlug)
                return (
                  <div
                    key={link.id}
                    className="group flex items-start justify-between p-2 rounded-md border hover:bg-muted/30 transition-colors"
                  >
                    <Link
                      href={`/docs/${link.toSlug}`}
                      className="flex-1 min-w-0"
                    >
                      <div className="font-medium text-xs flex items-center gap-1">
                        {targetDoc?.title || link.toSlug}
                        <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      {targetDoc && (
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          {targetDoc.chapter}
                        </div>
                      )}
                      {link.description && (
                        <div className="text-[10px] text-muted-foreground mt-1 italic line-clamp-2">
                          "{link.description}"
                        </div>
                      )}
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        if (confirm('确定要删除这个链接吗？')) {
                          deleteLink(link.id)
                        }
                      }}
                    >
                      <Trash2 className="h-2.5 w-2.5 text-destructive" />
                    </Button>
                  </div>
                )
              })
            ) : (
              <p className="text-xs text-muted-foreground text-center py-3">
                还没有正向链接
              </p>
            )}
          </div>
        )}
      </div>

      {/* 反向链接（指向当前文档的） */}
      <div>
        <h3 className="text-xs font-semibold flex items-center gap-1.5 mb-2 text-muted-foreground uppercase tracking-wider">
          <ArrowLeft className="h-3 w-3 text-green-500" />
          反向链接
          <span className="text-[10px] font-normal">({incomingLinks.length})</span>
        </h3>
        
        <div className="space-y-1.5">
          {incomingLinks.length > 0 ? (
            incomingLinks.map(link => {
              const sourceDoc = getDocInfo(link.fromSlug)
              return (
                <Link
                  key={link.id}
                  href={`/docs/${link.fromSlug}`}
                  className="block p-2 rounded-md border hover:bg-muted/30 transition-colors"
                >
                  <div className="font-medium text-xs flex items-center gap-1">
                    {sourceDoc?.title || link.fromSlug}
                    <ExternalLink className="h-2.5 w-2.5 opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                  {sourceDoc && (
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {sourceDoc.chapter}
                    </div>
                  )}
                  {link.description && (
                    <div className="text-[10px] text-muted-foreground mt-1 italic line-clamp-2">
                      "{link.description}"
                    </div>
                  )}
                </Link>
              )
            })
          ) : (
            <p className="text-xs text-muted-foreground text-center py-3">
              还没有反向链接
            </p>
          )}
        </div>
      </div>

      {/* 双向链接提示 */}
      {(() => {
        const bidirectional = outgoingLinks.filter(out =>
          incomingLinks.some(inc => inc.fromSlug === out.toSlug)
        )
        
        if (bidirectional.length > 0) {
          return (
            <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
                <ArrowUpDown className="h-3 w-3" />
                双向链接
                <span className="text-[10px] font-normal">({bidirectional.length})</span>
              </div>
              <div className="mt-1.5 space-y-0.5">
                {bidirectional.map(link => {
                  const doc = getDocInfo(link.toSlug)
                  return (
                    <Link
                      key={link.id}
                      href={`/docs/${link.toSlug}`}
                      className="block text-xs text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {doc?.title || link.toSlug}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        }
        
        return null
      })()}
    </div>
  )
}
