# 🚀 Deployment Guide for LinEnum.sh

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Repository should be on GitHub
3. **Domain**: Access to linenum.sh DNS settings

## Step 1: Fork & Import to Vercel

1. Fork the repository: https://github.com/thedr0pperx/linenum.sh
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your forked repository
5. Configure project settings:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Install Command: `npm install`

## Step 2: Set Up Vercel KV (Redis)

1. In your Vercel project dashboard, go to "Storage" tab
2. Click "Create Database"
3. Select "KV" (Redis-compatible)
4. Name it something like `linenum-kv`
5. Click "Create"
6. Vercel will automatically add these environment variables:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `KV_URL`

## Step 3: Configure Domain

### Add Domain to Vercel

1. In your project settings, go to "Domains"
2. Add `linenum.sh`
3. Vercel will provide DNS records to configure

### Update DNS Records

Add these records to your domain registrar (where you bought linenum.sh):

```
Type: A
Name: @
Value: 76.76.21.21
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Note**: DNS propagation can take up to 48 hours, but usually completes within 1-2 hours.

## Step 4: SSL Certificate

Vercel automatically provisions and renews SSL certificates using Let's Encrypt. No action needed!

## Step 5: Verify Deployment

### Test the Website

```bash
curl https://linenum.sh
```

You should see the HTML of the landing page.

### Test the Curl Endpoint

```bash
curl -s https://linenum.sh | bash
```

You should see the rickroll message!

### Test with User-Agent

```bash
curl -A "curl/7.68.0" https://linenum.sh
```

Should return the script content.

## Step 6: Monitor & Analytics

### Vercel Analytics

1. Go to your project's "Analytics" tab
2. Enable Web Analytics
3. View real-time traffic data

### Check Logs

1. Go to "Deployments" tab
2. Click on any deployment
3. View "Functions" logs to see curl requests

### KV Dashboard

1. Go to "Storage" tab
2. Select your KV database
3. Browse keys to see stored data:
   - `curl_events` - Recent curl attempts
   - `country_stats` - Country statistics
   - `curled_countries` - Set of countries

## Environment Variables

### Required (Auto-populated by Vercel KV)

- `KV_REST_API_URL` - Vercel KV endpoint
- `KV_REST_API_TOKEN` - Authentication token

### Optional

- `GEOLOCATION_API_KEY` - IP geolocation API key (optional, uses free tier by default)

## Production Checklist

- [ ] Vercel project created and deployed
- [ ] Vercel KV database created and connected
- [ ] Domain `linenum.sh` added to Vercel
- [ ] DNS records updated
- [ ] SSL certificate active (check https://linenum.sh)
- [ ] Curl endpoint works: `curl linenum.sh | bash`
- [ ] Web interface loads: https://linenum.sh
- [ ] Real-time stats updating
- [ ] GitHub repository public
- [ ] No secrets in repository
- [ ] README.md complete

## Troubleshooting

### DNS Not Resolving

```bash
# Check DNS propagation
dig linenum.sh
nslookup linenum.sh
```

Wait for propagation or clear DNS cache:
```bash
# On Linux
sudo systemd-resolve --flush-caches

# On macOS
sudo dscacheutil -flushcache
```

### Curl Not Triggering Script

Check the User-Agent detection in `/app/api/curl/route.ts`. The rewrite rule in `next.config.js` matches on curl user agents.

Test with explicit user agent:
```bash
curl -A "curl/7.68.0" https://linenum.sh
```

### KV Connection Errors

1. Check environment variables are set in Vercel
2. Verify KV database is in the same region as your functions
3. Check KV database status in Vercel dashboard

### Build Failures

Check the build logs in Vercel:
1. Go to "Deployments"
2. Click on failed deployment
3. View build logs
4. Fix errors and push changes

Common issues:
- Missing dependencies: Run `npm install` locally first
- TypeScript errors: Run `npm run build` locally to catch them
- Missing environment variables: Add them in Vercel project settings

## Scaling Considerations

### Free Tier Limits

Vercel Free Tier includes:
- 100GB bandwidth/month
- 100 serverless function executions/day
- 512MB serverless function memory

### Upgrade if Needed

If the site gets popular:
1. Upgrade to Vercel Pro ($20/month)
2. Increased limits:
   - 1TB bandwidth
   - Unlimited function executions
   - 1GB function memory

### Rate Limiting

Consider adding rate limiting to prevent abuse:

```typescript
// In app/api/curl/route.ts
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
});
```

## Support

For issues:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Open an issue on [GitHub](https://github.com/thedr0pperx/linenum.sh/issues)
3. Contact: thedr0pperx

---

🎉 **Congratulations!** Your educational security project is live!

Remember: The goal is to teach, not to harm. Keep the rickroll friendly! 😊

