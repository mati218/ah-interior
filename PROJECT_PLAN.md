# A&H Interiors — Full Dynamic Website
### Project Blueprint v1.0

---

## 1. Vision

A premium, editorial-feeling interior design website. Every scrap of content (projects, services, team, testimonials, blog, site settings, contact leads) is stored in Postgres and editable from a custom admin panel — nothing hardcoded. The public site should feel like flipping through a high-end interior design magazine: generous whitespace, soft cream/white palette, large photography, slow confident motion.

**Company:** A&H Interiors
**Feel:** Elegant, warm-minimal, editorial, calm luxury (think Architectural Digest / a boutique studio site) — not flashy/neon, not corporate-cold.

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Server components, streaming, route handlers = one full-stack app |
| Styling | **Tailwind CSS v4** | New CSS-first config (`@theme`), fast, matches design tokens directly |
| Data fetching (client) | **TanStack Query v5** | Caching, mutations, optimistic UI for the admin panel |
| Forms | **React Hook Form** | Perf, minimal re-renders |
| Validation | **Yup** + `@hookform/resolvers` | Schema validation shared between client & API |
| Database | **PostgreSQL** | Relational, strong fit for structured content |
| ORM | **Prisma** | Type-safe queries, migrations, works great with Postgres + Next.js |
| Auth | **Custom JWT (API-based)**, httpOnly cookie | Per your requirement: "api base authentication" — no NextAuth dependency, full control over admin login |
| Animation (2D/UI) | **Framer Motion** | Scroll reveals, page transitions, hover micro-interactions, layout animation |
| Animation (3D/hero) | **React Three Fiber + drei** (used selectively) | One signature 3D hero moment (e.g., a slowly rotating 3D room / abstract furniture silhouette), kept light so it doesn't hurt perf |
| Images | Next/Image + remote Unsplash/Pexels URLs (placeholder) | Swapped for real photography later — architecture supports Cloudinary/S3 upload from day 1 in admin |
| Image hosting (dynamic uploads) | **Cloudinary** (recommended) or local `/public/uploads` in dev | Admin-uploaded project photos need real storage |
| Icons | **lucide-react** | Clean line icons, matches minimal aesthetic |
| Deployment | Vercel (app) + Neon/Supabase/Railway (Postgres) | Zero-config fit for Next.js |

---

## 3. Design System

### 3.1 Color Palette — "Warm Minimal"

```
--color-cream:        #F7F3EC   /* primary background */
--color-cream-dark:   #EFE7D8   /* section alternate bg */
--color-white:        #FFFFFF
--color-ivory:        #FBF9F5
--color-charcoal:      #2B2622   /* primary text — warm black, not pure #000 */
--color-taupe:         #8A7B6C   /* secondary text / muted */
--color-accent-gold:   #B8925A   /* CTA, links, highlights — muted brass, not shiny gold */
--color-accent-sage:   #A8AD96   /* optional secondary accent for tags/badges */
--color-border:        #E5DED2
--color-success:       #6B8F71
--color-error:         #B5544A
```

Rule of thumb: 90% cream/white/charcoal, accent gold used sparingly (CTAs, underlines, active nav state, small details) — never full-color blocks.

### 3.2 Typography

- **Display / Headings:** `Cormorant Garamond` or `Playfair Display` (elegant serif) — via `next/font/google`
- **Body / UI:** `Inter` or `Manrope` (clean sans) — via `next/font/google`
- Large, airy heading sizes (clamp-based fluid type), generous line-height on body copy, wide letter-spacing on small caps labels (e.g. "OUR SERVICES").

### 3.3 Layout Language

- Max content width ~1440px, big side gutters at desktop
- Asymmetric grids for project galleries (masonry-ish, not uniform cards)
- Thin 1px hairline dividers instead of heavy borders/shadows
- Rounded corners: small radius only (4–8px) — stays elegant, not "app-like"

---

## 4. Animation Strategy

Animation is core to how the brand feels premium — used with restraint (nothing bouncy/gimmicky):

