# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a System Architect and System Analyst exam study platform built with:
- **Framework**: Next.js 15.5.2 with App Router
- **Runtime**: Bun (preferred) or Node.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Content**: MDX for documentation rendering

## Development Commands

### Core Commands
```bash
# Install dependencies (prefer Bun over npm/yarn/pnpm)
bun install

# Start development server with Turbopack
bun dev

# Production build
bun run build

# Start production server
bun start

# Lint code
bun lint
```

### Next.js Commands
```bash
# Development with Turbopack (fast refresh)
bun dev
# or with standard webpack
bun dev --no-turbo

# Build for production
bun run build

# Analyze bundle size
bun run build -- --analyze
```

## Architecture

### Application Structure
- **Framework**: Next.js 15 with App Router
- **Pages**: Located in `src/app/` using file-based routing
- **Components**: Located in `src/components/` using shadcn/ui
- **Utilities**: `src/lib/utils.ts` for class merging utilities
- **Styling**: Global styles in `src/app/globals.css`, component styles use Tailwind classes

### Key Routes
- `/` - Home page with navigation to study materials
- `/docs/[slug]` - Dynamic route for displaying documentation chapters

### Key Technical Features
1. **Turbopack**: Fast bundler for development (enabled by default)
2. **MDX Support**: Render Markdown with React components
3. **App Router**: Modern Next.js routing with layouts and server components
4. **Tailwind CSS v4**: Latest version with improved performance

## API Routes Structure

API routes can be added in `src/app/api/` directory using Route Handlers:
- Create `route.ts` files for API endpoints
- Support for GET, POST, PUT, DELETE, etc.
- Full TypeScript support with type-safe request/response

## Important Patterns

### Environment Variables
- Automatically loaded from `.env.local` files
- Public variables must be prefixed with `NEXT_PUBLIC_`
- Server-only variables are accessible in server components

### File Operations (when using Bun)
```typescript
// Use Bun.file for better performance
const file = Bun.file("path/to/file");
const content = await file.text();
```

### MDX Content Loading
- Markdown files in `docs/` directory
- Dynamically loaded and rendered in `/docs/[slug]` route
- Support for frontmatter metadata

## Component Development

### Adding shadcn/ui Components
The project is configured for shadcn/ui with:
- Style: new-york
- Base color: zinc
- CSS variables enabled
- Aliases configured in `components.json`

### Path Aliases
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`

## Documentation Content

The `docs/` directory contains comprehensive study materials for System Architect and System Analyst exams, organized by chapters covering:
- Exam strategies and preparation
- System engineering fundamentals
- Software engineering practices
- Project management
- System architecture and design patterns
- Databases and networking
- Emerging technologies (AI, IoT, Big Data)
- Legal and standards topics

## Development Tips

1. **Prefer Bun over npm/yarn/pnpm** for better performance
2. **Turbopack is enabled by default** for faster development builds
3. **Use App Router conventions** - layouts, loading states, error boundaries
4. **API routes** should be created in `src/app/api/` directory
5. **Server Components by default** - use `'use client'` directive when needed
6. **MDX for documentation** - supports React components in Markdown
