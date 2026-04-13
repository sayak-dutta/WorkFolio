# Role and Objective
You are an Expert Frontend Architect and Next.js Developer. Your task is to build a high-performance, full-screen portfolio presentation web app for a senior freelance developer. The project will be hosted at `work.sayak.me`. 

You must strictly follow the architectural constraints, layout dimensions, and technical requirements outlined below. Do not use standard static screenshots for portfolio items; this project relies entirely on live `iframes` embedded within device mockups.

# Tech Stack
* **Framework:** Next.js (App Router preferred for modern server components)
* **Styling:** Tailwind CSS (crucial for strict viewport height/width management)
* **State & Animation:** React hooks for toggles, Framer Motion (optional, for smooth transitions between slides/devices)
* **Data Source:** Notion API or Google Sheets API (implement a server-side fetch to keep the client light)
* **Icons:** Lucide React or similar lightweight icon library

# UI/UX Layout Specifications
The app is a full-screen canvas. Use a strict CSS Grid or Flexbox layout relying on `vh` and `vw` units to prevent any unwanted page scrolling. The user will navigate between projects like a presentation slide deck.

**1. Top Section (Header/Brief) - Height: 20vh**
* **Left (80vw):** Project Brief area. Contains an `h1` (Project Title) and a subtext/paragraph (Project Description).
* **Right (20vw):** Contains a prominent "Visit Site" CTA button.

**2. Bottom Section (Showcase & Details) - Height: 80vh**
* **Left (80vw - Device Mockup Area):** * Must contain a device mockup (CSS/SVG based MacBook or iPhone).
    * Inside the mockup screen, render an `iframe` pointing to the project's live URL.
    * **Crucial Mechanics:** * Include a toggle switch (PC / Phone) above or near the mockup. Toggling it changes the mockup frame and adjusts the iframe's aspect ratio.
        * **Auto-scroll:** Implement an auto-scroll effect for the iframe. *Note on CORS:* Since we cannot inject JS into cross-origin iframes, implement a CSS-based auto-scrolling wrapper (e.g., setting the iframe height to 300% and animating a vertical `translateY` on it, while `pointer-events` are disabled, pausing on hover).
* **Right (20vw - Sidebar):** * Display the technology stack used for the project (render as a list of icons + text).
    * Include a short "more info" text block.
    * Place a sticky "Book My Service" CTA button at the bottom of this sidebar.

# Data Model
Assume the external data source (Google Sheets or Notion) will provide an array of objects. Write a typed interface for this data:
```typescript
interface ProjectData {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  techStack: string[]; // e.g., ['React', 'Next.js', 'PostgreSQL']
  moreInfo: string;
}
### A Quick Note on the Iframe Auto-Scroll
I explicitly included a note in the prompt for Claude regarding CORS (Cross-Origin Resource Sharing). Browsers strictly prohibit a parent site from programmatically scrolling an iframe if the target site is on a different domain. By instructing Claude to use a CSS `translateY` wrapper hack, it will build a solution that bypasses CORS restrictions and achieves that smooth, automated scrolling effect you want.

# Keep one Rating area for users to rate each of the site

Execution Directives for Claude
Step 1 - Scaffolding & Types: Start by defining the layout shell, strictly enforcing the 20vh/80vh and 80vw/20vw splits using Tailwind.

Step 2 - Mockup Component: Create reusable <MacbookMockup> and <IphoneMockup> components that accept an iframeUrl prop.

Step 3 - The Auto-scroll Hack: Provide a robust, CORS-safe CSS/JS solution for making the iframe scroll automatically to simulate user browsing.

Step 4 - Data Integration: Write a utility function fetchProjects() that fetches and parses the data (mock this with the Notion/Google Sheets structure).

Step 5 - Interactivity: Implement the slide navigation (next/prev project) and the PC/Phone mockup toggle state.

Write clean, modular code. Prioritize performance and a polished, "developer-architect" aesthetic. Output the code block by block, starting with the main layout and mockup components.