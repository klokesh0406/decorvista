# DecorVista – Complete Setup Guide

A professional home decor product discovery website with a private admin panel.  
Built with **Next.js 14 + Firebase + Vercel** — free to host, easy to manage daily.

---

## What's Inside

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) | Fast, SEO-friendly, deploys free on Vercel |
| Database | Firebase Firestore | Free tier is very generous; real-time updates |
| Image Storage | Firebase Storage | Upload product images directly from admin |
| Admin Login | Firebase Authentication | Secure email/password login |
| Hosting | Vercel (free) | One-click deploy, automatic HTTPS |

---

## Folder Structure

```
decorvista/
├── src/
│   ├── app/
│   │   ├── page.tsx                  ← Homepage
│   │   ├── categories/               ← All categories page
│   │   ├── category/[slug]/          ← Dynamic category pages (11 rooms)
│   │   ├── about/                    ← About page
│   │   ├── contact/                  ← Contact page
│   │   └── admin/
│   │       ├── page.tsx              ← Admin login
│   │       ├── layout.tsx            ← Auth guard + sidebar
│   │       ├── dashboard/            ← Stats overview
│   │       ├── add-product/          ← Upload new product
│   │       ├── edit-product/[id]/    ← Edit existing product
│   │       └── products/             ← List all products
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            ← Navigation bar
│   │   │   └── Footer.tsx            ← Footer with Pinterest link
│   │   └── ui/
│   │       ├── CategoryCard.tsx      ← Room category card
│   │       ├── ProductCard.tsx       ← Individual product card
│   │       └── ProductGrid.tsx       ← Grid with search + filter
│   ├── hooks/
│   │   └── useAuth.tsx               ← Auth context and provider
│   ├── lib/
│   │   ├── firebase.ts               ← Firebase initialization
│   │   └── products.ts               ← All database operations (CRUD)
│   └── types/
│       └── index.ts                  ← TypeScript types + category data
├── .env.local.example                ← Template for your env variables
├── next.config.mjs
└── package.json
```

---

## Step 1 – Create a Firebase Project (Free)

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"** → name it `decorvista` → Continue
3. Disable Google Analytics (optional) → **Create project**

### Enable Firestore Database
1. Left sidebar → **Firestore Database** → **Create database**
2. Choose **"Start in production mode"** → Select a region close to you → **Done**
3. Go to **Rules** tab and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public: anyone can READ active products
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null 
        && request.auth.token.email == "YOUR_ADMIN_EMAIL@gmail.com";
    }
  }
}
```

> ⚠️ Replace `YOUR_ADMIN_EMAIL@gmail.com` with your real admin email address.

### Enable Firebase Storage
1. Left sidebar → **Storage** → **Get started**
2. Choose **production mode** → Select region → **Done**
3. Go to **Rules** tab and paste:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Enable Authentication
1. Left sidebar → **Authentication** → **Get started**
2. Click **"Email/Password"** → Enable → **Save**
3. Go to **Users** tab → **Add user**
4. Enter your admin email and a strong password → **Add user**

### Get Your Firebase Config
1. Left sidebar → ⚙️ **Project Settings** → **Your apps**
2. Click **"</> Web"** → Register app (name: `decorvista-web`)
3. Copy the `firebaseConfig` values — you'll need them in Step 2

---

## Step 2 – Set Up Environment Variables

Create a file called `.env.local` in the root of your project:

```bash
# Copy from Firebase Console → Project Settings → Your Apps
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdefabcdef

# Your admin login email (must match the user you created in Firebase Auth)
NEXT_PUBLIC_ADMIN_EMAIL=youremail@gmail.com

# Your Pinterest profile URL (optional but recommended)
NEXT_PUBLIC_PINTEREST_URL=https://www.pinterest.com/yourusername

# Your contact email for the contact page
NEXT_PUBLIC_CONTACT_EMAIL=hello@yourdomain.com
```

> 🔒 Never commit `.env.local` to Git. It's already in `.gitignore`.

---

## Step 3 – Run Locally (Testing)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:3000** — your website is running!  
Open **http://localhost:3000/admin** — your admin panel.

---

## Step 4 – Deploy to Vercel (Free Hosting)

### Option A: Deploy via GitHub (Recommended)

1. Push your project to a **GitHub repository**:
```bash
git init
git add .
git commit -m "Initial DecorVista setup"
git remote add origin https://github.com/yourusername/decorvista.git
git push -u origin main
```

2. Go to **https://vercel.com** → Sign in with GitHub
3. Click **"New Project"** → Import your `decorvista` repository
4. In the **"Environment Variables"** section, add all variables from your `.env.local` file
5. Click **"Deploy"** → Wait ~2 minutes

Your site is now live at `https://decorvista.vercel.app` (or your custom domain)!

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Follow the prompts and add your environment variables when asked.

### Adding a Custom Domain
1. Vercel Dashboard → Your project → **Settings** → **Domains**
2. Add your domain (e.g., `decorvista.com`) → Follow DNS instructions

---

## Step 5 – Daily Admin Usage

