import Link from "next/link"
import { Layers } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Logo 图标 - 几何线条风格 */}
      <div className="relative">
        <div className="w-10 h-10 border-2 border-primary flex items-center justify-center">
          <Layers className="w-5 h-5 text-primary" />
        </div>
        {/* 角落装饰 */}
        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-r border-b border-primary"></div>
      </div>

      {/* 文字 */}
      <div className="flex flex-col">
        <span className="text-base font-bold text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors">
          系统架构设计师
        </span>
        <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
          System Architect
        </span>
      </div>
    </Link>
  )
}
