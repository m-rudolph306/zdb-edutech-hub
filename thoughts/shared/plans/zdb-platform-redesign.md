# Implementation Plan: ZDB EduTech Hub Platform Redesign

**Generated:** 2026-01-12
**Project:** ZDB Innovation Area - Multi-Persona Platform
**Status:** Ready for Implementation

---

## Executive Summary

This plan transforms the ZDB EduTech Hub from a single-user educational showcase into a multi-persona platform supporting three distinct user types: Innovators, ZDB Staff (Admins), and Politicians. The redesign maintains the existing React/TypeScript/Vite stack while adding role-based access control, admin dashboards, and comprehensive German-first i18n coverage.

---

## 1. Current State Analysis

### 1.1 Existing Architecture

**Tech Stack (Confirmed):**
- React 18 + TypeScript + Vite (SWC)
- Tailwind CSS + shadcn-ui (30+ Radix components)
- React Router v6 for routing
- TanStack React Query (available but underutilized)
- React Hook Form + Zod (available)

**Current Routes:**
| Route | Page | Auth Required | i18n Status |
|-------|------|---------------|-------------|
| `/` | Home | No | Partial |
| `/policy` | Policy papers | No | Partial |
| `/innovations` | Innovation listing | No | Partial |
| `/innovations/:id` | Innovation detail | No | Partial |
| `/events` | Events listing | No | Good |
| `/roadshow` | Roadshow inquiry | No | Partial |
| `/apply` | How to apply | No | Partial (hardcoded German) |
| `/apply/select-event` | Select event | Yes | Partial |
| `/apply/form` | Application form | Yes | Partial |
| `/apply/confirmation` | Confirmation | Yes | Partial |
| `/dashboard` | User dashboard | Yes | Missing translations |

**Missing Routes (referenced in Navigation but 404):**
- `/press` - Press page (topbar link)
- `/statutes` - Statutes page (topbar link)
- `/donate` - Donate page (topbar link)
- `/contact` - Contact page (topbar link)
- `/profile` - Profile settings (user dropdown)

### 1.2 Authentication System

**Current Implementation (`src/contexts/AuthContext.tsx`):**
- Simple localStorage-based sessions
- User object: `{ id, email, companyName }`
- `checkApprovalStatus()` function exists but only checks `signupRequests`
- No role differentiation (all users treated equally)

**Signup Flow (`src/components/SignupRequestModal.tsx`):**
- Creates `SignupRequest` with status: `pending | approved | rejected`
- Stores in `localStorage.signupRequests`
- Manual approval required (currently no admin interface)

### 1.3 i18n System

**Current Implementation (`src/contexts/LanguageContext.tsx`):**
- Inline translations object with `de` and `en` keys
- ~150 translation keys defined
- `t()` function returns key if translation missing
- Language persisted to localStorage

**Coverage Gaps:**
- Dashboard page: All text hardcoded in English
- HowToApply page: All text hardcoded in German (no EN)
- NotFound page: Hardcoded English
- Many form labels not translated
- Roadshow page: Many keys missing from translations object

### 1.4 Data Storage

**Current localStorage Keys:**
- `user` - Current logged-in user
- `users` - Array of registered users
- `signupRequests` - Pending/approved/rejected signup requests
- `application_IA-*` - Event applications
- `roadshow_RW-*` - Roadshow inquiries
- `language` - Selected language (de/en)

### 1.5 Asset Status

**Logos:**
- `/public/logos/states/` - 18 SVG files present (all German states + KMK + BMBF)
- `/public/logos/partners/` - **MISSING** directory (referenced in PartnersSection.tsx)

---

## 2. Gap Analysis

### 2.1 Persona Requirements vs Current State

