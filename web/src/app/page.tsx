import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          欢迎使用系统架构设计师学习平台
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          本平台提供完整的系统架构设计师考试学习资料，帮助您系统地准备软考。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-2">📚 学习资料</h2>
          <p className="text-muted-foreground mb-4">
            15个章节的完整学习内容，涵盖考试所有知识点
          </p>
          <Link href="/docs/1-1">
            <Button>开始学习</Button>
          </Link>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-2">🎯 考试指南</h2>
          <p className="text-muted-foreground mb-4">
            了解考试形式、备考策略和答题技巧
          </p>
          <Link href="/docs/1-1">
            <Button variant="outline">查看指南</Button>
          </Link>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-2">💡 案例分析</h2>
          <p className="text-muted-foreground mb-4">
            历年真题分析与解答技巧专题训练
          </p>
          <Link href="/docs/14-1">
            <Button variant="outline">案例特训</Button>
          </Link>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-2">✍️ 论文写作</h2>
          <p className="text-muted-foreground mb-4">
            论文写作技巧与高分范文解析
          </p>
          <Link href="/docs/15-1">
            <Button variant="outline">论文技巧</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h2 className="text-xl font-semibold mb-3">学习建议</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• 建议按照章节顺序系统学习，每天保持2-3小时的学习时间</li>
          <li>• 重点关注第5章软件架构设计和第11章数据库系统</li>
          <li>• 案例分析和论文写作需要大量练习，建议提前准备</li>
          <li>• 定期复习已学内容，做好笔记总结</li>
        </ul>
      </div>
    </div>
  );
}
