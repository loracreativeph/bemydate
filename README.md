# 💌 Ask a Date — Netlify Deployment

A fun MERN-style app deployed entirely on **Netlify** — React frontend + Netlify Functions (serverless) backend + MongoDB Atlas.

---

## 📁 Project Structure

```
ask-a-date/
├── netlify.toml                        ← Build config + redirect rules
├── package.json                        ← Root deps for Netlify Functions
├── netlify/
│   └── functions/
│       ├── lib/
│       │   ├── connectDB.js            ← Mongoose connection (cached)
│       │   ├── DateRequest.js          ← Mongoose model
│       │   └── mailer.js               ← Nodemailer email sender
│       ├── date-request.js             ← POST   /api/date-request
│       ├── date-request-get.js         ← GET    /api/date-request-get/:id
│       └── date-request-respond.js     ← PUT    /api/date-request-respond/:id
└── frontend/
    ├── src/
    │   ├── api.js                      ← Centralized API calls
    │   ├── pages/  (Home, Card, PickDate, FoodVibe, Yay, LinkGenerated)
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    └── vite.config.js
```

---

## 🚀 Deploy to Netlify

### Step 1 — Set up MongoDB Atlas
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → create a free cluster
2. Create a database user and whitelist `0.0.0.0/0` (all IPs) under Network Access
3. Copy your **connection string**: `mongodb+srv://user:pass@cluster.mongodb.net/ask-a-date`

### Step 2 — Set up Gmail App Password
1. Go to your Google Account → **Security** → **2-Step Verification** → **App Passwords**
2. Generate a password for "Mail" → copy it

### Step 3 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/yourname/ask-a-date.git
git push -u origin main
```

### Step 4 — Connect to Netlify
1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Select your repo
3. Build settings are auto-detected from `netlify.toml`

### Step 5 — Add Environment Variables
In Netlify → **Site Settings** → **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://...` |
| `EMAIL_USER` | `your_gmail@gmail.com` |
| `EMAIL_PASS` | your Gmail app password |
| `FRONTEND_URL` | `https://your-site.netlify.app` |

### Step 6 — Deploy!
Trigger a deploy from Netlify dashboard or push to GitHub.

---

## 💻 Local Development

Install the Netlify CLI to run functions locally:

```bash
npm install -g netlify-cli

# Root level — install function deps
npm install

# Frontend deps
cd frontend && npm install && cd ..

# Create local env file
cp .env.example .env  # fill in your values

# Run everything together
netlify dev
```

Open [http://localhost:8888](http://localhost:8888)

---

## 🔗 API Routes (as Netlify Functions)

| Method | URL | Function file |
|--------|-----|---------------|
| POST | `/api/date-request` | `date-request.js` |
| GET | `/api/date-request-get/:id` | `date-request-get.js` |
| PUT | `/api/date-request-respond/:id` | `date-request-respond.js` |

Netlify rewrites `/api/*` → `/.netlify/functions/*` via `netlify.toml`.
