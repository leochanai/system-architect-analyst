import { navigation } from "@/lib/navigation"
import { getDocContent } from "@/lib/markdown"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MarkdownContent } from "@/components/markdown-content"
import Link from "next/link"
import { ArrowUp, ArrowDown } from "lucide-react"

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
        // 提取章节编号
        const match = chapter.title.match(/第\s*(\d+)\s*章/)
        const chapterNum = match ? match[1].padStart(2, '0') : '00'

        return {
          title: item.title,
          chapter: chapter.title,
          chapterNum
        }
      }
    }
  }
  return null
}

// 获取相邻文档（上一篇、下一篇）
function getAdjacentDocs(slug: string) {
  const allDocs: Array<{ href: string; title: string }> = []

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

  const docContent = await getDocContent(slug)
  const { prev, next } = getAdjacentDocs(slug)

  return (
    <div className="animate-fade-in">
      {/* 文档内容 */}
      <div className="max-w-4xl mx-auto relative">
        {/* 文档头部 */}
        <header className="relative mb-8 pb-6 border-b border-border">
          {/* 章节编号装饰 */}
          <div className="chapter-number">{docInfo.chapterNum}</div>

          {/* 章节标签 */}
          <div className="relative flex items-center gap-3 mb-4">
            <span className="tag">{docInfo.chapter}</span>
          </div>

          {/* 标题 */}
          <h1 className="relative text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {docInfo.title}
          </h1>

          {/* 元数据标签 */}
          {docContent?.metadata && (
            <div className="mt-4 flex flex-wrap gap-2">
              {docContent.metadata.tags?.map((tag: string) => (
                <span key={tag} className="px-2 py-1 font-mono text-xs border border-border text-muted-foreground">
                  {tag}
                </span>
              ))}
              {docContent.metadata.star && (
                <span className="px-2 py-1 font-mono text-xs bg-primary/10 text-primary border border-primary/20">
                  {docContent.metadata.star}
                </span>
              )}
            </div>
          )}
        </header>

        {/* 内容区域 */}
        <article className="relative">
          {docContent ? (
            <MarkdownContent content={docContent.content} />
          ) : (
            <div className="blueprint-border p-8 text-center">
              <p className="text-lg text-muted-foreground mb-2 font-mono">
                CONTENT LOADING...
              </p>
              <p className="text-sm text-muted-foreground">
                无法找到对应的 Markdown 文件
              </p>
            </div>
          )}
        </article>
      </div>

      {/* 右侧垂直导航栏 - 贴着内容右侧20px */}
      <nav className="fixed left-[calc(50%+28rem+180px)] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
        {prev && (
          <Link href={prev.href}>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-3 px-3 py-4 h-auto w-[50px] btn-press hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all"
            >
              <ArrowUp className="h-5 w-5 flex-shrink-0" />
              <span className="text-xs text-center leading-tight line-clamp-3" style={{ writingMode: 'vertical-rl' }}>{prev.title}</span>
            </Button>
          </Link>
        )}
        {next && (
          <Link href={next.href}>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-3 px-3 py-4 h-auto w-[50px] btn-press hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all"
            >
              <ArrowDown className="h-5 w-5 flex-shrink-0" />
              <span className="text-xs text-center leading-tight line-clamp-3" style={{ writingMode: 'vertical-rl' }}>{next.title}</span>
            </Button>
          </Link>
        )}
      </nav>
    </div>
  )
}
