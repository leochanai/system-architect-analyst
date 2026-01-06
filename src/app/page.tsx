import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Target, PenTool, Trophy, ArrowRight, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section - 蓝图美学 */}
      <section className="relative mb-16">
        {/* 章节编号装饰 */}
        <div className="chapter-number">00</div>

        {/* 主标题区 */}
        <div className="relative pt-8">
          {/* 顶部标签 */}
          <div className="flex items-center gap-3 mb-6">
            <span className="tag">SYSTEM ARCHITECT</span>
            <span className="text-muted-foreground text-sm font-mono">v2026</span>
          </div>

          {/* 主标题 */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight mb-4 animate-slide-in-left">
            系统架构设计师
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light mb-6">
            软考学习平台
          </p>

          {/* 描述 */}
          <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            全面覆盖 <span className="text-primary font-mono">15</span> 个章节知识点，
            结合历年真题分析和案例特训，帮助您系统地准备系统架构设计师考试。
          </p>

          {/* CTA 按钮 */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/docs/1-1">
              <Button size="lg" className="gap-2 btn-press">
                开始学习
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs/14-1">
              <Button variant="outline" size="lg" className="btn-press">
                查看考纲
              </Button>
            </Link>
          </div>
        </div>

        {/* 装饰分隔线 */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-border"></div>
          <Layers className="h-4 w-4 text-primary opacity-50" />
          <div className="h-px flex-1 bg-border"></div>
        </div>
      </section>

      {/* Feature Cards - 功能模块 */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-container">
          {/* 学习资料卡片 */}
          <Link href="/docs/1-1" className="group">
            <div className="relative blueprint-border bg-card p-6 card-hover">
              <div className="diagonal-accent"></div>
              <div className="relative">
                {/* 图标 */}
                <div className="inline-flex h-12 w-12 items-center justify-center border border-primary/30 text-primary mb-4">
                  <BookOpen className="h-5 w-5" />
                </div>
                {/* 编号 */}
                <span className="absolute top-0 right-0 font-mono text-xs text-muted-foreground opacity-50">01</span>
                {/* 标题 */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  学习资料
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  15 个章节的完整学习内容，涵盖考试所有知识点
                </p>
                {/* 链接 */}
                <div className="flex items-center text-sm font-medium text-primary">
                  <span className="font-mono">START</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* 考试指南卡片 */}
          <Link href="/docs/1-1" className="group">
            <div className="relative blueprint-border bg-card p-6 card-hover">
              <div className="diagonal-accent"></div>
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center border border-primary/30 text-primary mb-4">
                  <Target className="h-5 w-5" />
                </div>
                <span className="absolute top-0 right-0 font-mono text-xs text-muted-foreground opacity-50">02</span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  考试指南
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  了解考试形式、备考策略和答题技巧
                </p>
                <div className="flex items-center text-sm font-medium text-primary">
                  <span className="font-mono">VIEW</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* 案例分析卡片 */}
          <Link href="/docs/14-1" className="group">
            <div className="relative blueprint-border bg-card p-6 card-hover">
              <div className="diagonal-accent"></div>
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center border border-primary/30 text-primary mb-4">
                  <Trophy className="h-5 w-5" />
                </div>
                <span className="absolute top-0 right-0 font-mono text-xs text-muted-foreground opacity-50">03</span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  案例分析
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  历年真题分析与解答技巧专题训练
                </p>
                <div className="flex items-center text-sm font-medium text-primary">
                  <span className="font-mono">PRACTICE</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* 论文写作卡片 */}
          <Link href="/docs/15-1" className="group">
            <div className="relative blueprint-border bg-card p-6 card-hover">
              <div className="diagonal-accent"></div>
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center border border-primary/30 text-primary mb-4">
                  <PenTool className="h-5 w-5" />
                </div>
                <span className="absolute top-0 right-0 font-mono text-xs text-muted-foreground opacity-50">04</span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  论文写作
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  论文写作技巧与高分范文解析
                </p>
                <div className="flex items-center text-sm font-medium text-primary">
                  <span className="font-mono">LEARN</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Study Tips Section - 学习建议 */}
      <section className="relative">
        <div className="chapter-number" style={{ opacity: 0.02 }}>TIP</div>

        <div className="blueprint-border bg-card p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-primary animate-pulse"></span>
            学习建议
          </h2>

          <div className="grid gap-4 stagger-container">
            {[
              { num: "01", text: "建议按照章节顺序系统学习，每天保持 2-3 小时的学习时间" },
              { num: "02", text: "重点关注第5章软件架构设计和第11章数据库系统" },
              { num: "03", text: "案例分析和论文写作需要大量练习，建议提前准备" },
              { num: "04", text: "定期复习已学内容，做好笔记总结" },
            ].map((tip) => (
              <div key={tip.num} className="flex items-start gap-4 group">
                <span className="font-mono text-xs text-primary opacity-60 pt-1 w-6 flex-shrink-0">
                  {tip.num}
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
