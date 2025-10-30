# 📦 Installation Instructions for LinEnum.sh

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **Git** ([Download](https://git-scm.com/))
- A **Vercel account** (free) - [Sign up](https://vercel.com/signup)

## 🚀 Quick Install (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/thedr0pperx/linenum.sh.git
cd linenum.sh
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- Tailwind CSS
- TypeScript
- Vercel KV client
- date-fns
- react-hot-toast

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

### 4. Test the Curl Functionality

Open a new terminal and run:

```bash
curl -s http://localhost:3000 | bash
```

You should see the rickroll message! 🎵

---

## 🌐 Production Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Import Repository

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **"Import Project"**
3. Select **"Import Git Repository"**
4. Enter: `https://github.com/thedr0pperx/linenum.sh`
5. Click **"Import"**

#### Step 2: Configure Project

Vercel will auto-detect Next.js settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

Click **"Deploy"**

#### Step 3: Add Vercel KV Database

1. In your project dashboard, click **"Storage"** tab
2. Click **"Create Database"**
3. Select **"KV"** (Redis)
4. Name it: `linenum-kv`
5. Click **"Create"**
6. Click **"Connect"** to link it to your project

Environment variables will be automatically added:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

#### Step 4: Configure Custom Domain

1. Go to **"Settings"** → **"Domains"**
2. Add `linenum.sh`
3. Update your DNS records (see below)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Follow the prompts to link/create your project.

---

## 🌍 DNS Configuration

Update your DNS records at your domain registrar:

### A Record
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

### CNAME Record
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Note**: DNS propagation can take 5-60 minutes.

---

## 🔧 Environment Variables

### Local Development (.env.local)

Create a `.env.local` file in the root directory:

```env
# Optional - Leave empty to use in-memory storage for development
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Optional - IP Geolocation API key
GEOLOCATION_API_KEY=
```

### Production (Vercel)

Environment variables are **automatically set** when you create a Vercel KV database:

- ✅ `KV_REST_API_URL` - Auto-populated
- ✅ `KV_REST_API_TOKEN` - Auto-populated

No manual configuration needed!

---

## 🧪 Testing

### Test Locally

```bash
# Start the dev server
npm run dev

# In a new terminal, test curl
curl -s http://localhost:3000 | bash
```

### Test Production

```bash
# Test website loads
curl https://linenum.sh

# Test curl endpoint
curl -s https://linenum.sh | bash

# Test with explicit user-agent
curl -A "curl/7.68.0" https://linenum.sh
```

---

## 📋 Available Scripts

```bash
# Development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server locally
npm run start

# Run ESLint
npm run lint
```

---

## 🐛 Troubleshooting

### Issue: "Port 3000 is already in use"

**Solution:**
```bash
# Kill the process using port 3000
killall -9 node

# Or run on a different port
npm run dev -- -p 3001
```

### Issue: "Cannot find module '@vercel/kv'"

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Build fails with TypeScript errors"

**Solution:**
```bash
# Check for errors locally
npm run build

# Fix any TypeScript errors shown
# Then commit and push again
```

### Issue: "Curl returns HTML instead of script"

**Cause:** User-agent detection not working

**Solution:**
```bash
# Test with explicit curl user-agent
curl -A "curl/7.68.0" https://linenum.sh

# Check next.config.js rewrite rules
```

### Issue: "Statistics not updating"

**Causes:**
1. Vercel KV not connected
2. Environment variables missing
3. API routes failing

**Solution:**
1. Check Vercel KV is created and connected
2. Verify environment variables in Vercel dashboard
3. Check function logs in Vercel dashboard

---

## 📁 Project Structure

```
linenum.sh/
├── app/                      # Next.js App Router
│   ├── api/                  # API endpoints
│   │   ├── curl/            # Rickroll script endpoint
│   │   └── curls/           # Statistics endpoints
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page
│   ├── robots.ts            # SEO robots
│   └── sitemap.ts           # SEO sitemap
├── components/              # React components
│   ├── CurlCommandBox.tsx
│   ├── Leaderboard.tsx
│   ├── LiveCurlFeed.tsx
│   ├── MatrixBackground.tsx
│   └── WorldMap.tsx
├── lib/                     # Utilities
│   ├── geolocation.ts       # IP lookup
│   └── storage.ts           # KV operations
├── public/                  # Static files
├── .env.local              # Local environment (create this)
├── .gitignore              # Git ignore rules
├── next.config.js          # Next.js config
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind config
├── tsconfig.json           # TypeScript config
└── vercel.json             # Vercel config
```

---

## ✅ Post-Installation Checklist

After installation, verify everything works:

- [ ] `npm run dev` starts successfully
- [ ] Website loads at http://localhost:3000
- [ ] `curl localhost:3000 | bash` shows rickroll
- [ ] Deployed to Vercel
- [ ] Vercel KV database created and connected
- [ ] Custom domain `linenum.sh` added
- [ ] DNS records updated
- [ ] `curl linenum.sh` works in production
- [ ] Live statistics update on the website

---

## 🔄 Updating the Project

```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Restart dev server
npm run dev
```

For production, Vercel will automatically redeploy when you push to main.

---

## 📚 Additional Documentation

- **README.md** - Project overview and features
- **QUICKSTART.md** - 5-minute setup guide
- **DEPLOYMENT.md** - Detailed deployment guide
- **ARCHITECTURE.md** - Technical architecture
- **CONTRIBUTING.md** - How to contribute
- **GET_STARTED.md** - Complete walkthrough

---

## 🆘 Need Help?

### Documentation
- All docs are in the repository
- Check DEPLOYMENT.md for detailed steps
- Read TROUBLESHOOTING section above

### Support
- **GitHub Issues**: [Report bugs](https://github.com/thedr0pperx/linenum.sh/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/thedr0pperx/linenum.sh/discussions)
- **Email**: Contact @thedr0pperx

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🎉 You're All Set!

Your LinEnum.sh project is now installed and ready to educate the world about secure script execution practices!

**Quick Start Commands:**
```bash
npm install    # Install dependencies
npm run dev    # Start development server
npm run build  # Build for production
```

**Remember**: The goal is education, not exploitation. Have fun and make the web more secure! 🔒

---

Made with 💚 by [@thedr0pperx](https://github.com/thedr0pperx)

**Now go forth and teach proper script execution! 🚀**

