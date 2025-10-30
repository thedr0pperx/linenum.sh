# 📋 LinEnum.sh - Project Overview

## 🎯 Project Purpose

LinEnum.sh is an educational security project that teaches developers and security professionals why they should never blindly execute scripts from the internet. When users run `curl linenum.sh | bash`, they receive a harmless rickroll and educational message instead of a malicious script.

## 🏗️ Architecture

### Technology Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with Matrix theme (inverted for light mode)
- **Database**: Vercel KV (Redis) for real-time statistics
- **Deployment**: Vercel Edge Functions
- **Language**: TypeScript
- **Geolocation**: ipapi.co (free tier)

### Project Structure

```
linenum.sh/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── curl/                 # Main curl endpoint
│   │   │   └── route.ts          # Returns rickroll script
│   │   └── curls/                # Statistics endpoints
│   │       ├── recent/route.ts   # Last 10 curl events
│   │       ├── leaderboard/route.ts  # Top countries
│   │       └── map/route.ts      # Countries that curled
│   ├── globals.css               # Global styles (Matrix theme)
│   ├── layout.tsx                # Root layout with SEO
│   ├── page.tsx                  # Main landing page
│   ├── robots.ts                 # SEO robots configuration
│   └── sitemap.ts                # Dynamic sitemap
├── components/                   # React components
│   ├── CurlCommandBox.tsx        # Command box with copy button
│   ├── Leaderboard.tsx           # Top 10 countries
│   ├── LiveCurlFeed.tsx          # Recent curl events
│   ├── MatrixBackground.tsx      # Animated background
│   └── WorldMap.tsx              # Country visualization
├── lib/                          # Utilities
│   ├── geolocation.ts            # IP to country lookup
│   └── storage.ts                # KV database operations
├── public/                       # Static assets
│   └── robots.txt                # SEO robots file
├── .env.example                  # Environment variables template
├── CONTRIBUTING.md               # Contribution guidelines
├── DEPLOYMENT.md                 # Detailed deployment guide
├── LICENSE                       # MIT License
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── QUICKSTART.md                 # Quick start guide
├── README.md                     # Main documentation
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── vercel.json                   # Vercel deployment config
```

## 🔄 How It Works

### 1. User Visits Website

1. User navigates to `https://linenum.sh` in browser
2. Main page loads with:
   - Curl command box with copy button
   - Real-time feed of recent curls
   - Leaderboard of top countries
   - World map visualization
   - Educational content about security

### 2. User Curls the Site

1. User runs: `curl linenum.sh | bash`
2. Next.js detects curl user-agent via middleware rewrite
3. Request routed to `/api/curl` endpoint
4. Backend:
   - Extracts IP address from request headers
   - Performs geolocation lookup (ipapi.co)
   - Stores event in Vercel KV:
     - `curl_events` list (recent events)
     - `country_stats` hash (country counts)
     - `curled_countries` set (unique countries)
   - Returns bash script with:
     - Warning message
     - ASCII art rickroll
     - Educational tips

### 3. Real-time Updates

1. Components poll API endpoints every 3-10 seconds
2. Frontend fetches:
   - `/api/curls/recent` - Last 10 events
   - `/api/curls/leaderboard` - Top 10 countries
   - `/api/curls/map` - All countries that curled
3. UI updates automatically with new data

## 🎨 Design & Theme

### Matrix Theme (Light Mode)