1. **Hero section:** Framer Motion staggered text reveal (headline fades/slides up word by word) + a subtle parallax/Ken Burns image or a lightweight R3F 3D element (e.g., abstract rotating geometric "room corner" / floating furniture silhouette / particles suggesting light).
2. **Scroll reveals:** `whileInView` fade-up on section entries, staggered children for grids (projects, services, testimonials).
3. **Page transitions:** Shared layout transition between project list → project detail (Framer Motion `layoutId` on the hero image) so it feels like the photo "grows" into the detail page.
4. **Image hover:** Slow scale (1 → 1.05) with overflow-hidden crop, cursor-following subtle tilt on featured cards.
5. **Cursor accent (optional, desktop only):** Custom soft dot cursor that scales on hoverable elements — common on high-end studio sites.
6. **Admin panel:** Motion kept minimal/functional (fast fades only) — admin is a tool, not a showcase.

---

## 5. Site Map — Public Site

| Route | Purpose | Dynamic Data |
|---|---|---|
| `/` | Home — hero, intro, featured projects, services teaser, stats, testimonials, CTA | Featured projects, testimonials, site settings |
| `/about` | Studio story, philosophy, team grid | Team members, about content (CMS block) |
| `/services` | Services overview grid | Services list |
| `/services/[slug]` | Single service detail (process, related projects) | Service by slug |
| `/projects` | Portfolio grid with filters (category, room type) | Projects + categories |
| `/projects/[slug]` | Project case study (gallery, before/after, details, next project) | Project by slug |
| `/blog` | Journal / design insights listing | Blog posts, categories |
| `/blog/[slug]` | Single article | Post by slug |
| `/testimonials` | Full client testimonials wall | Testimonials |
| `/contact` | Contact form + map + info | Site settings, submits lead |
| `/careers` *(optional)* | Job openings | Job postings |
| `/privacy`, `/terms` | Static legal pages | CMS block |

## 6. Site Map — Admin Panel (`/admin/*`)

| Route | Purpose |
|---|---|
| `/admin/login` | JWT auth login |
| `/admin` (dashboard) | Overview: recent leads, project count, quick stats |
| `/admin/projects` | List/search/filter projects |
| `/admin/projects/new` / `/admin/projects/[id]` | Create/edit project (multi-image upload, gallery reorder, category, status: draft/published) |
| `/admin/services` | CRUD services |
| `/admin/categories` | CRUD project categories/room types |
| `/admin/blog` | CRUD blog posts (rich text editor) |
| `/admin/testimonials` | CRUD testimonials |
| `/admin/team` | CRUD team members |
| `/admin/leads` | Contact form submissions inbox (mark read/replied) |
| `/admin/settings` | Site settings (company info, social links, SEO defaults, homepage featured picks) |
| `/admin/users` | Manage admin users/roles (owner only) |

---

## 7. Data Model (PostgreSQL via Prisma) — Core Entities

```
User (admin)        id, name, email, passwordHash, role[ADMIN|EDITOR|OWNER], createdAt
Project              id, title, slug, summary, description, coverImage, location,
                     area, year, status[DRAFT|PUBLISHED], featured, categoryId, createdAt
ProjectImage         id, projectId, url, alt, sortOrder
Category             id, name, slug
Service              id, title, slug, summary, description, icon, image, sortOrder
Testimonial          id, clientName, role, message, avatar, rating, projectId?, featured
TeamMember           id, name, role, bio, photo, sortOrder, socialLinks(json)
BlogPost             id, title, slug, excerpt, content, coverImage, authorId, status, publishedAt
Lead (contact form)  id, name, email, phone, message, projectType, status[NEW|CONTACTED|CLOSED], createdAt
SiteSetting          key, value(json)  — singleton-style config (address, phone, socials, SEO defaults, homepage featured IDs)
```

Relations: Project → Category (many-to-one), Project → ProjectImage (one-to-many), Testimonial → Project (optional), BlogPost → User (author).

---

## 8. Authentication (API-based)

- `POST /api/auth/login` — verify email/password (bcrypt) → issue JWT → set httpOnly, secure, sameSite cookie
- `POST /api/auth/logout` — clear cookie
- `GET /api/auth/me` — return current admin user (used by TanStack Query for session state)
- `middleware.ts` — protects all `/admin/*` routes (except `/admin/login`) by verifying JWT cookie server-side; redirects to login if invalid/missing
- Passwords hashed with `bcrypt`; JWT signed with `jsonwebtoken`, short-lived access token + refresh strategy (or single longer-lived session token for simplicity in v1)
- Role-based checks (OWNER vs EDITOR) enforced in API route handlers

