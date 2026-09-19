# Build2Learn Security Awareness Demo

A controlled Next.js demonstration for a cybersecurity / phishing-awareness hackathon. The site looks like a modern builder community so the presentation can show how a convincing interface can lead into a login prompt. After any simulated authentication action, the app reveals the exercise and explains the indicators.

This project is inspired by the public information architecture of [Build2Learn](https://build2learn.in/). It does **not** impersonate the real organization, copy proprietary assets, or connect to any real authentication service. All community content is fictional.

## Security model

- Passwords are **never stored**.
- Passwords are **never logged**.
- Passwords are **never written** to PostgreSQL, cookies, `localStorage`, `sessionStorage`, or files.
- The API rejects unexpected sensitive fields such as `password`, `confirmPassword`, `otp`, `token`, `creditCard`, and `cardNumber`.
- Only non-sensitive interaction metadata is recorded: name, email, action, whether a password field was used, password length, timestamp, and a random demo session id.
- The Prisma schema has **no password column**.
- Session tracking uses a random `demoSessionId` cookie. The app does not collect IP addresses, browser fingerprints, keystrokes, clipboard contents, OTPs, or passwords.

## Demo flow

```text
HOME → REVIEWS → WRITE A REVIEW → LOGIN
                     ↓
              REGISTER / FORGOT PASSWORD
                     ↓
              SECURITY ANALYSIS
                     ↓
              PHISHING EDUCATION
                     ↓
              ADMIN DASHBOARD
```

The presentation path is:

1. A convincing community website
2. An authentication prompt
3. A user interaction
4. A security reveal
5. Education on phishing indicators
6. Aggregated demo statistics

## Architecture

- **Frontend and backend:** Next.js App Router
- **Validation:** Zod + React Hook Form
- **Persistence:** Prisma + PostgreSQL for interaction metadata only
- **Fallback:** if the database is unavailable, the API keeps the same metadata in process memory so the local demo still works
- **UI:** Tailwind CSS, shadcn-style components, Lucide icons

## Database schema

```prisma
model ParticipantInteraction {
  id              String   @id @default(cuid())
  name            String?
  email           String?
  action          InteractionAction
  passwordEntered Boolean  @default(false)
  passwordLength  Int?
  sessionId       String
  createdAt       DateTime @default(now())
}

enum InteractionAction {
  LOGIN
  REGISTER
  PASSWORD_RESET
}
```

There is no password field in the database.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Community home page |
| `/reviews` | Fictional reviews, search, filters, pagination |
| `/reviews/write` | Redirects to login; reviews are never published |
| `/events` | Upcoming fictional events |
| `/login` | Simulated sign-in |
| `/register` | Simulated registration |
| `/forgot-password` | Simulated reset; no email is sent |
| `/security-demo` | Reveal and analysis dashboard |
| `/learn` | Phishing awareness education |
| `/admin` | Hackathon statistics dashboard |
| `POST /api/participants` | Store non-sensitive interaction metadata |
| `GET /api/participants` | Read demo statistics |
| `GET /api/reviews` | Return fictional reviews |

## How participant interactions are recorded

Login, register, and password-reset forms validate locally, then immediately discard the password. The client posts only:

```json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "action": "LOGIN",
  "passwordEntered": true,
  "passwordLength": 10,
  "sessionId": "abc123"
}
```

The server validates that payload with Zod and rejects any request that includes a password or other sensitive field.

## Installation

```bash
npm install
```

Copy the environment template and set a PostgreSQL URL:

```bash
cp .env.example .env
```

`.env.example`:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/build2learn_demo"
DIRECT_URL="postgresql://postgres:password@localhost:5432/build2learn_demo"
```

## Deploy on Vercel

Vercel does not host Postgres itself. Create a hosted database, then paste its URLs into the Vercel project.

### 1. Create Postgres

In the Vercel dashboard, open the project → **Storage** → **Create Database** → **Postgres** (Neon).  
Or create a free database at [Neon](https://neon.tech) or [Supabase](https://supabase.com).

Copy both URLs:

- `DATABASE_URL` — pooled connection (Neon host contains `-pooler`)
- `DIRECT_URL` — direct connection (no `-pooler`)

Neon example:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

### 2. Add env vars in Vercel

Project → **Settings** → **Environment Variables**. Add both names for Production, Preview, and Development. Redeploy after saving.

Do not commit `.env`. Vercel injects these values at build and runtime.

### 3. Deploy

Import the `build2learn-demo` Git repo in Vercel. Framework preset: Next.js. Root directory: repository root.

The build script already runs:

```bash
prisma generate && prisma migrate deploy && next build
```

`migrate deploy` creates the `ParticipantInteraction` table on first deploy.

### 4. Confirm

After deploy, submit a demo login and open `/admin`. If the row appears, the database is connected. If the table is missing, run `npx prisma migrate deploy` locally against the same `DIRECT_URL`.

## Database

```bash
npx prisma generate
npx prisma migrate dev
```

On Windows, stop `npm run dev` before running `prisma generate`. The query engine DLL stays locked while Next.js is running and will fail with `EPERM`.

If PostgreSQL is not running, the app still compiles and the demo can record metadata in memory for the current `next dev` process.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

## Scripts

```bash
npm run lint
npm run format
npx tsc --noEmit
```