| Requirement | Current | Gap |
|-------------|---------|-----|
| **Innovator** | | |
| Account registration | Partial (SignupRequestModal) | Need approval workflow visibility |
| Showcase innovations | None | Need innovator profile + innovation submission |
| Apply to events | Yes (ApplicationForm) | Works |
| Personal dashboard | Partial | Need application status tracking improvements |
| **ZDB Staff** | | |
| Central admin dashboard | None | New feature needed |
| Approve/reject accounts | None | New feature needed |
| Approve/reject applications | None | New feature needed |
| Event management | None | New feature needed |
| Manage roadshow inquiries | Partial (in Dashboard) | Need dedicated admin view |
| **Politicians** | | |
| Read-only dashboard | None | New feature needed |
| Browse innovations | Yes (Innovations page) | Works but no filtering by status |
| Events calendar | Partial | Need calendar view |

### 2.2 Cross-Cutting Gaps

| Requirement | Current State | Gap |
|-------------|---------------|-----|
| German-first i18n | Inconsistent | ~40% of pages need German translations |
| DE/EN toggle everywhere | Present in Navigation | Works but translations incomplete |
| No dead ends | 5 broken links in navigation | Need pages: /press, /statutes, /donate, /contact, /profile |
| Uniform visuals | Good consistency | NotFound page needs redesign |
| Partner images | Missing | `/public/logos/partners/` directory missing |

---

## 3. Implementation Phases

### Phase 1: Foundation (Estimated: 3-5 days)

**Goal:** Fix broken links, complete i18n coverage, add role system to auth.

#### 1.1 Create Missing Static Pages

**Files to create:**
- `src/pages/Press.tsx` - Press/media page
- `src/pages/Statutes.tsx` - Organization statutes
- `src/pages/Donate.tsx` - Donation information
- `src/pages/Contact.tsx` - Contact form/info
- `src/pages/Profile.tsx` - User profile settings

**Update routing (`src/App.tsx`):**
```tsx
// Add these routes before the catch-all
<Route path="/press" element={<Press />} />
<Route path="/statutes" element={<Statutes />} />
<Route path="/donate" element={<Donate />} />
<Route path="/contact" element={<Contact />} />
<Route path="/profile" element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
} />
```

**Acceptance criteria:**
- [x] All 5 navigation links resolve to real pages
- [x] Pages use Navigation + Footer components
- [x] Pages have both DE and EN translations

#### 1.2 Complete i18n Coverage

**Files to modify:**
- `src/contexts/LanguageContext.tsx` - Add missing translation keys

**Translation keys to add:**
```typescript
// Dashboard page (currently all English)
"dashboard.welcome": "Willkommen zurück",
"dashboard.subtitle": "Verwalten Sie Ihre Bewerbungen...",
"dashboard.stats.totalApplications": "Bewerbungen gesamt",
"dashboard.stats.pendingReview": "In Prüfung",
"dashboard.stats.upcomingEvents": "Kommende Events",
"dashboard.myApplications": "Meine Bewerbungen",
"dashboard.noApplications": "Sie haben noch keine Bewerbungen eingereicht",
"dashboard.quickActions": "Schnellaktionen",
"dashboard.editProfile": "Profil bearbeiten",
"dashboard.viewAllEvents": "Alle Events ansehen",
"dashboard.browseInnovations": "Innovationen durchsuchen",
"dashboard.recommendedEvents": "Empfohlene Events",
"dashboard.applyToNewEvent": "Für neues Event bewerben",

// HowToApply page (currently hardcoded German, needs EN)
"apply.hero.title": "Teil der Innovation Area werden",
"apply.hero.subtitle": "Prasentieren Sie Ihre Bildungstechnologie...",
// ... (50+ keys needed)

// NotFound page
"notFound.title": "404",
"notFound.subtitle": "Seite nicht gefunden",
"notFound.returnHome": "Zur Startseite",

// New pages
"press.title": "Presse",
"statutes.title": "Satzung",
"donate.title": "Spenden",
"contact.title": "Kontakt",
"profile.title": "Profil bearbeiten",
```

**Files to modify for translation integration:**
- `src/pages/Dashboard.tsx` - Replace hardcoded strings with `t()` calls
- `src/pages/HowToApply.tsx` - Add EN translations
- `src/pages/NotFound.tsx` - Redesign with Navigation/Footer + translations

