"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { navigation } from "@/lib/navigation"
import { Logo } from "@/components/logo"
import { Search } from "@/components/search"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"

export function SidebarNav() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>([])

  // 根据当前路径自动展开对应的章节
  useEffect(() => {
    const currentChapterIndex = navigation.findIndex(chapter =>
      chapter.items?.some(item => item.href === pathname)
    )

    if (currentChapterIndex !== -1) {
      const itemValue = `item-${currentChapterIndex}`
      setOpenItems(prev => prev.includes(itemValue) ? prev : [...prev, itemValue])
    }
  }, [pathname])

  // 提取章节编号（如 "第 1 章" -> "01"）
  const getChapterNumber = (title: string, index: number): string => {
    const match = title.match(/第\s*(\d+)\s*章/)
    if (match) {
      return match[1].padStart(2, '0')
    }
    return String(index + 1).padStart(2, '0')
  }

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Header */}
      <div className="border-b border-sidebar-border px-5 py-5">
        <Logo />
        <div className="mt-5 flex items-center gap-2">
          <div className="flex-1">
            <Search />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1 stagger-container">
          <Accordion
            type="multiple"
            className="w-full space-y-1"
            value={openItems}
            onValueChange={setOpenItems}
          >
            {navigation.map((chapter, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none"
              >
                <AccordionTrigger className="hover:no-underline px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors rounded-sm group">
                  <div className="flex items-center gap-3 text-left">
                    {/* 章节编号 */}
                    <span className="font-mono text-xs text-primary opacity-60 w-5 flex-shrink-0">
                      {getChapterNumber(chapter.title, index)}
                    </span>
                    <span className="text-sm font-medium leading-snug">{chapter.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-1">
                  <div className="ml-8 space-y-0.5 border-l border-sidebar-border pl-3">
                    {chapter.items?.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href || "#"}
                        className={cn(
                          "nav-item block px-3 py-2 text-sm transition-all rounded-sm",
                          pathname === item.href
                            ? "text-sidebar-primary bg-sidebar-accent font-medium"
                            : "text-muted-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-5 py-4">
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>ARCHITECT.EXAM</span>
          <span className="opacity-50">v2.0</span>
        </div>
      </div>
    </div>
  )
}
