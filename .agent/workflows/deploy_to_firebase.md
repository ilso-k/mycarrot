---
description: How to deploy the Next.js application to Firebase Hosting
---

# Deploying to Firebase Hosting

This guide explains how to deploy your Next.js application to Firebase Hosting using the modern Web Frameworks support.

## Prerequisites

1.  **Firebase Project**: You must have a project created in the [Firebase Console](https://console.firebase.google.com/).
2.  **Blaze Plan (Pay-as-you-go)**: Since your app uses API Routes (`/api/articles`) and Server Components, Firebase will deploy these as Cloud Functions. **Cloud Functions require the Blaze plan.** (You get a generous free tier, but a credit card is required).

## Steps

### 1. Install Firebase CLI

Install the Firebase command-line tools globally:

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

Authenticate the CLI with your Google account:

```bash
firebase login
```

### 3. Initialize Hosting

Run the initialization command in your project root:

```bash
firebase init hosting
```

**Follow these prompts carefully:**

1.  **"Are you ready to proceed?"**: `Yes`
2.  **"Please select an option"**: `Use an existing project` (Select your `mycarrot` project)
3.  **"Detected an existing Next.js codebase. Do you want to use this?"**: `Yes`
4.  **"Set up automatic builds and deploys with GitHub?"**: `No` (You can set this up later if you want)

### 4. Deploy

Build and deploy your application:

```bash
firebase deploy
```

## Troubleshooting

*   **Plan Error**: If you see an error about "Cloud Functions" or "Billing", you need to upgrade your Firebase project to the **Blaze** plan in the console.
*   **Region**: If asked for a region for Cloud Functions, `us-central1` is the default and usually safe choice.
