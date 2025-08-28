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

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-full py-6 px-4">
      <div className="space-y-1">
        <h2 className="mb-4 px-2 text-lg font-semibold tracking-tight">
          系统架构设计师考试学习指南
        </h2>
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
  )
}
