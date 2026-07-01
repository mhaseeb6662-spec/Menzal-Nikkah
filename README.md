# Nikah Manzil — Matrimonial Platform Frontend

A complete, premium-styled React + Tailwind CSS frontend for a matrimonial
platform, with public pages, authentication flow, a member profile-setup
wizard, a user dashboard, and a full admin dashboard.

## Tech Stack
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Framer Motion (animations)
- Embla Carousel (sliders)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (typically http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/     Reusable UI (Button, ProfileCard, Navbar, Footer, forms, etc.)
  context/        AuthContext (demo auth — login as user or admin)
  data/           Mock/demo data (profiles, success stories, admin data)
  layouts/        MainLayout, AuthLayout, DashboardShell
  pages/          Public pages (Home, Search, Profile Detail, About, Contact, etc.)
  pages/user/     Member dashboard pages
  pages/admin/    Admin dashboard pages
```

## Demo Login

On the Login page, tick "Login as Admin (demo)" to enter the admin dashboard,
or leave it unticked to enter the regular member dashboard. This is a
frontend-only demo — there is no real backend; all data is mock data in
`src/data/`. Connect it to your API by replacing the calls in each page/
context with real HTTP requests.

## Pages Included

**Public:** Home, Active Profiles, Search Profiles, Profile Detail,
Success Stories, About, Contact, Privacy Policy, Terms & Conditions, 404.

**Auth:** Login, Register (+ OTP step), Profile Setup Wizard (5 steps),
Payment (registration fee submission).

**User Dashboard:** Overview, Edit Profile, Manage Photos, Payment Status,
Security / Change Password.

**Admin Dashboard:** Overview, User Management, Payment Management,
Access Requests, Success Stories Management, Website Settings.
