import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "系统架构设计师软考学习平台",
  description: "系统架构设计师考试学习指南与资料",
  keywords: "系统架构设计师,软考,学习平台,考试指南",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReadingProgress />
        <div className="flex h-screen">
          {/* 侧边栏 */}
          <aside className="w-80 border-r bg-background/95 backdrop-blur-sm">
            <SidebarNav />
          </aside>
          {/* 主内容区 */}
          <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-muted/20">
            <div className="container mx-auto py-6 px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