The project uses an inverted Matrix theme:
- **Background**: White/Light gray
- **Primary Color**: Matrix Green (#00FF41)
- **Text**: Dark gray (#0F0F0F)
- **Accents**: Green borders and shadows

### Key Visual Elements

1. **Matrix Rain Background**
   - Animated falling characters
   - Low opacity (10%) for subtle effect
   - Pure CSS/Canvas animation

2. **Cyber/Terminal Aesthetic**
   - Monospace fonts (JetBrains Mono)
   - Code-style boxes
   - Green glow effects
   - Terminal-like command display

3. **Responsive Design**
   - Mobile-first approach
   - Grid layouts for statistics
   - Adaptive typography

## 🔐 Security & Privacy

### What We Log

- IP address (for geolocation only)
- Country and country code
- Timestamp
- User agent string
- **We DO NOT log:**
  - Personal information
  - Cookies
  - System details
  - Command output

### Data Storage

- **Development**: In-memory storage (ephemeral)
- **Production**: Vercel KV (encrypted at rest)
- **Retention**: Last 100 events, aggregated statistics
- **Access**: Only through public API endpoints

### No Malicious Code

- Script is completely harmless
- Only outputs text to terminal
- No system modifications
- No data exfiltration
- Open source for verification

## 📊 API Reference

### GET /api/curl

**Purpose**: Main endpoint for curl requests

**Headers Required**:
- `User-Agent: curl/*` (or wget, httpie)

**Response**: 
- Content-Type: `text/plain`
- Body: Bash script with rickroll

**Side Effects**:
- Logs curl event to database
- Performs geolocation lookup

### GET /api/curls/recent

**Purpose**: Get last 10 curl events

**Response**:
```json
{
  "events": [
    {
      "ip": "1.2.3.4",
      "country": "United States",
      "countryCode": "US",
      "timestamp": 1234567890,
      "userAgent": "curl/7.68.0"
    }
  ]
}
```

### GET /api/curls/leaderboard

**Purpose**: Get top 10 countries by curl count

**Response**:
```json
{
  "leaderboard": [
    {
      "country": "United States",
      "countryCode": "US",
      "count": 42
    }
  ]
}
```

### GET /api/curls/map

**Purpose**: Get all countries that have curled

**Response**:
```json
{
  "countries": ["US", "GB", "DE", "FR"]
}
```

## 🚀 Deployment Flow

### Local Development

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Connect GitHub repository
   - Auto-detects Next.js
   - Deploys to `*.vercel.app`

3. **Add KV Database**
   - Create in Vercel dashboard
   - Environment variables auto-populate

4. **Add Custom Domain**
   - Configure `linenum.sh` in settings
   - Update DNS records
   - SSL auto-provisioned

## 🔧 Configuration

### Environment Variables

**Development** (.env.local):
```env
# Optional - uses in-memory storage if not set
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

**Production** (Vercel):
```env
# Auto-populated by Vercel KV
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
```

### Next.js Config

Key configurations in `next.config.js`:

```javascript
rewrites() {
  return [
    {
      source: '/',
      destination: '/api/curl',
      has: [
        {
          type: 'header',
          key: 'user-agent',
          value: '.*(curl|wget|httpie).*',
        },
      ],
    },
  ];
}
```

This rewrites root requests with curl user-agent to the API endpoint.

## 📈 Performance

### Optimization Strategies

1. **Edge Functions**: API routes run on Vercel Edge Network
2. **Static Generation**: Main page is statically generated
3. **Client-side Polling**: Real-time updates without WebSockets
4. **Redis Caching**: Fast data retrieval from Vercel KV
5. **Geolocation Caching**: IP lookups cached for 1 hour

### Expected Load

- **Low Traffic**: Free tier handles ~100 requests/day easily
- **Medium Traffic**: 1K requests/day - still free tier
- **High Traffic**: 10K+ requests/day - consider Pro plan

## 🎓 Educational Goals

### What Users Learn

1. **Security Awareness**
   - Never execute unreviewed scripts
   - Check source code first
   - Understand curl piping risks

2. **Safe Practices**
   - Download scripts first
   - Review before executing
   - Verify checksums
   - Use trusted sources

3. **Fun Learning**
   - Rickroll as memorable lesson
   - No shame, just education
   - Shareable experience

## 🛠️ Maintenance

### Regular Tasks

- Monitor Vercel KV storage usage
- Check error logs in Vercel dashboard
- Update dependencies monthly
- Review and merge security updates

### Monitoring

- Vercel Analytics: Track page views
- KV Dashboard: Monitor database size
- Function Logs: Debug errors
- GitHub Issues: User feedback

## 📝 Future Enhancements

Potential improvements:

1. **Better Map**: D3.js world map visualization
2. **More Stats**: Time-based analytics
3. **Webhooks**: Discord/Slack notifications
4. **A/B Testing**: Different rickroll variants
5. **Internationalization**: Multi-language support
6. **API Rate Limiting**: Prevent abuse
7. **Historical Data**: Long-term statistics

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Code style guidelines
- Development setup
- Pull request process
- What we're looking for

## 📚 Documentation

- **README.md**: Main documentation
- **QUICKSTART.md**: 5-minute setup guide
- **DEPLOYMENT.md**: Detailed deployment instructions
- **CONTRIBUTING.md**: Contribution guidelines
- **PROJECT_OVERVIEW.md**: This file

## 🙋 Support

- **GitHub Issues**: Bug reports and features
- **GitHub Discussions**: Questions and ideas
- **Email**: Contact @thedr0pperx

---

**Remember**: The goal is education, not exploitation. Keep it fun, keep it safe! 🎓🔒