**Acceptance criteria:**
- [x] All user-visible text uses `t()` function
- [x] Language toggle switches all text on all pages
- [x] No hardcoded German or English strings remain

#### 1.3 Add Role-Based Authentication

**Modify `src/contexts/AuthContext.tsx`:**

```typescript
// Add role type
type UserRole = "innovator" | "admin" | "politician";

interface User {
  id: string;
  email: string;
  companyName: string;
  role: UserRole;  // NEW
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;       // NEW
  isPolitician: boolean;  // NEW
  isInnovator: boolean;   // NEW
  login: (email: string, companyName: string) => void;
  logout: () => void;
  checkApprovalStatus: (email: string) => ApprovalStatus;
}
```

**Modify `src/components/SignupRequestModal.tsx`:**
- Add role selection (dropdown with Innovator default)
- Store role in signup request

**Acceptance criteria:**
- [x] User interface shows role selection during signup
- [x] Role persisted in localStorage
- [x] `isAdmin`, `isPolitician`, `isInnovator` booleans available in context

#### 1.4 Fix Partner Logos

**Create directory and placeholder:**
```bash
mkdir -p public/logos/partners
```

**Either:**
- a) Add actual partner SVG logos, OR
- b) Update `PartnersSection.tsx` to handle missing images gracefully (already has fallback but could be improved)

**Acceptance criteria:**
- [x] Partner logos display or show graceful fallback
- [x] Directory created, graceful fallback shows partner name

---

### Phase 2: Innovator Dashboard Enhancement (Estimated: 2-3 days)

**Goal:** Complete the innovator experience with profile management and innovation showcase.

#### 2.1 User Profile Page

**Create `src/pages/Profile.tsx`:**
- Company information edit form
- Contact details management
- Innovation listing (if any submitted)
- Account status display

**Form fields:**
- Company name
- Contact person
- Email
- Website
- Short description
- Logo upload (localStorage as base64 for MVP)

**Acceptance criteria:**
- [ ] User can edit their profile information
- [ ] Changes persist to localStorage
- [ ] Form validates required fields
- [ ] Both DE and EN translations

#### 2.2 Innovation Submission (Innovator-only)

**Create `src/pages/SubmitInnovation.tsx`:**
- Form for submitting new innovations
- Fields matching `Innovation` interface in `src/data/innovations.ts`
- Status: draft | pending | approved | rejected

**Modify `src/data/innovations.ts`:**
- Add `submittedBy` field (user ID)
- Add `status` field
- Add `createdAt` field

**Create localStorage key pattern:** `innovation_INV-{id}`

**Add route:**
```tsx
<Route path="/dashboard/submit-innovation" element={
  <ProtectedRoute requiredRole="innovator">
    <SubmitInnovation />
  </ProtectedRoute>
} />
```

**Acceptance criteria:**
- [ ] Innovators can submit new innovations
- [ ] Submission creates pending innovation in localStorage
- [ ] Innovation appears in user's dashboard
- [ ] Form has proper validation

#### 2.3 Enhanced Dashboard for Innovators

**Modify `src/pages/Dashboard.tsx`:**
- Add "My Innovations" section
- Show innovation status (pending/approved/rejected)
- Show application statuses with more detail
- Add profile completion indicator

**Acceptance criteria:**
- [ ] Dashboard shows user's submitted innovations
- [ ] Innovation status clearly displayed
- [ ] Dashboard fully translated DE/EN

---

### Phase 3: Admin Dashboard (Estimated: 4-6 days)

**Goal:** Create comprehensive admin interface for ZDB Staff.

#### 3.1 Admin Dashboard Shell

**Create `src/pages/admin/AdminDashboard.tsx`:**
- Overview statistics (users, applications, events, roadshow inquiries)
- Quick action cards
- Recent activity feed
- Navigation to sub-sections

**Create `src/pages/admin/AdminLayout.tsx`:**
- Sidebar navigation for admin sections
- Breadcrumb navigation
- Admin-specific header