---

## 9. API Layer

All routes under `app/api/**/route.ts` (REST-style), consumed by:
- **Public pages:** direct server-side fetch (Server Components) for SEO/performance — no client waterfall
- **Admin panel:** TanStack Query hooks calling the same API routes (client-side, since it's an authenticated dashboard with mutations/optimistic updates)

Example endpoints:
```
GET/POST        /api/projects
GET/PUT/DELETE  /api/projects/[id]
GET/POST        /api/services
GET/POST        /api/categories
GET/POST        /api/testimonials
GET/POST        /api/blog
GET/POST        /api/leads          (POST = public contact form submit)
PUT             /api/leads/[id]     (admin updates status)
GET/PUT         /api/settings
POST            /api/upload         (image upload → Cloudinary, returns URL)
```

All mutation endpoints validate incoming payloads with **Yup** schemas (shared/mirrored with the frontend RHF schemas) before hitting Prisma.

---

## 10. Reusable Component Library

```
/components
  /ui            Button, Input, Textarea, Select, Checkbox, Badge, Card, Modal,
                 Tabs, Tooltip, Skeleton, Pagination, Toast
  /layout        Header, Footer, MobileNav, AdminSidebar, AdminTopbar
  /motion        FadeIn, StaggerGroup, RevealImage, PageTransition, Hero3D
  /sections      HeroSection, FeaturedProjects, ServicesGrid, TestimonialSlider,
                 StatsBand, CTABanner, Newsletter
  /project       ProjectCard, ProjectGallery, ProjectFilterBar
  /admin         DataTable, FormField, ImageUploader, RichTextEditor, ConfirmDialog
  /forms         ContactForm, ProjectForm, LoginForm  (RHF + Yup wired)
```

Every form field, card, and section is a typed, reusable component — public site and admin share the base `/ui` primitives (same visual language, admin just uses a denser layout).

---

## 11. Folder Structure (App Router)

```
app/
  (public)/
    layout.tsx            → Header + Footer
    page.tsx               → Home
    about/page.tsx
    services/page.tsx
    services/[slug]/page.tsx
    projects/page.tsx
    projects/[slug]/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    contact/page.tsx
  admin/
    layout.tsx             → AdminSidebar + guard
    login/page.tsx
    page.tsx                → Dashboard
    projects/...
    services/...
    leads/...
    settings/page.tsx
  api/
    auth/...
    projects/...
    services/...
    ...
components/
lib/
  prisma.ts
  auth.ts (jwt helpers)
  validation/  (yup schemas)
  queries/     (tanstack query hooks)
prisma/
  schema.prisma
  seed.ts
public/
```

---

## 12. Placeholder Imagery Plan

Until real photography is provided, use high-quality free-license interior images from **Unsplash Source / Pexels** (curated set: living rooms, kitchens, bedrooms, minimal interiors) mapped into seed data via `prisma/seed.ts`, so the site looks fully populated from day one. Swap step later: just update image URLs in admin (no code change needed).

---

## 13. Implementation Phases

1. **Scaffold** — Next.js 15 + Tailwind v4 setup, fonts, design tokens, base `/ui` components
2. **Database** — Prisma schema, migrations, seed script with placeholder content/images
3. **Public site (static shell)** — all pages with mock/seeded data, layout + navigation + footer
4. **Animation pass** — Framer Motion sections, 3D hero, page transitions
5. **Auth + Admin shell** — login flow, protected layout, dashboard
6. **Admin CRUD** — projects, services, categories, testimonials, team, blog, leads, settings (TanStack Query + RHF + Yup wired end-to-end)
7. **Contact form → Leads pipeline** — public submit → admin inbox
8. **Polish** — SEO metadata (per-page), responsive QA, accessibility pass, loading/empty states
9. **Deploy** — Vercel + hosted Postgres, env config

---

## 14. Decisions Locked

- **Image hosting:** Cloudinary for admin-uploaded project/gallery images
- **Blog editor:** Tiptap rich text editor (stores HTML/JSON) in the admin panel
- **Branding:** Cream/white/charcoal/muted-gold palette (Section 3.1) finalized as-is — no existing logo/brand colors to match

---

*Plan confirmed. Implementation starts with Phase 1 (scaffold).*
