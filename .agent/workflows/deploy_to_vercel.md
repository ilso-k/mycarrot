---
description: How to deploy the Next.js application to Vercel
---

# Deploying to Vercel

This guide explains how to deploy your Next.js application to Vercel, which is the recommended hosting platform for Next.js.

## Prerequisites

1.  **GitHub Account**: You need a GitHub account to host your code.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.

## Steps

### 1. Push your code to GitHub

If you haven't already pushed your code to GitHub, follow these steps in your terminal:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Ready for deployment"

# Create a new repository on GitHub website, then follow the instructions to push:
# git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
# git branch -M main
# git push -u origin main
```

### 2. Import Project in Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Find your GitHub repository in the list and click **"Import"**.

### 3. Configure Environment Variables

**Crucial Step**: You must add your Firebase configuration keys so the deployed app can access the database.

1.  In the "Configure Project" screen, find the **"Environment Variables"** section.
2.  Open your local `.env.local` file.
3.  Copy each variable name and value into Vercel.
    *   `NEXT_PUBLIC_FIREBASE_API_KEY`
    *   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    *   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    *   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    *   `NEXT_PUBLIC_FIREBASE_APP_ID`

### 4. Deploy

1.  Click **"Deploy"**.
2.  Wait for the build to complete (usually 1-2 minutes).
3.  Once finished, you will get a live URL (e.g., `https://your-project.vercel.app`).

## Updates

Whenever you push new code to your GitHub repository, Vercel will automatically redeploy your application with the changes.
