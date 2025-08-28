import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Target, PenTool, Trophy, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8 md:p-12">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
            <Sparkles className="h-4 w-4" />
            <span>系统化学习 · 高效备考</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            系统架构设计师
            <br />
            <span className="text-3xl md:text-4xl">软考学习平台</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            全面覆盖15个章节知识点，结合历年真题分析和案例特训，
            帮助您系统地准备系统架构设计师考试。
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link href="/docs/1-1">
              <Button size="lg" className="gap-2">
                开始学习
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs/14-1">
              <Button variant="outline" size="lg">
                查看考纲
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/docs/1-1" className="group">
          <div className="relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">学习资料</h3>
              <p className="text-muted-foreground mb-4">
                15个章节的完整学习内容，涵盖考试所有知识点
              </p>
              <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                开始学习
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/docs/1-1" className="group">
          <div className="relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">考试指南</h3>
              <p className="text-muted-foreground mb-4">
                了解考试形式、备考策略和答题技巧
              </p>
              <div className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400">
                查看指南
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/docs/14-1" className="group">
          <div className="relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 mb-4">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">案例分析</h3>
              <p className="text-muted-foreground mb-4">
                历年真题分析与解答技巧专题训练
              </p>
              <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                案例特训
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/docs/15-1" className="group">
          <div className="relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 mb-4">
                <PenTool className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">论文写作</h3>
              <p className="text-muted-foreground mb-4">
                论文写作技巧与高分范文解析
              </p>
              <div className="flex items-center text-sm font-medium text-orange-600 dark:text-orange-400">
                论文技巧
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Study Tips */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted to-muted/50 p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-yellow-500/10 to-transparent blur-3xl" />
        <div className="relative">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
            学习建议
          </h2>
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <p className="text-muted-foreground">
                建议按照章节顺序系统学习，每天保持2-3小时的学习时间
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">2</span>
              </div>
              <p className="text-muted-foreground">
                重点关注第5章软件架构设计和第11章数据库系统
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-green-600 dark:text-green-400">3</span>
              </div>
              <p className="text-muted-foreground">
                案例分析和论文写作需要大量练习，建议提前准备
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400">4</span>
              </div>
              <p className="text-muted-foreground">
                定期复习已学内容，做好笔记总结
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
