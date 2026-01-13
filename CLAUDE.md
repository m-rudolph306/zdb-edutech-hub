# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ZDB Innovation Area - A multi-persona educational technology platform for discovering and showcasing digital education innovations in Germany. Supports three user roles: Innovators, Administrators, and Politicians.

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
/                              → Landing page
/policy                        → Policy papers
/innovations                   → Innovation listing
/innovations/:id               → Innovation detail
/events                        → Events listing
/roadshow                      → Roadshow info
/press                         → Press/media page
/statutes                      → Organization statutes
/donate                        → Donation information
/contact                       → Contact form
/apply/*                       → Protected application flow
/dashboard                     → Protected user dashboard
/dashboard/submit-innovation   → Innovation submission (innovator only)
/profile                       → User profile settings
/admin/*                       → Admin dashboard (admin only)
/overview                      → Politician dashboard (politician only)
```

### Key Directories
- `src/pages/` - Route components
- `src/pages/admin/` - Admin dashboard pages
- `src/pages/politician/` - Politician dashboard pages
- `src/components/` - Shared components, with `ui/` containing shadcn-ui primitives
- `src/contexts/` - AuthContext (role-based auth) and LanguageContext (i18n)
- `src/data/` - Static data (innovations, logos)
- `src/hooks/` - Custom hooks (use-toast, use-mobile)
- `src/lib/utils.ts` - Tailwind class merging utility (`cn()`)

### Internationalization

Custom i18n via LanguageContext - supports German (de) and English (en). Use the `t()` function from `useLanguage()` hook for translations. Translation keys are defined inline in LanguageContext.tsx.

### Authentication

Role-based localStorage auth in AuthContext with three roles:
- `innovator` - Default role, can submit innovations and applications
- `admin` - Full access to admin dashboard for managing users/applications/events
- `politician` - Read-only access to ecosystem overview

Use `<ProtectedRoute requiredRole="...">` for role-restricted routes.

### Design System

CSS variables defined in `src/index.css`:
- Primary: Deep Blue (#2C5F7C)
- Secondary: Green (#48BB78)
- Accent: Amber (#F59E0B)
- Fonts: Poppins (headings), Inter (body)

Badge category colors configured in `tailwind.config.ts`: AI, VR, Assessment, Management, Content.

## Path Alias

`@/*` resolves to `src/*` (configured in tsconfig.json and vite.config.ts).

## Data Storage

localStorage keys:
- `user` - Current logged-in user
- `users` - Registered users
- `signupRequests` - Pending/approved/rejected signup requests
- `profile_{userId}` - User profile data
- `application_IA-*` - Event applications
- `innovation_INV-*` - Submitted innovations
- `roadshow_RW-*` - Roadshow inquiries
- `events` - Events data (admin-managed)
