"use client"

import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded-sm w-3/4"></div>
        <div className="h-4 bg-muted animate-pulse rounded-sm w-full"></div>
        <div className="h-4 bg-muted animate-pulse rounded-sm w-5/6"></div>
        <div className="h-4 bg-muted animate-pulse rounded-sm w-4/5"></div>
      </div>
    )
  }

  return (
    <div className="markdown-content prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => {
            if (!src) return null

            const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
            const normalizedSrc = src.startsWith('/') ? src : `/${src}`
            const imageSrc = `${basePath}${normalizedSrc}`

            return (
              <img
                src={imageSrc}
                alt={alt || ''}
                className="my-6 w-full h-auto border border-border block"
                loading="lazy"
              />
            )
          },
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-12 mb-6 text-foreground tracking-tight first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground tracking-tight flex items-center gap-3">
              <span className="w-1 h-6 bg-primary flex-shrink-0"></span>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium mt-8 mb-3 text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => {
            const hasImage = Array.isArray(children) &&
              children.some(child =>
                React.isValidElement(child) &&
                child.type === 'img'
              )

            if (hasImage) {
              return <div className="mb-4 leading-relaxed">{children}</div>
            }

            return <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
          },
          ul: ({ children }) => (
            <ul className="list-none mb-6 space-y-2 pl-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-none mb-6 space-y-2 pl-0 counter-reset-item">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-3 text-foreground/90">
              <span className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0"></span>
              <span className="flex-1">{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary pl-4 my-6 text-muted-foreground italic">
              {children}
            </blockquote>
          ),
          code: ({ inline, children }) => {
            if (inline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 font-mono text-sm text-primary border border-border">
                  {children}
                </code>
              )
            }
            return (
              <pre className="bg-card border border-border p-4 overflow-x-auto my-6">
                <code className="text-sm font-mono text-foreground">{children}</code>
              </pre>
            )
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 border border-border">
              <table className="min-w-full divide-y divide-border">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 bg-muted font-mono text-xs uppercase tracking-wider text-left text-muted-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 border-t border-border text-sm">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:underline underline-offset-2"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          hr: () => (
            <hr className="my-8 border-0 h-px bg-border" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
