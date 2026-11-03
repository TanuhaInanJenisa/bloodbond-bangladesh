# BloodBond Bangladesh (ব্লাডবন্ড বাংলাদেশ)
> **Tagline:** "Donate Blood, Save Lives • রক্ত দিন, জীবন বাঁচান"  
> **Mission:** A nationwide digital blood donation and emergency donor management platform connecting donors, patients, hospitals, and volunteer organizations across all 64 districts of Bangladesh.

---

## 🩸 1. Key System Highlights

- **Nationwide Coverage:** Integrated database of all 8 administrative divisions, 64 districts, and upazilas/metropolitan thanas across Bangladesh.
- **Automated 90-Day Cooldown Engine:** Whole-blood donations automatically trigger a scientific 90-day recovery cooldown period, locking donor availability until cellular replenishment is complete.
- **Dynamic Digital Donor ID Card:** High-resolution digital membership card generated automatically with unique donor IDs (e.g. `BB-BD-2026-0841`), verifiable via public-safe dynamic QR codes.
- **Privacy-First Emergency Matching:** Donors' exact street addresses and private phone numbers are protected; contact details are revealed only to verified patients agreeing to emergency medical terms.
- **Bilingual Interface:** Instant seamless switching between Bengali (বাংলা) and English (`BN | EN`).
- **Full Dark & Light Mode:** Accessible color contrast using BloodBond palette: Deep Blood Red (`#C62828`), Bangladesh Green (`#006A4E`), Soft Red (`#FCE4E4`), and Charcoal Dark (`#202124`).
- **Super Admin & Moderation Portal:** Realtime analytics, blood group distribution graphs, donor verification, hospital slip verification, and emergency request management.

---

## 🛠️ 2. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with CSS variables & responsive mobile-first architecture
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS), Edge Functions, and `pg_cron`
- **Component Primitives & Icons:** Lucide React, Canvas Confetti
- **QR Code Engine:** `qrcode` library generating secure SVG/DataURLs
- **State & Storage:** Dual-layer architecture: connected Supabase client with resilient local offline/localStorage sync fallback

---

## 🚀 3. Quick Start & Installation

### Prerequisites
- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
```

*(Note: The platform is built with an intelligent local database fallback layer so you can run, test, and evaluate all features locally even before connecting your live Supabase project!)*

### Step 3: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Build for Production
```bash
npm run build
npm run start
```

---

## 🗄️ 4. Supabase Database Setup & Migrations

All SQL migration scripts are located in the `supabase/migrations/` directory:

1. **`20261103000001_initial_schema.sql`**  
   - Normalized PostgreSQL schema (tables: `profiles`, `donors`, `divisions`, `districts`, `upazilas`, `blood_requests`, `donation_records`, `organizations`, `campaigns`, `notifications`, `admin_logs`).
   - Custom ENUM types (`blood_group_type`, `user_role_type`, `request_status_type`, `priority_level_type`).
   - Trigger `handle_verified_donation`: Automatically updates donor's last donation date, sets next eligibility date (+90 days), and locks availability during recovery.
   - Row Level Security (RLS) policies for privacy protection.

2. **`20261103000002_seed_geography.sql`**  
   - Official administrative geography of Bangladesh: All 8 Divisions, 64 Districts, and metropolitan Thanas/Upazilas.

3. **`20261103000004_cron_jobs.sql`**  
   - Supabase Scheduled Jobs (`pg_cron`) running daily at midnight to evaluate donor 90-day cooldown expiration and hourly to close expired blood requests.

### Executing Migrations in Supabase:
1. Go to your Supabase Project Dashboard -> **SQL Editor**.
2. Run `20261103000001_initial_schema.sql`.
3. Run `20261103000002_seed_geography.sql`.
4. (Optional) Enable `pg_cron` and execute `20261103000004_cron_jobs.sql`.

---

## ⚡ 5. Supabase Edge Functions

The automated cooldown engine is provided in:  
`supabase/functions/check-donor-eligibility/index.ts`

Deploy with Supabase CLI:
```bash
supabase functions deploy check-donor-eligibility
```

---

## 🗺️ 6. Application Routes

| Route | Description |
|---|---|
| `/` | Homepage with interactive search bar, impact statistics, and live request feeds |
| `/donors` | Nationwide donor search with dependent cascading dropdowns (Division → District → Upazila) |
| `/donors/[id]` | Public verified donor profile with Digital ID Card, achievements, and safe contact modal |
| `/emergency-requests` | Live emergency blood requests feed with priority filters and direct dial buttons |
| `/request-blood` | Emergency blood request submission form |
| `/become-a-donor` | 4-step donor registration wizard with age (18+) and medical eligibility screening |
| `/campaigns` | Nationwide blood donation drives & university camps |
| `/organizations` | Accredited hospitals, blood banks, and volunteer organizations directory |
| `/leaderboard` | Top donors leaderboard and district champions |
| `/awareness` | Blood compatibility matrix, 90-day science, and medical guidelines |
| `/dashboard` | Donor overview dashboard with availability toggle and countdown timer |
| `/dashboard/id-card` | Digital Donor ID Card (CR80 standard) with QR code, print, and share options |
| `/dashboard/donations` | Donation history log and hospital slip submission |
| `/dashboard/requests` | Manage user's active and historical blood requests |
| `/dashboard/settings` | Profile, phone visibility, and SMS notification preferences |
| `/admin` | Super Admin dashboard with KPIs, blood group distribution charts, and queues |
| `/login` | Authentication page with one-click demo role switchers (Donor, Admin) |
| `/about`, `/contact`, `/faq`, `/privacy`, `/terms` | Informational, compliance, and hospital onboarding pages |

---

## 🛡️ 7. Clinical & Privacy Safeguards

- **No Public Phone Scraping:** Donor phone numbers are masked by default. Emergency seekers must explicitly acknowledge genuine medical use before numbers are disclosed.
- **Strictly Non-Remunerated:** In compliance with national and WHO guidelines, financial compensation for blood donation is strictly prohibited.
- **Mandatory Laboratory Crossmatching:** The platform enforces clear disclaimers that ABO/Rh compatibility is theoretical and must always be followed by clinical crossmatching at authorized medical facilities.

---

## 🚢 8. Vercel Deployment

1. Push this repository to GitHub / GitLab.
2. Import the project into **Vercel**.
3. In **Environment Variables**, set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click **Deploy**. Vercel will automatically build and deploy with zero extra configuration.

---

*Made with ❤️ for the people of Bangladesh.*

