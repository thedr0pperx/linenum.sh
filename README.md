# 🎯 LinEnum.sh - Don't Be a Dumbass

[![Educational Security Project](https://img.shields.io/badge/Security-Educational-green)](https://linenum.sh)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

> **Scripted Local Linux Enumeration & Privilege Escalation Checks**  
> An educational security project teaching developers and security professionals why they should **never blindly execute scripts from the internet**.

## 🚨 The Problem

Every day, countless tutorials and documentation tell users to run commands like:

```bash
curl https://some-website.com/install.sh | bash
```

This is **extremely dangerous**. When you do this, you're:

- ❌ Executing code you haven't reviewed
- ❌ Trusting a remote server completely
- ❌ Potentially compromising your entire system
- ❌ Opening yourself to credential theft
- ❌ Allowing backdoor installation
- ❌ Risking malware or ransomware infection

## 💡 The Solution

**LinEnum.sh** demonstrates this risk in a harmless, educational way. When you run:

```bash
curl linenum.sh | bash
```

Instead of a malicious script, you get:
1. A clear warning message about the dangers
2. A friendly ASCII art Rickroll
3. Your IP address logged (for educational statistics)

No harm done - just a valuable lesson learned! 🎓

## 🛡️ The Right Way

Always review scripts before executing them:

```bash
# ✅ DO THIS:
curl https://example.com/script.sh -o script.sh
cat script.sh  # Review the contents!
vim script.sh  # Or use your preferred editor
chmod +x script.sh
./script.sh

# ❌ DON'T DO THIS:
curl https://example.com/script.sh | bash
```

## 🌍 Features

- **Real-time Tracking**: See who's falling for the trap in real-time
- **Global Statistics**: Leaderboard showing which countries have the most "victims"
- **World Map**: Visual representation of curl attempts worldwide
- **Educational Content**: Clear explanations of why this practice is dangerous
- **Open Source**: Full transparency - review our code before you judge!

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with Matrix-inspired theme (inverted for light mode)
- **Database**: Vercel KV (Redis) for real-time statistics
- **Geolocation**: IP-based country detection
- **Deployment**: Vercel Edge Functions
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/thedr0pperx/linenum.sh.git
cd linenum.sh
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your Vercel KV credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
# Vercel KV (Redis) - Get these from Vercel dashboard
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token

# Optional: IP Geolocation API
GEOLOCATION_API_KEY=your_api_key
```

## 📦 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/thedr0pperx/linenum.sh)

1. Fork this repository
2. Import to Vercel
3. Add a Vercel KV database in your project
4. Deploy!

The environment variables will be automatically populated by Vercel KV.

### Custom Domain

1. Add your domain in Vercel project settings
2. Update DNS records as instructed by Vercel
3. Wait for SSL certificate provisioning

## 🎨 Customization

The project uses a Matrix-inspired theme adapted for light backgrounds. Colors are defined in `tailwind.config.ts`:

```typescript
colors: {
  matrix: {
    green: '#00FF41',
    dark: '#F5F5F5',
    darker: '#FFFFFF',
    accent: '#00CC33',
    border: '#00FF4180',
  }
}
```

## 🔒 Security & Privacy

- **No Private Data**: We only log IP addresses and countries
- **No Tracking Cookies**: No third-party analytics or tracking
- **Open Source**: Full transparency - all code is public
- **Educational Purpose**: Data used only for demonstration

## 📊 API Endpoints

- `GET /` - Main website (or rickroll script if curl)
- `GET /api/curl` - Rickroll script endpoint
- `GET /api/curls/recent` - Last 10 curl events
- `GET /api/curls/leaderboard` - Top 10 countries
- `GET /api/curls/map` - Countries that have curled

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**thedr0pperx**

- GitHub: [@thedr0pperx](https://github.com/thedr0pperx)
- Website: [linenum.sh](https://linenum.sh)

## 🙏 Acknowledgments

- Original LinEnum.sh project (the real enumeration script)
- [rickrollrc](https://github.com/keroserene/rickrollrc) for terminal rickroll inspiration
- Security community for teaching proper script execution practices

## ⚠️ Disclaimer

This is an educational project. The "rickroll" is harmless and meant to teach a valuable security lesson. No malicious code is ever executed. Always review code before running it on your system.

---

**Remember**: Friends don't let friends pipe curl to bash! 🚫

If you learned something from this project, give it a ⭐ and share it with others!

