"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
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
    return <div className="animate-pulse bg-muted h-96 rounded-lg" />
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        img: ({ src, alt }) => {
          if (!src) return null
          
          // 处理图片路径并加上 basePath
          const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
          const normalizedSrc = src.startsWith('/') ? src : `/${src}`
          const imageSrc = `${basePath}${normalizedSrc}`
          
          // 使用 img 标签而不是 div 包装，避免嵌套错误
          return (
            <img
              src={imageSrc}
              alt={alt || ''}
              className="my-4 w-full h-auto rounded-lg shadow-md block"
              loading="lazy"
            />
          )
        },
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-medium mt-4 mb-2">{children}</h3>
        ),
        p: ({ children }) => {
          // 检查是否包含图片，如果包含则使用 div 而不是 p
          const hasImage = Array.isArray(children) && 
            children.some(child => 
              React.isValidElement(child) && 
              child.type === 'img'
            )
          
          if (hasImage) {
            return <div className="mb-4 leading-relaxed">{children}</div>
          }
          
          return <p className="mb-4 leading-relaxed">{children}</p>
        },
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="ml-4">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
            {children}
          </blockquote>
        ),
        code: ({ inline, children }) => {
          if (inline) {
            return (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            )
          }
          return (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{children}</code>
            </pre>
          )
        },
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-border">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 bg-muted font-medium text-left">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 border-t">
            {children}
          </td>
        ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
