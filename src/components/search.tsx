"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search as SearchIcon, X, Command } from "lucide-react"
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

    setResults(searchResults.slice(0, 10))
  }, [])

  useEffect(() => {
    searchDocs(query)
  }, [query, searchDocs])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
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
        className="relative w-full justify-start text-sm text-muted-foreground border-border hover:border-primary/50 hover:text-foreground transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        <span className="font-mono text-xs">SEARCH</span>
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-0.5 border border-border px-1.5 font-mono text-[10px] text-muted-foreground sm:flex">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed left-[50%] top-[20%] z-50 w-full max-w-2xl translate-x-[-50%] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="blueprint-border bg-card shadow-2xl animate-slide-up">
              {/* 搜索输入 */}
              <div className="flex items-center border-b border-border px-4 py-3">
                <SearchIcon className="mr-3 h-5 w-5 text-primary" />
                <input
                  type="text"
                  placeholder="搜索章节或文档..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground font-mono text-sm"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* 搜索结果 */}
              {results.length > 0 && (
                <div className="max-h-[400px] overflow-y-auto p-2">
                  {results.map((result, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors group flex items-start gap-3"
                      onClick={() => handleSelect(result.href)}
                    >
                      <span className="font-mono text-xs text-primary opacity-50 pt-0.5 w-5">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {result.title}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground mt-0.5">
                          {result.chapter}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* 无结果 */}
              {query && results.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground text-sm">没有找到相关内容</p>
                </div>
              )}

              {/* 空状态 */}
              {!query && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground text-sm font-mono">INPUT KEYWORDS TO SEARCH</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
