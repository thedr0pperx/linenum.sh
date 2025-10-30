# 🚨 SECURITY WARNING 🚨

## DO NOT COMMIT CREDENTIALS!

Your environment variables contain sensitive database credentials. These should NEVER be committed to Git.

### If you accidentally exposed credentials:

1. **IMMEDIATELY** go to Vercel Dashboard → Storage → Your Database
2. Click "Reset All Tokens"
3. Update your environment variables with new tokens
4. Redeploy your application

### Best Practices:

1. Use `.env.local` for local development (already in .gitignore)
2. Never share environment variables in GitHub issues
3. Use Vercel's environment variable UI for production
4. Rotate tokens regularly

### Check for exposed secrets:
```bash
git log --all --full-history -- "*.env*"
```

If you find any, remove them from Git history immediately.