**Add routes:**
```tsx
<Route path="/admin" element={
  <ProtectedRoute requiredRole="admin">
    <AdminLayout />
  </ProtectedRoute>
}>
  <Route index element={<AdminDashboard />} />
  <Route path="users" element={<AdminUsers />} />
  <Route path="applications" element={<AdminApplications />} />
  <Route path="innovations" element={<AdminInnovations />} />
  <Route path="events" element={<AdminEvents />} />
  <Route path="roadshow" element={<AdminRoadshow />} />
</Route>
```

**Acceptance criteria:**
- [ ] Admin dashboard accessible only to admin role
- [ ] Overview shows key metrics
- [ ] Navigation to all admin sub-sections works

#### 3.2 User Management (`src/pages/admin/AdminUsers.tsx`)

**Features:**
- List all signup requests (pending, approved, rejected)
- Filter by status
- Approve/reject pending requests
- View user details
- Change user roles

**Data operations:**
- Read from `localStorage.signupRequests`
- Update status (approve/reject)
- Create approved user in `localStorage.users`

**UI Components:**
- DataTable with sorting/filtering (use shadcn Table)
- Status badges
- Action dropdown (approve/reject/view)
- User detail modal/drawer

**Acceptance criteria:**
- [ ] Admin can view all signup requests
- [ ] Admin can approve/reject requests
- [ ] Approved users can log in
- [ ] Filter/search functionality works
- [ ] Bulk actions for multiple selections

#### 3.3 Application Management (`src/pages/admin/AdminApplications.tsx`)

**Features:**
- List all event applications
- Filter by event, status, date
- Review application details
- Approve/reject applications
- Export application data

**Data operations:**
- Read from `localStorage.application_IA-*`
- Update status (submitted -> under-review -> selected/rejected)

**UI Components:**
- DataTable with event grouping
- Application detail view (modal or drawer)
- Status workflow buttons
- Export to CSV

**Acceptance criteria:**
- [ ] Admin can view all applications
- [ ] Admin can change application status
- [ ] Applicant notified of status change (update in their dashboard)
- [ ] Export functionality works

#### 3.4 Innovation Management (`src/pages/admin/AdminInnovations.tsx`)

**Features:**
- List all submitted innovations
- Filter by status, category, region
- Approve/reject innovations
- Feature innovations on homepage

**Data operations:**
- Read from `localStorage.innovation_INV-*`
- Update status
- Set `featured` flag

**Acceptance criteria:**
- [ ] Admin can review submitted innovations
- [ ] Admin can approve/reject innovations
- [ ] Approved innovations appear in public listing
- [ ] Featured innovations highlighted on homepage

#### 3.5 Event Management (`src/pages/admin/AdminEvents.tsx`)

**Features:**
- List all events (past, current, future)
- Create new events
- Edit event details
- Manage event status
- View applications per event

**Data model for events (new):**
```typescript
interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  venue: string;
  category: "past" | "open" | "future";
  deadline?: string;
  maxStartups: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
```

**Currently:** Events are hardcoded in `Events.tsx`. Need to migrate to localStorage.

**Acceptance criteria:**
- [ ] Admin can create new events
- [ ] Admin can edit existing events
- [ ] Admin can see application count per event
- [ ] Events editable without code changes

#### 3.6 Roadshow Management (`src/pages/admin/AdminRoadshow.tsx`)

**Features:**
- List all roadshow inquiries
- Update inquiry status
- View full inquiry details
- Communication history (future enhancement)

**Data operations:**
- Read from `localStorage.roadshow_RW-*`
- Update status workflow: new -> in-discussion -> confirmed/declined -> completed

**Note:** Basic functionality already exists in Dashboard.tsx. Enhance and move to dedicated admin page.

**Acceptance criteria:**
- [ ] Admin can view all roadshow inquiries
- [ ] Admin can update inquiry status
- [ ] Full inquiry details visible
- [ ] Status changes reflected in data

---

### Phase 4: Politician Dashboard (Estimated: 2-3 days)

**Goal:** Create read-only overview dashboard for politicians.

#### 4.1 Politician Dashboard

