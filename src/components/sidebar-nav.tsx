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

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b px-4 py-4">
        <Logo />
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1">
            <Search />
          </div>
          <ThemeToggle />
        </div>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-1">
        <Accordion type="multiple" className="w-full">
          {navigation.map((chapter, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <span className="text-sm font-medium">{chapter.title}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="ml-4 space-y-1">
                  {chapter.items?.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href || "#"}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
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
      <div className="border-t p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2025 架构师考试</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </div>
  )
}