### How to Add Products Every Day

1. Go to **yourdomain.com/admin**
2. Log in with your admin email and password
3. Click **"Add Product"** in the sidebar
4. Fill in the form:
   - **Product Image**: Upload a clear, high-quality photo (PNG/JPG, max 5MB)
   - **Product Name**: Descriptive name (e.g., "Boho Macramé Wall Hanging")
   - **Category**: Select the right room (Bedroom, Kitchen, etc.)
   - **Store**: Amazon / Flipkart / IKEA / Other
   - **Product Link**: Paste the full Amazon/Flipkart product URL
   - **Description**: 1–2 sentences about the product
   - **Price**: Optional (e.g., "₹1,299")
   - **Visibility**: Set to "Active" to show publicly
5. Click **"Add Product"** → It immediately appears on your website!

### Managing Products
- **Hide a product**: Go to Products list → click 👁️ to toggle hidden/active
- **Edit details**: Click ✏️ to edit any field including swapping the image
- **Delete**: Click 🗑️ — this permanently removes it from the database and storage

---

## Database Structure

Each product in Firestore has these fields:

| Field | Type | Example |
|---|---|---|
| `productName` | string | "Minimalist Bedside Table Lamp" |
| `category` | string | "Bedroom" |
| `storeName` | string | "Amazon" |
| `productLink` | string | "https://amazon.in/dp/B0..." |
| `imageUrl` | string | Firebase Storage URL |
| `description` | string | "Warm ambient light with USB port" |
| `price` | string (optional) | "₹1,899" |
| `status` | "active" or "hidden" | "active" |
| `createdAt` | timestamp | Auto-set on creation |
| `updatedAt` | timestamp | Auto-updated on edit |

---

## Pages & URLs

### Public Pages
| URL | Page |
|---|---|
| `/` | Homepage with hero + category grid |
| `/categories` | All 11 categories |
| `/category/bedroom` | Bedroom products |
| `/category/bathroom` | Bathroom products |
| `/category/living-room` | Living Room products |
| `/category/kitchen` | Kitchen products |
| `/category/balcony` | Balcony products |
| `/category/study-room` | Study Room products |
| `/category/gaming-room` | Gaming Room products |
| `/category/outdoor-decor` | Outdoor Decor products |
| `/category/wall-decor` | Wall Decor products |
| `/category/lighting` | Lighting products |
| `/category/furniture` | Furniture products |
| `/about` | About DecorVista |
| `/contact` | Contact page |

### Admin Pages (Password Protected)
| URL | Page |
|---|---|
| `/admin` | Login page |
| `/admin/dashboard` | Stats overview |
| `/admin/add-product` | Add new product |
| `/admin/products` | List & manage all products |
| `/admin/edit-product/:id` | Edit a specific product |

---

## Pinterest Tips (Getting Traffic)

1. **Pin every product**: When you add a product, also pin its image to your Pinterest board with your website URL.
2. **Use keyword-rich descriptions**: "Minimalist bedroom lamp for cozy reading nooks – shop via DecorVista"
3. **Create boards per category**: Bedroom Decor, Kitchen Ideas, etc.
4. **Tall images work best**: Pinterest prefers 2:3 ratio images (e.g., 1000×1500px)
5. **Link every pin to your category page**: e.g., `yourdomain.com/category/bedroom`

---

## Future Improvements (Phase 2)

1. **Newsletter signup** – Collect emails with Mailchimp or Resend
2. **Wishlist / Save feature** – Let users save products
3. **Product ratings** – Add a simple star rating system
4. **Related products** – Show similar products at the bottom of each category
5. **Instagram integration** – Show your Instagram feed on the homepage
6. **Analytics** – Add Google Analytics or Vercel Analytics (free)
7. **PWA support** – Make it installable on mobile phones
8. **Multiple admins** – Add Firestore role-based access for collaborators
9. **Scheduled posts** – Add a "publish date" field to schedule product visibility
10. **SEO sitemap** – Auto-generate sitemap.xml for Google indexing

---

## Troubleshooting

**"Permission denied" on Firestore**  
→ Check your Firestore Security Rules — make sure your admin email matches exactly.

**Images not uploading**  
→ Check Firebase Storage Rules are correctly set and Storage is enabled in your project.

**Admin login not working**  
→ Verify the user exists in Firebase Authentication → Users tab, and the email matches `NEXT_PUBLIC_ADMIN_EMAIL` in your environment variables.

**Products not showing on category page**  
→ Make sure the product's `status` is set to "active" (not "hidden") in the admin panel.

**Build failing on Vercel**  
→ Double-check all 6 Firebase environment variables are added in Vercel's project settings.

---

## Free Tier Limits (Firebase)

Firebase's free "Spark" plan includes:
- **Firestore**: 1 GB storage, 50,000 reads/day, 20,000 writes/day
- **Storage**: 5 GB storage, 1 GB/day download
- **Authentication**: Unlimited users

For a new website, these limits are very comfortable. You'd need to upgrade only if you get 50,000+ daily visitors.