**Create `src/pages/politician/PoliticianDashboard.tsx`:**
- Innovation ecosystem overview
- Statistics and metrics
- Events calendar view
- Regional breakdown
- No approval/edit capabilities

**Sections:**
1. **Overview Cards**
   - Total approved innovations
   - Upcoming events count
   - Active regions
   - Recent activity

2. **Innovation Browser** (embedded, filtered view)
   - Only shows approved innovations
   - Category and region filters
   - Search functionality

3. **Events Calendar**
   - Calendar component showing all events
   - Click to view event details
   - Filter by date range

4. **Regional Map** (future enhancement)
   - Germany map showing innovation distribution
   - Click region for details

**Add routes:**
```tsx
<Route path="/overview" element={
  <ProtectedRoute requiredRole="politician">
    <PoliticianDashboard />
  </ProtectedRoute>
} />
```

**Acceptance criteria:**
- [ ] Politician role can access dashboard
- [ ] All data is read-only (no edit buttons)
- [ ] Innovations, events, metrics displayed
- [ ] Fully translated DE/EN

#### 4.2 Events Calendar View

**Create `src/components/EventsCalendar.tsx`:**
- Month view calendar
- Events marked on dates
- Click date to see events
- Navigation between months

**Use shadcn Calendar component as base.**

**Acceptance criteria:**
- [ ] Calendar displays all events
- [ ] Navigation between months
- [ ] Event details on click
- [ ] Responsive design

---

### Phase 5: UX Polish and Integration (Estimated: 2-3 days)

**Goal:** Ensure seamless navigation, consistent design, and no dead ends.

#### 5.1 Navigation Updates

**Modify `src/components/Navigation.tsx`:**
- Role-based menu items
  - Innovator: Dashboard, Submit Innovation, Events, Profile
  - Admin: Admin Dashboard (with sub-menu), Profile
  - Politician: Overview, Innovations, Events, Profile
- Consistent dropdown behavior
- Mobile menu role awareness

**Acceptance criteria:**
- [ ] Navigation adapts to user role
- [ ] All menu items link to real pages
- [ ] Mobile menu works correctly

#### 5.2 Consistent Loading States

**Create `src/components/LoadingState.tsx`:**
- Skeleton layouts for each page type
- Consistent spinner/loading indicators

**Apply to:**
- Dashboard pages
- Data tables
- Form submissions

**Acceptance criteria:**
- [ ] Loading states for async operations
- [ ] Consistent skeleton patterns
- [ ] No layout shifts during load

#### 5.3 Error Handling

**Modify `src/pages/NotFound.tsx`:**
- Use Navigation + Footer
- Match site design
- Suggest similar pages
- Fully translated

**Create `src/components/ErrorBoundary.tsx`:**
- Catch render errors
- Display friendly error message
- Allow retry/navigation home

**Acceptance criteria:**
- [ ] 404 page matches site design
- [ ] Error boundary catches crashes
- [ ] Users can recover from errors

#### 5.4 Success Notifications

**Review toast usage across all forms:**
- Consistent success/error messages
- German-first with English translations
- Use shadcn toast component consistently

**Acceptance criteria:**
- [ ] All form submissions show feedback
- [ ] Messages translated
- [ ] Consistent styling

---

## 4. Testing Strategy

### Unit Tests (Priority)
- AuthContext role logic
- Translation function coverage
- Form validation functions

### Integration Tests
- Protected route access by role
- Application submission flow
- Admin approval workflow

### E2E Tests (Recommended)
- Complete innovator journey: signup -> approval -> login -> apply
- Admin workflow: review -> approve -> user notification
- Language switching across all pages

---

## 5. Risks and Considerations

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| localStorage limits (~5MB) | Data loss if exceeded | Monitor storage usage; consider IndexedDB for future |
| No real backend | Limited functionality | Clear scope; document upgrade path |
| Translation coverage | User confusion | Automated check for missing keys |
| Role security | Unauthorized access | Validate role on every protected action |

### Business Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data persistence | Users lose data on browser clear | Clear documentation; export feature |
| Multi-device access | Users can't access from multiple devices | Document limitation; plan for backend |
| No email notifications | Users miss status updates | In-app notifications; dashboard alerts |

