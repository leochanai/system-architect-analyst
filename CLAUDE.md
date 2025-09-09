# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a System Architect and System Analyst exam study platform built with:
- **Runtime**: Bun (NOT Node.js)
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Build System**: Custom Bun build script with HTML imports

## Development Commands

### Core Commands
```bash
# Install dependencies (use Bun, NOT npm/yarn/pnpm)
bun install

# Start development server with hot reload
bun dev
# or
bun --hot src/index.tsx

# Production build
bun run build

# Start production server
bun start
```

### Testing
```bash
# Run all tests
bun test

# Run tests matching pattern
bun test <pattern>

# Run with coverage
bun test --coverage

# Update snapshots
bun test -u
```

### Build Options
The build script (`build.ts`) supports many CLI options:
```bash
# Custom output directory
bun run build.ts --outdir=dist

# With source maps and minification
bun run build.ts --minify --source-map=linked

# See all options
bun run build.ts --help
```

## Architecture

### Server Architecture
- **Entry Point**: `src/index.tsx` - Bun server with HTML imports
- **Routes**: Defined in `src/index.tsx` using Bun.serve() routes object
- **API Pattern**: `/api/*` routes for backend functionality
- **Static Serving**: HTML files are imported directly and served as routes

### Frontend Architecture
- **Entry**: `src/index.html` → `src/frontend.tsx` → `src/App.tsx`
- **Components**: Located in `src/components/` using shadcn/ui
- **Utilities**: `src/lib/utils.ts` for class merging utilities
- **Styling**: Global styles in `styles/globals.css`, component styles use Tailwind classes

### Key Technical Decisions
1. **HTML Imports**: Uses Bun's native HTML import feature instead of traditional bundlers like Vite
2. **Hot Module Replacement**: Built-in HMR support through `import.meta.hot`
3. **No Build Step for Dev**: Development server runs TypeScript/JSX directly through Bun
4. **Tailwind Plugin**: Uses `bun-plugin-tailwind` for CSS processing

## API Routes Structure

Current API endpoints (defined in `src/index.tsx`):
- `GET /api/hello` - Returns hello message
- `PUT /api/hello` - Returns hello message with PUT method
- `GET /api/hello/:name` - Returns personalized greeting

## Important Bun-Specific Patterns

### File Operations
```typescript
// Use Bun.file instead of fs.readFile/writeFile
const file = Bun.file("path/to/file");
const content = await file.text();
```

### Testing Pattern
```typescript
import { test, expect } from "bun:test";

test("description", () => {
  expect(value).toBe(expected);
});
```

### Environment Variables
- Automatically loaded from `.env` files (no dotenv needed)
- Access via `process.env.VARIABLE_NAME`
- Production mode: `NODE_ENV=production bun src/index.tsx`

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

1. **Always use Bun commands** - Never fallback to npm/yarn/pnpm
2. **Hot reload is automatic** in development with `--hot` flag
3. **TypeScript imports** can use `.ts`/`.tsx` extensions directly
4. **API routes** should be added to the routes object in `src/index.tsx`
5. **HTML imports** enable direct React component loading without complex bundler configs
