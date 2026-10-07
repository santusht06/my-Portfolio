# Santusht's Portfolio (`santusht.online`)

Modern portfolio with a serverless edge backend and high-performance React frontend.

## Architecture

- **Frontend**: React 19 + Vite SPA, Tailwind CSS, GSAP / Framer Motion, Redux Toolkit — hosted on **Vercel**
- **Backend**: Cloudflare Worker edge function — serverless, 0ms cold starts, zero local server dependency
- **Database**: Supabase PostgreSQL — real-time, managed database with Row-Level Security
- **Domain**: Hosted on `santusht.online` across both Vercel & Cloudflare Workers

---

## Project Structure

```
my-Portfolio/
├── frontend/             # React 19 + Vite frontend (Vercel)
│   ├── src/
│   │   ├── lib/blogApi.js# Backend Worker API client
│   │   ├── store/        # Redux Toolkit global store
│   │   └── pages/        # Views (Home, Work, Blog, Resume, Contact)
│   └── vercel.json       # Vercel SPA routing & caching config
├── backend/              # Cloudflare Worker edge API
│   ├── src/index.js      # Worker entrypoint (Blogs, Mail, Quote)
│   ├── wrangler.jsonc    # Cloudflare Wrangler configuration
│   └── scripts/          # Database migration & asset upload utilities
├── supabase/             # Supabase PostgreSQL schema migrations
└── vercel.json           # Root Vercel build configuration
```

---

## Local Development

### 1. Run Cloudflare Worker Backend
```bash
cd backend
npm run dev
# Running on http://127.0.0.1:8787
```

### 2. Run Frontend
```bash
cd frontend
npm run dev
# Running on http://localhost:5173 (proxies /api to 127.0.0.1:8787)
```

---

## Production Deployment

### 1. Deploy Backend (Cloudflare Workers)
```bash
cd backend
npx wrangler login       # One-time login
npm run worker:deploy    # Deploys to Cloudflare edge
```

### 2. Deploy Frontend (Vercel)
1. Push repository to GitHub.
2. Import project in Vercel.
3. Build Command: `npm --prefix frontend run build`
4. Output Directory: `frontend/dist`

### 3. Same-Domain Setup (`santusht.online`)
To serve both Frontend and Backend under `santusht.online`:
1. In Cloudflare DNS for `santusht.online`:
   - Point root CNAME `@` to `cname.vercel-dns.com` (Proxied through Cloudflare).
2. In Cloudflare Workers:
   - Add Route: `santusht.online/api/*` pointing to `santusht-portfolio-api`.
- Result:
  - `santusht.online/` → Vercel (Frontend)
  - `santusht.online/api/*` → Cloudflare Worker (Backend)
  - Same origin, zero CORS overhead!

---

## API Endpoints (Cloudflare Worker)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/test` | Health check endpoint |
| `GET` | `/api/v1/blogs` | List published blogs with category filter, search, & pagination |
| `GET` | `/api/v1/blogs/:slug` | Retrieve single blog post & increment view count |
| `POST` | `/api/v1/blogs/:slug/like` | Atomically increment likes |
| `GET` | `/api/v1/blogs/categories` | Get category breakdown & post counts |
| `GET` | `/api/v1/quote` | ZenQuotes edge proxy |
| `POST` | `/api/v1/sendmail` | Store contact messages in Supabase |