---

## 6. Future Enhancements (Out of Scope)

These are identified needs that should be addressed in future phases:

1. **Backend Integration**
   - PostgreSQL database
   - User authentication with JWT
   - Real email notifications

2. **File Uploads**
   - Innovation logos/screenshots
   - Document attachments for applications

3. **Analytics Dashboard**
   - User engagement metrics
   - Event performance tracking
   - Innovation popularity

4. **Communication Tools**
   - In-app messaging
   - Application comments/feedback
   - Status update notifications

5. **Regional Map Visualization**
   - Interactive Germany map
   - Innovation distribution overlay
   - Regional statistics

---

## 7. Implementation Order Summary

```
Phase 1: Foundation (Days 1-5)
  |-- 1.1 Create missing pages (/press, /statutes, /donate, /contact, /profile)
  |-- 1.2 Complete i18n coverage
  |-- 1.3 Add role-based auth
  |-- 1.4 Fix partner logos

Phase 2: Innovator Enhancement (Days 6-8)
  |-- 2.1 User profile page
  |-- 2.2 Innovation submission
  |-- 2.3 Enhanced dashboard

Phase 3: Admin Dashboard (Days 9-14)
  |-- 3.1 Admin shell/layout
  |-- 3.2 User management
  |-- 3.3 Application management
  |-- 3.4 Innovation management
  |-- 3.5 Event management
  |-- 3.6 Roadshow management

Phase 4: Politician Dashboard (Days 15-17)
  |-- 4.1 Politician dashboard
  |-- 4.2 Events calendar

Phase 5: UX Polish (Days 18-20)
  |-- 5.1 Navigation updates
  |-- 5.2 Loading states
  |-- 5.3 Error handling
  |-- 5.4 Success notifications
```

**Total Estimated Time:** 15-20 working days

---

## 8. File Manifest

### New Files to Create

| File | Description |
|------|-------------|
| `src/pages/Press.tsx` | Press/media page |
| `src/pages/Statutes.tsx` | Organization statutes |
| `src/pages/Donate.tsx` | Donation information |
| `src/pages/Contact.tsx` | Contact form |
| `src/pages/Profile.tsx` | User profile settings |
| `src/pages/SubmitInnovation.tsx` | Innovation submission form |
| `src/pages/admin/AdminLayout.tsx` | Admin section layout |
| `src/pages/admin/AdminDashboard.tsx` | Admin overview |
| `src/pages/admin/AdminUsers.tsx` | User management |
| `src/pages/admin/AdminApplications.tsx` | Application review |
| `src/pages/admin/AdminInnovations.tsx` | Innovation review |
| `src/pages/admin/AdminEvents.tsx` | Event management |
| `src/pages/admin/AdminRoadshow.tsx` | Roadshow management |
| `src/pages/politician/PoliticianDashboard.tsx` | Politician overview |
| `src/components/EventsCalendar.tsx` | Calendar component |
| `src/components/LoadingState.tsx` | Loading skeletons |
| `src/components/ErrorBoundary.tsx` | Error handling |
| `src/components/ProtectedRoute.tsx` | Update for role-based access |
| `public/logos/partners/*.svg` | Partner logos |

### Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Add new routes |
| `src/contexts/AuthContext.tsx` | Add roles |
| `src/contexts/LanguageContext.tsx` | Add ~200 translation keys |
| `src/components/Navigation.tsx` | Role-based menus |
| `src/components/SignupRequestModal.tsx` | Role selection |
| `src/pages/Dashboard.tsx` | Enhanced innovator view, translations |
| `src/pages/NotFound.tsx` | Redesign with site layout |
| `src/pages/HowToApply.tsx` | Add EN translations |
| `src/data/innovations.ts` | Add status, submittedBy fields |

---

## 9. Definition of Done

A phase is complete when:

1. All listed features implemented
2. All translations added (DE primary, EN secondary)
3. No TypeScript errors
4. No console errors
5. Navigation works without dead ends
6. Language toggle works on all new pages
7. Mobile responsive
8. Code reviewed and merged

