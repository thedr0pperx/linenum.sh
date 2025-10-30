# 🏗️ LinEnum.sh - System Architecture

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User's Browser                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  linenum.sh (Next.js Frontend)                             │  │
│  │  • Matrix Background Animation                             │  │
│  │  • Curl Command Box + Copy Button                          │  │
│  │  • Live Feed (polls every 3s)                              │  │
│  │  • Leaderboard (polls every 5s)                            │  │
│  │  • World Map (polls every 10s)                             │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────┬────────────────────────────────────────────────────┘
             │
             │ HTTPS
             ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Vercel Edge Network                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Next.js App Router                                        │  │
│  │  • SSG: Main Page (/page.tsx)                              │  │
│  │  • Middleware: User-Agent Detection                        │  │
│  │  • Rewrites: curl → /api/curl                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  API Routes (Edge Functions)                               │  │
│  │  • /api/curl         → Serve rickroll script               │  │
│  │  • /api/curls/recent → Get last 10 events                  │  │
│  │  • /api/curls/leaderboard → Get top countries              │  │
│  │  • /api/curls/map    → Get curled countries                │  │
│  └───────────┬───────────────────────────────────────────────┘  │
└──────────────┼───────────────────────────────────────────────────┘
               │
               │
    ┌──────────┴──────────┐
    │                     │
    ↓                     ↓
┌─────────┐         ┌──────────┐
│ ipapi.co│         │ Vercel KV│
│  (Free) │         │ (Redis)  │
│         │         │          │
│ IP →    │         │ • events │
│ Country │         │ • stats  │
└─────────┘         │ • map    │
                    └──────────┘
```

## 🔄 Request Flow

### Flow 1: Normal Browser Visit

```
User Browser
    │
    ↓
https://linenum.sh
    │
    ↓
Next.js detects normal user-agent
    │
    ↓
Render main page (SSG)
    │
    ↓
Return HTML with React components
    │
    ↓
Components start polling APIs every 3-10s
    │
    ↓
Display live statistics
```

### Flow 2: Curl Request

```
Terminal (curl linenum.sh | bash)
    │
    ↓
User-Agent: curl/7.68.0
    │
    ↓
Next.js middleware detects curl
    │
    ↓
Rewrite: / → /api/curl
    │
    ├──→ Extract IP from headers
    │    (x-forwarded-for or x-real-ip)
    │
    ├──→ Call ipapi.co API
    │    IP → {country, countryCode}
    │
    ├──→ Store in Vercel KV:
    │    • LPUSH curl_events
    │    • HINCRBY country_stats
    │    • SADD curled_countries
    │
    └──→ Return bash script
         (warning + rickroll)
    │
    ↓
User's terminal displays output
```

### Flow 3: Real-time Updates

```
Frontend Component (LiveCurlFeed)
    │
    ↓
useEffect with interval (3s)
    │
    ↓
GET /api/curls/recent
    │
    ↓
Vercel Edge Function
    │
    ↓
LRANGE curl_events 0 9
    │
    ↓
Vercel KV returns data
    │
    ↓
Parse and return JSON
    │
    ↓
Component updates state
    │
    ↓
React re-renders with new data
```

## 🗄️ Data Storage Schema

### Vercel KV (Redis) Keys

```
curl_events (LIST)
├─ Index 0: {"ip":"1.2.3.4","country":"US","countryCode":"US","timestamp":1234567890,"userAgent":"curl/7.68.0"}
├─ Index 1: {"ip":"5.6.7.8","country":"UK","countryCode":"GB","timestamp":1234567880,"userAgent":"curl/8.0.0"}
└─ ... (up to 100 entries, auto-trimmed)

country_stats (HASH)
├─ "US": 42
├─ "GB": 38
├─ "DE": 25
└─ ... (all countries)

curled_countries (SET)
├─ "US"
├─ "GB"
├─ "DE"
└─ ... (unique country codes)
```

## 🔧 Component Hierarchy

```
app/layout.tsx (Root Layout)
│
├─ MatrixBackground (Canvas animation)
├─ Toaster (Notifications)
│
└─ app/page.tsx (Main Page)
    │
    ├─ Header
    │   ├─ Title: "LinEnum.sh"
    │   └─ Subtitle: "Don't Be a Dumbass"
    │
    ├─ CurlCommandBox
    │   ├─ OS Dropdown (Linux/macOS/Unix)
    │   ├─ Shell Dropdown (bash/sh/zsh/ksh)
    │   ├─ Command Display (selectable)
    │   └─ Copy Button (with toast)
    │
    ├─ Info Section
    │   ├─ Educational content
    │   └─ Security warnings
    │
    ├─ Stats Grid
    │   ├─ LiveCurlFeed
    │   │   ├─ Polls /api/curls/recent
    │   │   └─ Displays last 10 events
    │   │
    │   └─ Leaderboard
    │       ├─ Polls /api/curls/leaderboard
    │       └─ Displays top 10 countries
    │
    ├─ WorldMap
    │   ├─ Polls /api/curls/map
    │   └─ Displays country flags
    │
    ├─ Safety Section
    │   └─ Best practices guide
    │
    └─ Footer
        └─ GitHub link + credits
