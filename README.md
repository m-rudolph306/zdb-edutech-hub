# ZDB Innovation Area

A multi-persona platform for discovering, showcasing, and managing digital education innovations in Germany.

## Overview

The ZDB Innovation Area connects educational technology innovators with German state education ministries, politicians, and the public. The platform supports three distinct user roles:

- **Innovators**: Submit and showcase educational innovations, apply to events
- **Administrators (ZDB Staff)**: Manage users, applications, events, and roadshow inquiries
- **Politicians**: Read-only dashboard with innovation ecosystem overview

## Features

- Bilingual support (German/English) with complete i18n coverage
- Role-based access control with protected routes
- Innovation submission and management workflow
- Event application system
- Roadshow inquiry management
- Admin dashboard with user, application, and event management
- Responsive design optimized for all devices

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite (with SWC)
- **Styling**: Tailwind CSS + shadcn/ui (30+ Radix UI components)
- **Routing**: React Router v6
- **State/Data**: TanStack React Query, React Hook Form + Zod
- **Storage**: localStorage (MVP - backend-ready architecture)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/zdb-edutech-hub.git
cd zdb-edutech-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run build:dev` | Development build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── components/       # Shared components
│   └── ui/          # shadcn/ui primitives
├── contexts/        # React contexts (Auth, Language)
├── data/            # Static data and types
├── hooks/           # Custom React hooks
├── lib/             # Utilities
├── pages/           # Route components
│   ├── admin/       # Admin dashboard pages
│   └── politician/  # Politician dashboard pages
└── App.tsx          # Main app with routing

public/
└── logos/           # State and partner logos
    └── states/      # German federal state ministry logos
```

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/innovations` | Public | Innovation listing |
| `/events` | Public | Events calendar |
| `/dashboard` | Authenticated | User dashboard |
| `/dashboard/submit-innovation` | Innovator | Submit new innovation |
| `/admin/*` | Admin | Admin management dashboard |
| `/overview` | Politician | Read-only ecosystem overview |

## Design System

The platform uses a custom design system with CSS variables:

- **Primary**: Deep Blue (#2C5F7C)
- **Secondary**: Green (#48BB78)
- **Accent**: Amber (#F59E0B)
- **Typography**: Poppins (headings), Inter (body)

## Deployment

The project is configured for deployment on Vercel:

```bash
npm run build
# Deploy dist/ folder
```

## Development Notes

- All user-facing text uses the `t()` function for i18n
- Role-based routes use `<ProtectedRoute requiredRole="...">` wrapper
- Data persists in localStorage with keys: `user`, `users`, `signupRequests`, `application_IA-*`, `innovation_INV-*`, `roadshow_RW-*`

## Contributing

1. Create a feature branch
2. Make changes
3. Ensure `npm run build` passes
4. Submit a pull request

## License

Private - All rights reserved
