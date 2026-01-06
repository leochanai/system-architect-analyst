import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { SidebarNav } from "@/components/sidebar-nav";
import { ReadingProgress } from "@/components/reading-progress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Noto Sans SC - 思源黑体，更适合正文和标题阅读
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "系统架构设计师 | 软考学习平台",
  description: "系统架构设计师考试学习指南与资料 - 蓝图美学设计",
  keywords: "系统架构设计师,软考,学习平台,考试指南,架构师",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${notoSansSC.variable} antialiased`}
      >
        <ReadingProgress />
        <div className="flex h-screen">
          {/* 侧边栏 */}
          <aside className="w-80 border-r border-sidebar-border bg-sidebar flex-shrink-0">
            <SidebarNav />
          </aside>
          {/* 主内容区 - 带网格纹理 */}
          <main className="flex-1 overflow-auto bg-background bg-grid bg-noise">
            <div className="container mx-auto py-8 px-10 max-w-5xl">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
