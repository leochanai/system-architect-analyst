# 系统架构设计师软考学习平台

基于 Next.js + shadcn/ui 构建的系统架构设计师考试学习网站，支持 Markdown 文档渲染和中文图片资源。

## 🚀 功能特性

- ✅ **完整的章节导航**：16 个章节，覆盖系统架构设计师考试所有知识点
- ✅ **Markdown 文档渲染**：支持 Obsidian 风格的图片引用语法
- ✅ **中文文件名支持**：通过 API 路由解决中文图片文件名编码问题
- ✅ **响应式设计**：适配各种设备屏幕
- ✅ **暗色模式支持**：支持明暗主题切换
- ✅ **上下文导航**：文档页面提供上一篇/下一篇快速导航

## 📦 技术栈

- **框架**：Next.js 15.5.2 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS v4
- **UI 组件**：shadcn/ui
- **包管理**：Bun
- **Markdown**：react-markdown + remark-gfm

## 🏗️ 项目结构

```
system-architect-analyst/
├── docs/                    # Markdown 文档目录
│   ├── 第 1 章 考试介绍及备考攻略/
│   │   ├── 1.1 架构师考试的相关情况.md
│   │   └── 1.2 架构师考试备考攻略.md
│   └── ...
├── images/                  # 图片资源目录
│   ├── 第 1 章 考试介绍及备考攻略/
│   │   └── *.jpg
│   └── ...
└── web/                     # Next.js 网站
    ├── src/
    │   ├── app/
    │   │   ├── api/image/   # 图片服务 API
    │   │   ├── docs/[slug]/ # 文档动态路由
    │   │   ├── layout.tsx   # 全局布局
    │   │   └── page.tsx     # 首页
    │   ├── components/
    │   │   ├── markdown-content.tsx  # Markdown 渲染组件
    │   │   ├── sidebar-nav.tsx       # 侧边栏导航
    │   │   └── ui/                   # shadcn/ui 组件
    │   └── lib/
    │       ├── markdown.ts   # Markdown 处理工具
    │       └── navigation.ts # 导航数据
    └── package.json
```

## 🚀 快速开始

### 安装依赖

```bash
cd web
bun install
```

### 启动开发服务器

```bash
bun dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
bun run build
```

### 运行生产服务器

```bash
bun start
```

## 📝 内容编辑

### 添加/修改文档

1. 在 `docs` 目录对应章节下编辑 `.md` 文件
2. 支持 YAML frontmatter 元数据
3. 图片使用 Obsidian 语法：`![[图片名.jpg]]`

### 添加图片

1. 将图片放在 `images` 目录对应章节子目录下
2. 文件名可以包含中文
3. 在 Markdown 中使用 `![[文件名.jpg]]` 引用

### 修改导航菜单

编辑 `web/src/lib/navigation.ts` 文件更新章节和文档链接。

## 🔧 配置说明

### 图片服务 API

`/api/image` 路由处理中文文件名的图片请求：
- 自动搜索 `images` 目录下的所有子目录
- 支持缓存优化（Cache-Control）
- 根据文件扩展名设置正确的 Content-Type

### Markdown 处理

- 自动转换 Obsidian 图片语法为标准 Markdown
- 支持 GFM（GitHub Flavored Markdown）
- 自定义组件样式渲染

## 🎨 自定义样式

### 修改主题颜色

编辑 `web/src/app/globals.css` 中的 CSS 变量。

### 修改 Markdown 样式

编辑 `web/src/components/markdown-content.tsx` 中的组件样式。

## 📌 注意事项

1. **图片路径**：确保图片文件名与 Markdown 中引用的名称完全一致
2. **文档映射**：新增文档需要在 `web/src/lib/markdown.ts` 的 `chapterMap` 中添加映射
3. **性能优化**：生产环境建议使用 `bun run build` 进行静态生成

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
