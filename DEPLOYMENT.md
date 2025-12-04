# ShopEase Deployment Guide

## Quick Deploy (5 Minutes)

### Step 1: Push to GitHub
```bash
cd "Capstone Sem 3"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy Backend (Render)

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: shopease-backend
   - **Root Directory**: `shopease-backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   PORT=3001
   NODE_ENV=production
   ```

6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment
8. Copy your backend URL (e.g., `https://shopease-backend.onrender.com`)

### Step 3: Deploy Frontend (Vercel)

1. Go to https://vercel.com and sign up
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `shopease-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   ```
   VITE_API_URL=YOUR_BACKEND_URL_FROM_RENDER
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

6. Click "Deploy"
7. Wait 1-2 minutes
8. Your site is live! (e.g., `https://shopease.vercel.app`)

### Step 4: Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to "Credentials"
4. Edit your OAuth 2.0 Client ID
5. Add Authorized JavaScript origins:
   - `https://your-vercel-url.vercel.app`
6. Add Authorized redirect URIs:
   - `https://your-vercel-url.vercel.app`
7. Save

### Step 5: Seed Database (One-time)

```bash
# In shopease-backend directory
node seedData.js
```

Or use Render Shell:
1. Go to your Render dashboard
2. Click on your service
3. Go to "Shell" tab
4. Run: `node seedData.js`

---

## Alternative: Netlify + Railway

### Frontend (Netlify)
1. Go to https://netlify.com
2. Drag and drop `shopease-frontend` folder
3. Add environment variables in Site Settings
4. Done!

### Backend (Railway)
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select repository
4. Add environment variables
5. Done!

---

## Environment Variables Reference

### Backend (.env)
```env
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopease
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

---

## Post-Deployment Checklist

- [ ] Backend is accessible (visit `YOUR_BACKEND_URL/api/products`)
- [ ] Frontend loads correctly
- [ ] Products page displays items
- [ ] Search, filter, sort work
- [ ] Cart functionality works
- [ ] Orders can be created
- [ ] Google OAuth works (if configured)
- [ ] All CRUD operations functional

---

## Troubleshooting

### Backend not connecting
- Check MongoDB URI is correct
- Verify all environment variables are set
- Check Render logs for errors

### Frontend API errors
- Ensure VITE_API_URL matches your backend URL
- Check CORS settings in backend
- Verify backend is running

### Google OAuth not working
- Update authorized origins in Google Console
- Check GOOGLE_CLIENT_ID matches in both frontend and backend
- Clear browser cache

---

## Free Tier Limits

**Render (Backend):**
- 750 hours/month
- Spins down after 15 min inactivity
- First request may be slow (cold start)

**Vercel (Frontend):**
- 100 GB bandwidth/month
- Unlimited deployments
- Always fast (CDN)

**MongoDB Atlas:**
- 512 MB storage
- Shared cluster
- Perfect for this project

---

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Render
1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS records

---

## Continuous Deployment

Both Vercel and Render auto-deploy when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push
```

Your site updates automatically in 1-2 minutes!

---

## Cost Estimate

- **Free Tier**: $0/month (perfect for capstone)
- **Paid Tier** (if needed later):
  - Render: $7/month
  - Vercel: $20/month
  - MongoDB Atlas: $9/month

---

## Support

If deployment fails:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check MongoDB connection

**Your app will be live in under 10 minutes!** 🚀
