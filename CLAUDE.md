# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ZDB Innovation Area - An educational technology platform for discovering and showcasing digital education innovations in Germany. Built with Lovable (changes pushed here sync with the Lovable editor).

## Commands

```bash
npm run dev          # Start dev server at http://localhost:8080
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # ESLint for TypeScript/React
npm run preview      # Preview production build
```

## Tech Stack

- React 18 + TypeScript + Vite (with SWC)
- Tailwind CSS + shadcn-ui (30+ Radix UI components in `src/components/ui/`)
- React Router v6 for routing
- TanStack React Query for data fetching
- React Hook Form + Zod for forms

## Architecture

### Routing Structure (src/App.tsx)
```
/                        → Landing page
/policy                  → Policy papers
/innovations             → Innovation listing
/innovations/:id         → Innovation detail
/events                  → Events listing
/roadshow                → Roadshow info
/apply/*                 → Protected application flow (ProtectedRoute wrapper)
/dashboard               → Protected user dashboard
```

### Key Directories
- `src/pages/` - Route components
- `src/components/` - Shared components, with `ui/` containing shadcn-ui primitives
- `src/contexts/` - AuthContext (localStorage session) and LanguageContext (i18n)
- `src/data/` - Static data (innovations, logos)
- `src/hooks/` - Custom hooks (use-toast, use-mobile)
- `src/lib/utils.ts` - Tailwind class merging utility (`cn()`)

### Internationalization

Custom i18n via LanguageContext - supports German (de) and English (en). Use the `t()` function from `useLanguage()` hook for translations. Translation keys are defined inline in LanguageContext.tsx.

### Authentication

Simple localStorage-based auth in AuthContext. No backend - user sessions persist in browser storage only.

### Design System

CSS variables defined in `src/index.css`:
- Primary: Deep Blue (#2C5F7C)
- Secondary: Green (#48BB78)
- Accent: Amber (#F59E0B)
- Fonts: Poppins (headings), Inter (body)

Badge category colors configured in `tailwind.config.ts`: AI, VR, Assessment, Management, Content.

## Path Alias

`@/*` resolves to `src/*` (configured in tsconfig.json and vite.config.ts).
