"use client"

import { useState, useEffect } from 'react'

export interface DocLink {
  id: string
  fromSlug: string
  toSlug: string
  fromTitle?: string
  toTitle?: string
  description?: string
  createdAt: string
}

export function useLinks(currentSlug?: string) {
  const [links, setLinks] = useState<DocLink[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const storageKey = 'doc-links'

  // 从 localStorage 加载所有链接
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLinks = localStorage.getItem(storageKey)
        if (savedLinks) {
          setLinks(JSON.parse(savedLinks))
        }
      } catch (error) {
        console.error('Failed to load links:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

  // 保存链接到 localStorage
  const saveLinks = (newLinks: DocLink[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(newLinks))
        setLinks(newLinks)
      } catch (error) {
        console.error('Failed to save links:', error)
      }
    }
  }

  // 添加链接
  const addLink = (fromSlug: string, toSlug: string, description?: string) => {
    // 检查是否已存在相同的链接
    const exists = links.some(
      link => link.fromSlug === fromSlug && link.toSlug === toSlug
    )
    
    if (exists) {
      return false // 链接已存在
    }

    const newLink: DocLink = {
      id: Date.now().toString(),
      fromSlug,
      toSlug,
      description,
      createdAt: new Date().toISOString()
    }
    
    const updatedLinks = [...links, newLink]
    saveLinks(updatedLinks)
    return true
  }

  // 更新链接描述
  const updateLink = (id: string, description: string) => {
    const updatedLinks = links.map(link =>
      link.id === id
        ? { ...link, description }
        : link
    )
    saveLinks(updatedLinks)
  }

  // 删除链接
  const deleteLink = (id: string) => {
    const updatedLinks = links.filter(link => link.id !== id)
    saveLinks(updatedLinks)
  }

  // 获取指定文档的正向链接（从当前文档指向其他文档）
  const getOutgoingLinks = (slug: string): DocLink[] => {
    return links.filter(link => link.fromSlug === slug)
  }

  // 获取指定文档的反向链接（从其他文档指向当前文档）
  const getIncomingLinks = (slug: string): DocLink[] => {
    return links.filter(link => link.toSlug === slug)
  }

  // 获取双向链接（互相链接的文档）
  const getBidirectionalLinks = (slug: string): DocLink[] => {
    const outgoing = getOutgoingLinks(slug)
    const incoming = getIncomingLinks(slug)
    
    return outgoing.filter(out =>
      incoming.some(inc => inc.fromSlug === out.toSlug)
    )
  }

  // 检查两个文档是否已连接
  const areConnected = (slug1: string, slug2: string): boolean => {
    return links.some(
      link => 
        (link.fromSlug === slug1 && link.toSlug === slug2) ||
        (link.fromSlug === slug2 && link.toSlug === slug1)
    )
  }

  // 获取链接图数据（用于可视化）
  const getLinkGraph = () => {
    const nodes = new Set<string>()
    const edges: Array<{ source: string; target: string; id: string }> = []

    links.forEach(link => {
      nodes.add(link.fromSlug)
      nodes.add(link.toSlug)
      edges.push({
        source: link.fromSlug,
        target: link.toSlug,
        id: link.id
      })
    })

    return {
      nodes: Array.from(nodes),
      edges
    }
  }

  // 清空所有链接
  const clearAllLinks = () => {
    saveLinks([])
  }

  // 导出链接
  const exportLinks = () => {
    const dataStr = JSON.stringify(links, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `doc-links-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // 导入链接
  const importLinks = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const importedLinks = JSON.parse(content)
          if (Array.isArray(importedLinks)) {
            // 合并导入的链接，避免重复
            const existingIds = new Set(links.map(l => l.id))
            const newLinks = importedLinks.filter(l => !existingIds.has(l.id))
            saveLinks([...links, ...newLinks])
            resolve()
          } else {
            reject(new Error('Invalid links format'))
          }
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }

  return {
    links,
    isLoading,
    addLink,
    updateLink,
    deleteLink,
    getOutgoingLinks: currentSlug ? () => getOutgoingLinks(currentSlug) : getOutgoingLinks,
    getIncomingLinks: currentSlug ? () => getIncomingLinks(currentSlug) : getIncomingLinks,
    getBidirectionalLinks: currentSlug ? () => getBidirectionalLinks(currentSlug) : getBidirectionalLinks,
    areConnected,
    getLinkGraph,
    clearAllLinks,
    exportLinks,
    importLinks
  }
}
