# 🚀 Quick Start Guide

Get LinEnum.sh running in 5 minutes!

## For Local Development

```bash
# 1. Clone the repository
git clone https://github.com/thedr0pperx/linenum.sh.git
cd linenum.sh

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

# 4. Open your browser
# Visit http://localhost:3000
```

### Test Curl Functionality Locally

In a new terminal:

```bash
# Test the curl endpoint
curl -s http://localhost:3000 | bash

# You should see the rickroll message!
```

## For Production Deployment

### Quick Deploy to Vercel (Recommended)

1. **Fork the Repository**
   - Go to https://github.com/thedr0pperx/linenum.sh
   - Click "Fork" in the top right

2. **Deploy to Vercel**
   - Visit https://vercel.com/new
   - Import your forked repository
   - Click "Deploy"
   - Done! 🎉

3. **Add Vercel KV Database**
   - In Vercel project, go to "Storage" tab
   - Click "Create Database" → "KV"
   - Create and connect to your project

4. **Configure Custom Domain**
   - Go to project "Settings" → "Domains"
   - Add `linenum.sh`
   - Update your DNS records as instructed

## Environment Variables

### Development (Optional)

Create `.env.local`:

```env
# Leave empty for in-memory storage during development
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

### Production (Auto-configured by Vercel KV)

Vercel automatically sets these when you create a KV database:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

## Testing

### Test the Website

```bash
# Should show HTML
curl https://linenum.sh

# Should show rickroll script
curl -A "curl/7.68.0" https://linenum.sh
```

### Test in Browser

1. Visit https://linenum.sh
2. Copy the command from the box
3. Open terminal and paste
4. Watch your IP appear on the site!

## Common Issues

### Port Already in Use

```bash
# Kill process on port 3000
killall -9 node
# Or use different port
npm run dev -- -p 3001
```

### Dependencies Not Installing

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Check for TypeScript errors
npm run build

# Fix any errors shown
```

## Next Steps

- 📖 Read [README.md](./README.md) for full documentation
- 🚀 See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide
- 🤝 Check [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

## Need Help?

- 🐛 [Report a bug](https://github.com/thedr0pperx/linenum.sh/issues)
- 💡 [Request a feature](https://github.com/thedr0pperx/linenum.sh/issues)
- 💬 [Ask a question](https://github.com/thedr0pperx/linenum.sh/discussions)

---

Happy hacking (ethically)! 🎓🔒

