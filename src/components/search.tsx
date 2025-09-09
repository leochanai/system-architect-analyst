"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search as SearchIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navigation } from "@/lib/navigation"

export function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Array<{ title: string; href: string; chapter: string }>>([])
  const router = useRouter()

  const searchDocs = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const searchResults: Array<{ title: string; href: string; chapter: string }> = []
    const lowerQuery = searchQuery.toLowerCase()

    navigation.forEach((chapter) => {
      chapter.items?.forEach((item) => {
        if (
          item.title.toLowerCase().includes(lowerQuery) ||
          chapter.title.toLowerCase().includes(lowerQuery)
        ) {
          searchResults.push({
            title: item.title,
            href: item.href || "#",
            chapter: chapter.title,
          })
        }
      })
    })

    setResults(searchResults.slice(0, 10)) // 限制显示10个结果
  }, [])

  useEffect(() => {
    searchDocs(query)
  }, [query, searchDocs])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K 打开搜索
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      // ESC 关闭搜索
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSelect = (href: string) => {
    router.push(href)
    setIsOpen(false)
    setQuery("")
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground"
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        <span>搜索文档...</span>
        <kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <div
            className="fixed left-[50%] top-[20%] z-50 w-full max-w-2xl translate-x-[-50%] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-lg border bg-background shadow-lg">
              <div className="flex items-center border-b px-4 py-3">
                <SearchIcon className="mr-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索章节或文档..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {results.length > 0 && (
                <div className="max-h-[400px] overflow-y-auto p-2">
                  {results.map((result, index) => (
                    <button
                      key={index}
                      className="w-full rounded-md px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handleSelect(result.href)}
                    >
                      <div className="font-medium">{result.title}</div>
                      <div className="text-xs text-muted-foreground">{result.chapter}</div>
                    </button>
                  ))}
                </div>
              )}
              
              {query && results.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  没有找到相关内容
                </div>
              )}
              
              {!query && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  输入关键词开始搜索
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
