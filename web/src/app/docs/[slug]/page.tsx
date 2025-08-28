import { navigation } from "@/lib/navigation"
import { getDocContent } from "@/lib/markdown"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MarkdownContent } from "@/components/markdown-content"
import Link from "next/link"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// 生成所有可能的静态路径
export async function generateStaticParams() {
  const paths: { slug: string }[] = []
  
  navigation.forEach(chapter => {
    chapter.items?.forEach(item => {
      if (item.href) {
        const slug = item.href.replace('/docs/', '')
        paths.push({ slug })
      }
    })
  })
  
  return paths
}

// 根据slug获取文档信息
function getDocInfo(slug: string) {
  for (const chapter of navigation) {
    for (const item of chapter.items || []) {
      if (item.href === `/docs/${slug}`) {
        return {
          title: item.title,
          chapter: chapter.title
        }
      }
    }
  }
  return null
}

// 获取相邻文档（上一篇、下一篇）
function getAdjacentDocs(slug: string) {
  const allDocs: Array<{href: string; title: string}> = []
  
  navigation.forEach(chapter => {
    chapter.items?.forEach(item => {
      if (item.href) {
        allDocs.push({ href: item.href, title: item.title })
      }
    })
  })
  
  const currentIndex = allDocs.findIndex(doc => doc.href === `/docs/${slug}`)
  
  return {
    prev: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
    next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null
  }
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const docInfo = getDocInfo(slug)
  
  if (!docInfo) {
    notFound()
  }
  
  // 获取 Markdown 内容
  const docContent = await getDocContent(slug)
  const { prev, next } = getAdjacentDocs(slug)
  
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">{docInfo.chapter}</p>
        <h1 className="text-3xl font-bold tracking-tight">{docInfo.title}</h1>
        {docContent?.metadata && (
          <div className="mt-4 flex flex-wrap gap-2">
            {docContent.metadata.tags?.map((tag: string) => (
              <span key={tag} className="px-2 py-1 bg-muted rounded text-sm">
                {tag}
              </span>
            ))}
            {docContent.metadata.star && (
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 rounded text-sm">
                {docContent.metadata.star}
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="">
        {docContent ? (
          <MarkdownContent content={docContent.content} />
        ) : (
          <div className="rounded-lg bg-muted p-8 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              📚 此章节内容正在准备中...
            </p>
            <p className="text-sm text-muted-foreground">
              无法找到对应的 Markdown 文件
            </p>
          </div>
        )}
      </div>
      
      {/* 导航按钮 */}
      <div className="flex justify-between mt-12 pt-6 border-t">
        <div>
          {prev && (
            <Link href={prev.href}>
              <Button variant="outline">
                ← {prev.title}
              </Button>
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link href={next.href}>
              <Button variant="outline">
                {next.title} →
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
