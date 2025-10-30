# Database Setup Instructions

## 🚨 IMPORTANT: Setting up Vercel KV (Redis)

### Step 1: Create Upstash Redis Database
1. Go to Vercel Dashboard → Your Project
2. Click on "Storage" tab
3. Click "Browse Marketplace"
4. Click on **Upstash** (NOT Edge Config!)
5. Select **Redis** option
6. Create database with any name (e.g., `linenum-kv`)

### Step 2: Connect to Your Project
1. After creation, click "Connect Project"
2. Select your `linenum.sh` project
3. Select all environments: Production, Preview, Development
4. Click "Connect"

### Step 3: Verify Environment Variables
1. Go to Project Settings → Environment Variables
2. You should see TWO variables auto-populated:
   - `KV_REST_API_URL` (starts with https://)
   - `KV_REST_API_TOKEN` (long hex string)
3. If missing, copy from Storage → Your Redis DB → ".env.local" tab

### Step 4: Redeploy
1. Go to Deployments tab
2. Click "..." on latest deployment → "Redeploy"
3. Wait for deployment to complete

### Step 5: Test
Visit: https://your-domain.vercel.app/api/debug

You should see:
```json
{
  "kvConfigured": true,
  "kvUrl": "SET",
  "kvToken": "SET",
  ...
}
```

## Troubleshooting

### Data not showing?
1. Check `/api/debug` - if `kvConfigured` is false, environment variables are missing
2. Check Vercel logs for any KV connection errors
3. Ensure you're using Upstash Redis, NOT Edge Config

### Different data on mobile vs desktop?
This is likely a caching issue. The fixes in the latest version should resolve this.
