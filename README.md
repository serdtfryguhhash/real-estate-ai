# DealFinder AI — Real Estate Investment Platform

AI-powered property deal finder and analysis platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **AI Deal Scoring** — 1-100 score based on discount, ARV, rehab cost, neighborhood trends, comps
- **Automated Comps** — 3-5 comparable sales with adjustments and ARV calculation
- **Rehab Cost Estimator** — AI estimates by property age/condition (cosmetic/moderate/full gut)
- **Interactive Deal Map** — Property pins, heatmaps, click-for-analysis
- **Investment Calculator** — Cash-on-cash, cap rate, DSCR, monthly cash flow, equity projections
- **Deal Alerts** — Set criteria, hourly/daily/weekly matching
- **Portfolio Tracker** — Kanban pipeline: Watching > Analyzing > Offer > Contract > Closed
- **Stripe Payments** — Free / Investor $49/mo / Pro $99/mo / Fund $249/mo
- **Affiliate Program** — 20% recurring commission
- **Blog & Newsletter** — Weekly market updates + top deals

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI components
- **Charts**: Recharts
- **Maps**: Mapbox GL (interactive map component)
- **State**: React hooks + Zustand-ready
- **Auth**: Supabase Auth (configured)
- **Payments**: Stripe (4 tiers)
- **Email**: Resend + ConvertKit
- **APIs**: Zillow/RapidAPI, Google Maps, Rentometer

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, testimonials |
| `/login` | Sign in page |
| `/signup` | Registration page |
| `/dashboard` | Overview with stats, charts, activity feed |
| `/deals` | AI-scored deal listings with filters |
| `/deals/[id]` | Full deal analysis with comps, rehab, financials |
| `/map` | Interactive map with property pins |
| `/calculator` | Investment calculator with projections |
| `/alerts` | Deal alert management |
| `/portfolio` | Pipeline Kanban board and list view |
| `/pricing` | Pricing plans with FAQ |
| `/blog` | Investment articles and market updates |
| `/blog/[slug]` | Full blog article |
| `/settings` | Profile, notifications, billing, API keys |
| `/referrals` | Affiliate program dashboard |

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/deals` | GET | Search and filter deals |
| `/api/properties` | GET | Property data |
| `/api/alerts` | GET/POST | Manage deal alerts |
| `/api/auth` | POST | Login/signup |
| `/api/ai/chat` | POST | AI analysis (Ollama) |

## Financial Calculations

All financial formulas are implemented in `src/lib/calculations.ts`:

- **Monthly Mortgage**: Standard amortization formula
- **Cap Rate**: NOI / Purchase Price
- **Cash-on-Cash**: Annual Cash Flow / Total Cash Invested
- **DSCR**: NOI / Annual Debt Service
- **NOI**: Gross Income - Operating Expenses (excluding debt service)
- **Break Even**: Total Investment / Monthly Cash Flow
- **Equity Projections**: Principal paydown + appreciation over 1/5/10 years

## Design System

- **Primary**: #1E3A5F (Navy)
- **Secondary**: #0E7490 (Teal)
- **Accent**: #10B981 (Green)
- **Background**: #F8FAFC
- **Text**: #0F172A
- **Font**: Inter with tabular-nums for financial figures

## Disclaimer

For informational purposes only, not financial advice. All property data, deal scores, and financial projections are estimates.
