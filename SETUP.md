# Setup Guide

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

---

## Supabase Setup

### 1. Create Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click **New Project**
4. Enter project name and database password (save this!)
5. Wait for project to be created (~2 minutes)

### 2. Get Credentials

Go to **Project Settings** → **API**:

- `SUPABASE_URL` = **Project URL** (e.g., `https://xyzabc.supabase.co`)
- `SUPABASE_ANON_KEY` = **anon public** key (the long string)

Go to **Project Settings** → **Database**:

- `DATABASE_URL` = **Connection string** (URI format)
  - Click "URI" tab
  - Copy the connection string
  - Replace `[YOUR-PASSWORD]` with your database password

Example:
```
DATABASE_URL=postgresql://postgres.xzyabc:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Note your project name (e.g., `family-hub`)

### 2. Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type
3. Fill in required fields:
   - App name: `Family Hub`
   - User support email: your email
   - Developer contact: your email
4. Click through scopes (use defaults or add `openid`, `email`, `profile`)
5. Add yourself as a **Test user** (important for development!)

### 3. Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
5. Click **Create**
6. Copy:
   - `GOOGLE_CLIENT_ID` = **Client ID**
   - `GOOGLE_CLIENT_SECRET` = **Client Secret**

### 4. Enable Google Calendar API (for calendar sync)

1. Go to **APIs & Services** → **Library**
2. Search for "Google Calendar API"
3. Click **Enable**
4. Wait a few minutes for the API to activate

Or enable directly: https://console.cloud.google.com/apis/library/calendar-json.googleapis.com

---

## NextAuth Secret

Generate a random secret:

```bash
openssl rand -base64 32
```

Set `NEXTAUTH_SECRET` to the output.

---

## Production Deployment

When deploying (e.g., Vercel):

1. Add all environment variables in your hosting platform's settings
2. Update `NEXTAUTH_URL` to your production URL
3. Add production redirect URI to Google OAuth credentials

---

## Troubleshooting

### "Access Denied" on Google Sign In

- Make sure your email is added as a **Test user** in Google OAuth consent screen
- Go to **APIs & Services** → **OAuth consent screen** → **Test users** → **Add users**

### "MissingSecret" Error

- Ensure `NEXTAUTH_SECRET` is set in `.env`
- Restart the dev server after adding

### Database Connection Errors

- Verify `DATABASE_URL` has the correct password
- Check that the password doesn't have special characters that need escaping