```

## 🎨 Styling Architecture

### Tailwind Configuration

```
tailwind.config.ts
│
├─ Colors
│   └─ matrix
│       ├─ green: #00FF41 (primary)
│       ├─ accent: #00CC33
│       ├─ dark: #F5F5F5 (light bg)
│       └─ darker: #FFFFFF
│
├─ Fonts
│   ├─ sans: Inter
│   └─ mono: JetBrains Mono
│
└─ Animations
    ├─ pulse-slow
    └─ glow
```

### Global Styles

```
app/globals.css
│
├─ Base Styles
│   ├─ Light background
│   └─ Dark text
│
└─ Component Classes
    ├─ .cyber-btn (green button)
    ├─ .cyber-card (bordered card)
    ├─ .code-box (terminal-style)
    ├─ .terminal (code display)
    └─ .glow-text (green shadow)
```

## 🚀 Deployment Architecture

```
GitHub Repository
    │
    ↓
Vercel Git Integration
    │
    ↓
Build Process
│
├─ npm install
├─ npm run build
└─ Generate static pages
    │
    ↓
Deploy to Edge Network
│
├─ Static Assets → CDN
├─ API Routes → Edge Functions
└─ Pages → Edge SSR
    │
    ↓
Custom Domain (linenum.sh)
│
└─ SSL Certificate (Let's Encrypt)
```

## 🔐 Security Layers

### 1. Request Validation

```
Incoming Request
    │
    ↓
Check User-Agent header
    │
    ├─ Browser → Serve HTML
    └─ Curl → Serve script
```

### 2. Data Privacy

```
IP Address
    │
    ├─ Geolocation only
    ├─ No personal data
    └─ Aggregated statistics
```

### 3. Code Safety

```
Bash Script
    │
    ├─ No system commands
    ├─ Only echo statements
    └─ Harmless ASCII art
```

## ⚡ Performance Optimizations

### 1. Static Generation

- Main page is pre-rendered at build time
- Served directly from CDN
- No server computation needed

### 2. Edge Functions

- API routes run on Edge Network
- Low latency worldwide
- Automatic scaling

### 3. Caching Strategy

```
Browser → CDN Cache → Edge Function → KV Database
   ↑                                      ↑
   └── Revalidate every 3-10s ───────────┘
```

### 4. Polling vs WebSockets

**Why Polling?**
- Simpler implementation
- No connection management
- Works with serverless
- Good enough for this use case

**Intervals:**
- Live Feed: 3s
- Leaderboard: 5s
- Map: 10s

## 🔄 State Management

### Client-Side State

```
React useState
│
├─ CurlCommandBox
│   ├─ os: string
│   └─ shell: string
│
├─ LiveCurlFeed
│   ├─ events: CurlEvent[]
│   └─ loading: boolean
│
├─ Leaderboard
│   ├─ leaderboard: Entry[]
│   └─ loading: boolean
│
└─ WorldMap
    ├─ countries: string[]
    └─ loading: boolean
```

### Server-Side State

```
Vercel KV (Persistent)
│
├─ Recent Events (100 items)
├─ Country Stats (all time)
└─ Curled Countries (set)
```

## 📦 Build Output

```
.next/
│
├─ static/
│   ├─ chunks/ (JavaScript bundles)
│   └─ css/ (Tailwind output)
│
├─ server/
│   ├─ app/
│   │   ├─ page.html (SSG)
│   │   └─ api/ (Edge Functions)
│   └─ middleware.js
│
└─ package.json
```

## 🌍 Edge Network

```
User Location → Nearest Edge Node

Americas          Europe            Asia
   │                 │                │
   ↓                 ↓                ↓
US East          Frankfurt         Tokyo
US West          London            Singapore
Canada           Amsterdam         Mumbai
Brazil           Paris             Seoul

All nodes have:
• Static assets (CDN)
• Edge functions (API routes)
• Low latency (<50ms)
```

## 🔍 Monitoring Points

### 1. Application

- Page views (Vercel Analytics)
- API requests (Function logs)
- Error rate (Vercel dashboard)

### 2. Infrastructure

- Edge function execution time
- KV database operations
- Build success rate

### 3. Business

- Total curls today/week/month
- Top countries
- Growth trends

---

## 📈 Scalability

### Current Limits (Vercel Free)

- 100GB bandwidth/month
- Unlimited requests
- 10 GB-hours function execution

### If Growth Needed

1. **Upgrade to Pro** ($20/month)
   - 1TB bandwidth
   - Unlimited everything

2. **Add Rate Limiting**
   - Prevent abuse
   - @upstash/ratelimit

3. **Add Caching**
   - Cache geolocation
   - Reduce API calls

4. **Optimize Polling**
   - Use WebSockets
   - Server-Sent Events

---

This architecture is designed to be:
- ✅ **Scalable**: Handles growth automatically
- ✅ **Reliable**: Edge Network redundancy
- ✅ **Fast**: Sub-second response times
- ✅ **Secure**: No sensitive data stored
- ✅ **Maintainable**: Clean code structure
- ✅ **Educational**: Clear learning tool

**Built with ❤️ for security education!** 🎓🔒