---

## 10. Risk Mitigations (Pre-Mortem)

*Pre-mortem run: 2026-01-12 | Mode: deep | Tigers: 4 | Elephants: 2*

### HIGH Priority Tigers - MUST Address

#### Tiger 1: Admin Bootstrap Mechanism
**Risk:** No way to create the first admin user. Chicken-and-egg problem.

**Mitigation (Add to Phase 1.3):**
```typescript
// In AuthContext.tsx - Add admin seed check
const SEED_ADMIN_EMAIL = "admin@zdb.de"; // Or use env variable

// During signup request creation, check for seed email
if (email === SEED_ADMIN_EMAIL) {
  // Auto-approve with admin role
  request.status = "approved";
  request.role = "admin";
}
```

**Alternative:** Create `/admin-setup` one-time route that only works when no admins exist.

#### Tiger 2: ProtectedRoute Role Support
**Risk:** Current ProtectedRoute only checks authentication, not roles. Plan's `<ProtectedRoute requiredRole="admin">` will silently fail.

**Mitigation (Add to Phase 1.3):**

Update `src/components/ProtectedRoute.tsx`:
```typescript
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "innovator" | "admin" | "politician";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/", { state: { openLogin: true } });
      return;
    }

    // Role check
    if (requiredRole && user?.role !== requiredRole) {
      navigate("/dashboard"); // Redirect to their own dashboard
    }
  }, [isAuthenticated, requiredRole, user, navigate, location]);

  if (!isAuthenticated) return null;
  if (requiredRole && user?.role !== requiredRole) return null;

  return <>{children}</>;
};
```

### MEDIUM Priority Tigers

#### Tiger 3: Existing User Migration
**Risk:** Users created before role system have no `role` field → breaks role checks.

**Mitigation (Add to Phase 1.3):**

Add migration in `AuthContext.tsx`:
```typescript
useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const parsed = JSON.parse(savedUser);
    // Migration: Add default role if missing
    if (!parsed.role) {
      parsed.role = "innovator";
      localStorage.setItem("user", JSON.stringify(parsed));
    }
    setUser(parsed);
  }
}, []);
```

Also migrate `signupRequests`:
```typescript
// On mount, migrate any signupRequests without role
const requests = JSON.parse(localStorage.getItem("signupRequests") || "[]");
const migrated = requests.map(r => ({
  ...r,
  role: r.role || "innovator"
}));
localStorage.setItem("signupRequests", JSON.stringify(migrated));
```

#### Tiger 4: Events Data Migration
**Risk:** Moving from hardcoded events to localStorage without migration could break existing applications.

**Mitigation (Add Phase 3.5a before 3.5):**

**Phase 3.5a: Events Data Migration**
1. Create `src/utils/migrateEvents.ts`:
```typescript
export const migrateHardcodedEvents = () => {
  const existing = localStorage.getItem("events");
  if (existing) return; // Already migrated

  // Import hardcoded events and seed localStorage
  const hardcodedEvents = [...]; // From current Events.tsx
  localStorage.setItem("events", JSON.stringify(hardcodedEvents));
};
```

2. Call migration on app mount (in App.tsx or AdminLayout)
3. Update Events.tsx to read from localStorage instead of hardcoded data
4. Preserve event IDs so existing `application_IA-*` references remain valid

### Accepted Risks (Elephants)

| Risk | Why Accepted | Future Mitigation |
|------|--------------|-------------------|
| localStorage as database | MVP scope - no backend budget | Phase 6: Backend integration |
| No cross-device access | Documented limitation | Phase 6: User accounts with real auth |

### Updated Phase 1.3 Acceptance Criteria

Add to existing criteria:
- [x] Seed admin mechanism works (specific email auto-approved as admin)
- [x] ProtectedRoute enforces role when `requiredRole` prop provided
- [x] Existing users without role get "innovator" role on page load
- [x] Migration runs once and is idempotent

---

*Plan created by: Planning Agent*
*Pre-mortem reviewed: 2026-01-12*
*Ready for implementation*
