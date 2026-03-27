This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

### Free deployment (Vercel Free + MongoDB Atlas Free + Resend)

1. **Push code to Git provider**
   - Initialize a Git repo and push this project to GitHub/GitLab/Bitbucket.

2. **MongoDB Atlas (free tier)**
   - Create a free cluster and database user.
   - Copy the connection string and set it as `MONGODB_URI`.
   - Optionally set `MONGODB_DB=santhosh_portfolio`.

3. **Resend (email)**
   - Create a Resend account and get an API key.
   - Set `RESEND_API_KEY`.
   - Configure:
     - `CONTACT_FROM_EMAIL=your-verified@domain.com`
     - `CONTACT_TO_EMAIL=santhoshwe2007@gmail.com` (or your preferred inbox).

4. **Secrets for auth and admin**
   - Generate a strong random string and set:
     - `JWT_SECRET=...` (required, used for admin JWT).
   - Choose an initial admin password:
     - `ADMIN_PASSWORD=...` (used only for first bootstrap; rotate later in the dashboard).

5. **Vercel project**
   - Go to Vercel → **Add New Project** → import this repo.
   - Keep build command as `npm run build` and output directory default.
   - In **Settings → Environment Variables**, add:
     - `MONGODB_URI`
     - `MONGODB_DB` (optional)
     - `JWT_SECRET`
     - `ADMIN_PASSWORD`
     - `RESEND_API_KEY`
     - `CONTACT_FROM_EMAIL`
     - `CONTACT_TO_EMAIL`
   - Deploy the project.

6. **First admin login**
   - After deploy, open `/admin/login` on your deployed URL.
   - Username: `admin`
   - Password: value from `ADMIN_PASSWORD`.
   - Immediately go to the **Change Admin Password** section in the dashboard and rotate the password.

### Paid deployment (Vercel Pro/Team + paid MongoDB Atlas + paid Resend)

Use the same steps as the free deployment with these adjustments:

1. **Vercel Pro/Team**
   - Upgrade the Vercel project to Pro/Team for:
     - Higher bandwidth and execution limits.
     - More concurrent deployments and preview environments.
     - Better analytics and custom domains.

2. **MongoDB Atlas paid tier**
   - Upgrade the Atlas cluster to a paid tier suitable for your traffic.
   - Keep the same `MONGODB_URI` and `MONGODB_DB` values in Vercel.

3. **Resend paid plan**
   - Upgrade to a paid Resend plan if you expect higher email volume.
   - Keep the same `RESEND_API_KEY` and email environment variables; no code change needed.

4. **Hardening and scaling**
   - Enforce strong `JWT_SECRET` rotation policy and keep it in Vercel’s environment variables only.
   - Use custom domains and HTTPS (Vercel handles TLS).
   - Regularly back up MongoDB Atlas and enforce IP allowlists if desired.
