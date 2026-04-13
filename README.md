# WorkFolio 🚀

An ultra-premium, interactive, and full-screen portfolio presentation web application. Designed specifically for senior freelance developers, agencies, and elite designers who want to showcase their websites precisely how they were meant to be experienced—fully interactive within stunning, responsive Apple device mockups.

## ✨ Key Features

- **Hyper-Realistic Device Mockups**: View live websites inside meticulously CSS-crafted MacBook Pro and iPhone 14 Pro mockups.
- **Flawless Aspect Ratio Scaling**: Projects adapt perfectly to any window dimension without stretching or cropping, using `ResizeObserver` and native CSS aspect-ratios.
- **Embedded Interactions**: All showcased websites are fully interactive. By default, you can click links, scroll content, and interact with the showcased website just as if you were visiting it on a new tab.
- **Auto-Scroll Mode**: Click the "Auto-Scroll" feature to let the presentation gently glide down the showcased page, pausing automatically when hovered. Safe from Cross-Origin (CORS) limits using highly optimized CSS `translateY`.
- **Integrated Lead Capture**: A beautifully designed "Book Delivery" modal directly captures inquiries (Project Type, Budget, Timeline) and pushes them instantly to a Google Sheet.
- **Live User Ratings**: Integrated 5-star rating system capturing visitor feedback (with IP tracking) to Google Sheets.
- **Perfect Typography**: Uses `next/font` for `Lexend` (Headings) and `Barlow Condensed` (Body Text) for crystal-clear readability and zero layout shifts (CLS).
- **Lighthouse & SEO Optimized**: Achieves 100 on Lighthouse with full ARIA accessibility, optimized meta tags, dynamically generated `sitemap.xml`, and `robots.txt`.

## 🛠 Tech Stack

- **Framework**: [Next.js 16+ (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/DB**: Google Apps Script (Serverless Google Sheets Integration)

## ⚡ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sayak-dutta/WorkFolio.git
   cd WorkFolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Rename `.env.local.example` (or create a `.env.local` file) and add your Google Sheets deployment URL:
   ```env
   NEXT_PUBLIC_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   *(See `src/lib/sheets.ts` for instructions on setting up your Google Apps Script).*

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Mobile Strategy

This primary application is intentionally built as a **widescreen presentation surface**, similar to an interactive pitch deck. 

For the ultimate mobile experience going forward, it is recommended to build a separate `/m` (mobile) route:
- Utilizing vertical swipeable cards instead of a fixed canvas.
- Displaying high-quality static thumbnail snapshots instead of complex live iframes.
- Keeping the "Book Delivery" Call-to-Action (CTA) persistent at the bottom.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

Designed and engineered by Sayak.
