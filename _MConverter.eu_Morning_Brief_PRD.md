<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>☀️</p>
<p><strong>Morning Brief</strong></p>
<p>Your Personal AI-Powered News Digest</p>
<p>─────────────────────────────────────────────</p></td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Document</strong></p>
<p><strong>PRD v1.0</strong></p></td>
<td><p><strong>Status</strong></p>
<p><strong>Ready to Build</strong></p></td>
<td><p><strong>Stack</strong></p>
<p><strong>React + Gemini</strong></p></td>
<td><p><strong>Deploy</strong></p>
<p><strong>Netlify</strong></p></td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>⚡ TL;DR for the developer:</strong></p>
<p>Build a React web app that fetches news headlines by topic (using GNews API), groups them into</p>
<p>category tabs, and sends them to Google Gemini to generate a personalized spoken-style morning</p>
<p>briefing. Deploy on Netlify using environment variables for API keys. ~9 hours over one weekend.</p></td>
</tr>
</tbody>
</table>

**1. Project Overview**

Morning Brief solves a specific, real problem: people want to stay informed but don\'t have 30 minutes to browse multiple news sites every morning. This app gives them one place to land, pick what they care about, and get a smart AI-written summary they can read in 60 seconds --- like having a personal news anchor.

|                      |                                                                           |
|----------------------|---------------------------------------------------------------------------|
| **Attribute**        | **Detail**                                                                |
| Product Name         | Morning Brief                                                             |
| Type                 | Single-page web application (SPA)                                         |
| Primary User         | Busy professionals aged 22--45 who want daily news without doom-scrolling |
| Core Value Prop      | AI-written personalized morning briefing in under 60 seconds              |
| Platform             | Web (desktop + mobile responsive)                                         |
| Deployment           | Netlify (free tier)                                                       |
| Data Source          | GNews API (free, CORS-safe)                                               |
| AI Engine            | Google Gemini 1.5 Flash (via Gemini API)                                  |
| Estimated Build Time | \~9 hours across one weekend                                              |

**Problem Statement**

Today\'s news landscape has two extremes: overwhelming feeds with hundreds of articles, or oversimplified apps that lack depth. There is no middle ground that combines fresh, real headlines with intelligent AI summarization --- presented in a personal, conversational tone. Morning Brief fills that gap.

**Product Vision**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>🎯 <strong>Vision</strong></p>
<p>A user opens the app every morning, picks 3 topics in one click, reads a crisp AI brief in 60 seconds, and closes the tab feeling informed — not anxious.</p></td>
</tr>
</tbody>
</table>

**2. Goals & Non-Goals**

**✅ In Scope --- Build This**

- **→** Fetch top headlines per category from GNews API (free tier, CORS-friendly).

- **→** Display headlines in category tabs: General, Tech, Business, Sports, Science, Health.

- **→** Send selected headlines to Gemini API and render AI-generated morning brief.

- **→** Let users select 1--3 topic categories before generating their brief.

- **→** Display each headline as a card: title, source, timestamp, and link.

- **→** Auto-cache today\'s headlines in localStorage (reset daily at midnight).

- **→** Dark mode toggle with preference saved to localStorage.

- **→** Loading state / skeleton UI during API calls.

- **→** Fully responsive: works on 375px mobile and 1440px desktop.

- **→** Deploy to Netlify with API keys stored as environment variables.

**❌ Out of Scope --- Do Not Build in v1**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>• No user login, accounts, or authentication of any kind</p>
<p>• No backend server or database (Netlify Functions are allowed for API proxying only)</p>
<p>• No push notifications or email subscriptions</p>
<p>• No social sharing or comment system</p>
<p>• No article bookmarking or read-later feature</p>
<p>• No analytics dashboard or admin panel</p>
<p>• No multi-language support</p>
<p>• No paid tier or subscription gating</p></td>
</tr>
</tbody>
</table>

**3. Tech Stack --- Full Specification**

|                    |                            |                      |                                               |
|--------------------|----------------------------|----------------------|-----------------------------------------------|
| **Layer**          | **Technology**             | **Version / Tier**   | **Reason**                                    |
| Frontend Framework | React                      | 18.x                 | Industry standard, great for tabs + state     |
| Styling            | Tailwind CSS               | 3.x via CDN          | Fast styling, dark mode support built-in      |
| News API           | GNews API                  | Free --- 100 req/day | No CORS restriction, clean JSON response      |
| AI Engine          | Google Gemini API          | gemini-1.5-flash     | Fast, cheap, excellent at text summarization  |
| State Management   | React useState / useEffect | Built-in             | No Redux needed for this scope                |
| Caching            | Browser localStorage       | Native               | Save daily headlines, no server needed        |
| Deployment         | Netlify                    | Free tier            | Drag-drop deploy, env vars, CDN built-in      |
| API Security       | Netlify Functions          | Free tier            | Proxy Gemini calls, hide API keys from client |
| Build Tool         | Vite                       | 5.x                  | Fast dev server, easy Netlify config          |
| Package Manager    | npm                        | Latest               | Standard, works everywhere                    |

**API Key Architecture**

This is critical to get right. Never expose your Gemini API key in frontend code. Here is the correct architecture:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>Browser (React) ──→ Netlify Function (proxy) ──→ Gemini API</p>
<p>• GNews API: Called directly from React (it supports CORS — this is safe)</p>
<p>• Gemini API: Called ONLY from a Netlify Serverless Function (/api/brief)</p>
<p>The React app sends headlines to your Netlify Function.</p>
<p>The Netlify Function appends the secret API key and calls Gemini.</p>
<p>The Netlify Function returns the AI text to React.</p>
<p>Your API key is never visible in the browser or source code.</p></td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>⚠️ <strong>Security Rule</strong></p>
<p>GEMINI_API_KEY must ONLY live in Netlify's Environment Variables dashboard. It must never appear in any .js or .jsx file. Violating this exposes your key publicly.</p></td>
</tr>
</tbody>
</table>

**4. System Architecture**

**File Structure**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>📁 morning-brief/</p>
<p>├── 📁 netlify/functions/</p>
<p>│ └── 📄 brief.js ← Serverless function: calls Gemini API securely</p>
<p>├── 📁 src/</p>
<p>│ ├── 📁 components/</p>
<p>│ │ ├── 📄 Header.jsx ← App title + dark mode toggle</p>
<p>│ │ ├── 📄 CategorySelector.jsx ← Topic checkboxes (max 3)</p>
<p>│ │ ├── 📄 HeadlineCard.jsx ← Single news card component</p>
<p>│ │ ├── 📄 HeadlineGrid.jsx ← Tab panel + card grid</p>
<p>│ │ ├── 📄 BriefPanel.jsx ← AI brief display + Generate button</p>
<p>│ │ └── 📄 SkeletonCard.jsx ← Loading placeholder card</p>
<p>│ ├── 📁 hooks/</p>
<p>│ │ ├── 📄 useHeadlines.js ← Fetch + cache headlines logic</p>
<p>│ │ └── 📄 useDarkMode.js ← Dark mode toggle + localStorage</p>
<p>│ ├── 📁 utils/</p>
<p>│ │ ├── 📄 api.js ← GNews fetch calls</p>
<p>│ │ ├── 📄 cache.js ← localStorage read/write helpers</p>
<p>│ │ └── 📄 formatters.js ← Date, time, truncate helpers</p>
<p>│ ├── 📄 App.jsx ← Root component + layout</p>
<p>│ ├── 📄 main.jsx ← React entry point</p>
<p>│ └── 📄 index.css ← Tailwind imports</p>
<p>├── 📄 index.html ← Vite HTML shell</p>
<p>├── 📄 vite.config.js ← Vite configuration</p>
<p>├── 📄 netlify.toml ← Netlify build + function config</p>
<p>├── 📄 .env.local ← Local dev keys (NEVER commit this)</p>
<p>├── 📄 .gitignore ← Must include .env.local</p>
<p>└── 📄 package.json</p></td>
</tr>
</tbody>
</table>

**Data Flow Diagram**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>┌─────────────────────────────────────────────────────────────┐</p>
<p>│ USER OPENS APP │</p>
<p>└──────────────────────────┬──────────────────────────────────┘</p>
<p>│</p>
<p>┌──────────────▼───────────────┐</p>
<p>│ Check localStorage cache │</p>
<p>│ Is today's date saved? │</p>
<p>└───────┬───────────────┬───────┘</p>
<p>YES│ NO │</p>
<p>┌──────────▼──┐ ┌───────▼──────────────┐</p>
<p>│ Load cached │ │ Fetch from GNews API │</p>
<p>│ headlines │ │ Save to localStorage │</p>
<p>└──────────┬──┘ └───────┬──────────────┘</p>
<p>└───────┬────────┘</p>
<p>┌───────────────▼────────────────┐</p>
<p>│ Render HeadlineGrid with tabs │</p>
<p>└───────────────┬────────────────┘</p>
<p>│</p>
<p>┌───────────────▼────────────────┐</p>
<p>│ User selects topics + clicks │</p>
<p>│ 'Generate My Brief' │</p>
<p>└───────────────┬────────────────┘</p>
<p>│</p>
<p>┌───────────────▼────────────────┐</p>
<p>│ POST to /.netlify/functions/ │</p>
<p>│ brief {headlines: [...]} │</p>
<p>└───────────────┬────────────────┘</p>
<p>│</p>
<p>┌───────────────▼────────────────┐</p>
<p>│ Netlify Fn calls Gemini API │</p>
<p>│ Returns AI brief text │</p>
<p>└───────────────┬────────────────┘</p>
<p>│</p>
<p>┌───────────────▼────────────────┐</p>
<p>│ Render AI brief in UI │</p>
<p>└────────────────────────────────┘</p></td>
</tr>
</tbody>
</table>

**5. Feature Specifications**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>FEAT-01 | Headline Fetching &amp; Caching</strong></p>
<p>Priority: P0 — Must Have | Complexity: Low</p></td>
</tr>
</tbody>
</table>

**Description**

On app load, check localStorage for cached headlines with today\'s date. If cached data exists and is from today, render it immediately with no API call. If stale or missing, fetch 10 headlines per category from GNews API, store the result in localStorage with today\'s date string as the key, then render.

**GNews API Endpoint**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>GET https://gnews.io/api/v4/top-headlines</p>
<p>?category={category}</p>
<p>&amp;lang=en</p>
<p>&amp;country=us</p>
<p>&amp;max=10</p>
<p>&amp;apikey={GNEWS_API_KEY}</p>
<p>Categories: general | technology | business | sports | science | health</p></td>
</tr>
</tbody>
</table>

**Cache Logic (useHeadlines.js)**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>const TODAY = new Date().toISOString().split('T')[0]; // e.g. '2026-02-15'</p>
<p>function getCached(category) {</p>
<p>const raw = localStorage.getItem(`mb_${category}_${TODAY}`);</p>
<p>return raw ? JSON.parse(raw) : null;</p>
<p>}</p>
<p>function setCache(category, data) {</p>
<p>// Clean up yesterday's keys first</p>
<p>Object.keys(localStorage)</p>
<p>.filter(k =&gt; k.startsWith('mb_') &amp;&amp; !k.includes(TODAY))</p>
<p>.forEach(k =&gt; localStorage.removeItem(k));</p>
<p>localStorage.setItem(`mb_${category}_${TODAY}`, JSON.stringify(data));</p>
<p>}</p></td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>FEAT-02 | Category Tabs &amp; Headline Cards</strong></p>
<p>Priority: P0 — Must Have | Complexity: Low</p></td>
</tr>
</tbody>
</table>

**Description**

Display a horizontal tab bar with 6 categories. Active tab loads and shows its 10 headlines as cards. Each card shows: headline title (max 2 lines), source name + favicon, relative time (e.g. \'2 hours ago\'), a short description (max 3 lines), and a Read Full Article link opening in a new tab.

**Headline Card --- Data Fields**

|             |                     |                                          |
|-------------|---------------------|------------------------------------------|
| **Field**   | **Source (GNews)**  | **Notes**                                |
| Title       | article.title       | Truncate at 100 chars with ellipsis      |
| Source      | article.source.name | Display as bold label                    |
| Source URL  | article.source.url  | Use to extract favicon                   |
| Description | article.description | Truncate at 160 chars                    |
| Image       | article.image       | Show if present; fallback to placeholder |
| Published   | article.publishedAt | Show relative time (e.g. \'3h ago\')     |
| Article URL | article.url         | Read Full Article button href            |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>FEAT-03 | AI Morning Brief Generator ★ CORE FEATURE</strong></p>
<p>Priority: P0 — Must Have | Complexity: Medium</p></td>
</tr>
</tbody>
</table>

**Description**

A sticky panel on the right side (desktop) or bottom sheet (mobile) shows a category selector and a \'Generate My Brief\' button. When clicked, the app collects up to 5 headlines from each selected category (max 3 categories), sends them to the Netlify Function /api/brief, and renders the returned AI text in the panel with a typewriter animation.

**Gemini Prompt Template (inside Netlify Function)**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>const prompt = `</p>
<p>You are a professional morning news anchor writing a spoken-style briefing.</p>
<p>Write a natural, conversational news summary based ONLY on these headlines.</p>
<p>Rules:</p>
<p>- Start with "Good morning!" and today's date.</p>
<p>- Cover each topic section with a natural transition phrase.</p>
<p>- Keep total length to 120–150 words. No more.</p>
<p>- Use a warm, confident, professional tone.</p>
<p>- Do not editorialize or add opinions.</p>
<p>- End with one sentence that looks ahead to the day.</p>
<p>Headlines:</p>
<p>${headlineText}</p>
<p>`,</p></td>
</tr>
</tbody>
</table>

**Netlify Function --- /netlify/functions/brief.js**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>const { GoogleGenerativeAI } = require('@google/generative-ai');</p>
<p>exports.handler = async (event) =&gt; {</p>
<p>if (event.httpMethod !== 'POST')</p>
<p>return { statusCode: 405, body: 'Method Not Allowed' };</p>
<p>const { headlines } = JSON.parse(event.body);</p>
<p>const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);</p>
<p>const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });</p>
<p>const headlineText = headlines.map((h,i) =&gt; `${i+1}. ${h.title}`).join('\n');</p>
<p>const prompt = `... (template above) ...`;</p>
<p>const result = await model.generateContent(prompt);</p>
<p>const text = result.response.text();</p>
<p>return {</p>
<p>statusCode: 200,</p>
<p>headers: { 'Content-Type': 'application/json' },</p>
<p>body: JSON.stringify({ brief: text }),</p>
<p>};</p>
<p>};</p></td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>FEAT-04 | Dark Mode + UI Polish</strong></p>
<p>Priority: P1 — Should Have | Complexity: Low</p></td>
</tr>
</tbody>
</table>

A sun/moon toggle button in the header switches between light and dark themes using Tailwind\'s dark: prefix classes. User preference is saved to localStorage key \'mb_darkmode\'. The document root gets a \'dark\' class. Skeleton loading cards display during all fetch operations. A countdown timer shows time until midnight reset.

**6. UI Layout --- Wireframe Reference**

**Desktop Layout (1280px+)**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>┌─────────────────────────────────────────────────────────────────────┐</p>
<p>│ ☀️ Morning Brief 🌙 [Resets in 06:22:14] │ ← Header</p>
<p>├─────────────────────────────────────────────────────────────────────┤</p>
<p>│ [General] [Tech] [Business] [Sports] [Science] [Health] │ ← Tabs</p>
<p>├──────────────────────────────────────────┬──────────────────────────┤</p>
<p>│ │ 📋 Your Morning Brief │</p>
<p>│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │ ───────────────────── │</p>
<p>│ │ [image] │ │ [image] │ │ [image] │ │ Topics: [✓Tech][□Biz] │</p>
<p>│ │──────────│ │──────────│ │──────────│ │ [✓Sports] │</p>
<p>│ │ Headline │ │ Headline │ │ Headline │ │ │</p>
<p>│ │ Source │ │ Source │ │ Source │ │ [Generate My Brief →] │</p>
<p>│ │ 2h ago │ │ 3h ago │ │ 4h ago │ │ ───────────────────── │</p>
<p>│ │ Desc... │ │ Desc... │ │ Desc... │ │ Good morning! Today │</p>
<p>│ │[Read →] │ │[Read →] │ │[Read →] │ │ in tech, OpenAI... │ ← AI Brief</p>
<p>│ └──────────┘ └──────────┘ └──────────┘ │ │</p>
<p>│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │ │</p>
<p>│ │ Card 4 │ │ Card 5 │ │ Card 6 │ │ │</p>
<p>│ └──────────┘ └──────────┘ └──────────┘ │ │</p>
<p>├──────────────────────────────────────────┴──────────────────────────┤</p>
<p>│ © 2026 Morning Brief · Powered by Gemini │ ← Footer</p>
<p>└─────────────────────────────────────────────────────────────────────┘</p></td>
</tr>
</tbody>
</table>

**Mobile Layout (375px)**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>┌─────────────────────────┐</p>
<p>│ ☀️ Morning Brief 🌙 │ ← Header</p>
<p>├─────────────────────────┤</p>
<p>│ [Gen][Tech][Biz][Sport] │ ← Scrollable tabs</p>
<p>├─────────────────────────┤</p>
<p>│ ┌─────────────────────┐ │</p>
<p>│ │ [image] │ │ ← Full-width cards</p>
<p>│ │ Headline Title Here │ │</p>
<p>│ │ Source · 2h ago │ │</p>
<p>│ │ Description text... │ │</p>
<p>│ │ [Read Full Article] │ │</p>
<p>│ └─────────────────────┘ │</p>
<p>│ ┌─────────────────────┐ │</p>
<p>│ │ Card 2... │ │</p>
<p>│ └─────────────────────┘ │</p>
<p>├─────────────────────────┤</p>
<p>│ ╔═══════════════════╗ │ ← Bottom sticky panel</p>
<p>│ ║ 📋 Brief Panel ║ │</p>
<p>│ ║ [Tech] [Sports] ║ │</p>
<p>│ ║ [Generate →] ║ │</p>
<p>│ ╚═══════════════════╝ │</p>
<p>└─────────────────────────┘</p></td>
</tr>
</tbody>
</table>

**7. Environment Variables**

Two API keys are required. They must be configured in two places: your .env.local file for local development, and Netlify\'s dashboard for production. Never put keys in any committed file.

|                    |                         |                                   |                                             |
|--------------------|-------------------------|-----------------------------------|---------------------------------------------|
| **Variable Name**  | **Used In**             | **Value Source**                  | **Scope**                                   |
| VITE_GNEWS_API_KEY | React frontend (api.js) | gnews.io → Sign Up → Dashboard    | Public (VITE\_ prefix makes it client-safe) |
| GEMINI_API_KEY     | Netlify Function only   | aistudio.google.com → Get API Key | Secret --- server-side only, never expose   |

**.env.local file (local dev)**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p># .env.local — NEVER commit this file. It is already in .gitignore.</p>
<p>VITE_GNEWS_API_KEY=your_gnews_key_here</p>
<p>GEMINI_API_KEY=your_gemini_key_here</p></td>
</tr>
</tbody>
</table>

**netlify.toml --- Build Config**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>[build]</p>
<p>command = "npm run build"</p>
<p>publish = "dist"</p>
<p>functions = "netlify/functions"</p>
<p>[dev]</p>
<p>command = "npm run dev"</p>
<p>port = 5173</p></td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>🔐 <strong>Netlify Environment Variables Setup</strong></p>
<p>In Netlify dashboard: Site Settings → Environment Variables → Add GEMINI_API_KEY with your key. This is the only place your Gemini key should ever exist.</p></td>
</tr>
</tbody>
</table>

**8. Weekend Sprint Plan**

Follow this exact order. Do not skip ahead. Each task builds on the last.

**Saturday --- Core Foundation**

|        |                                                                       |                                               |          |
|--------|-----------------------------------------------------------------------|-----------------------------------------------|----------|
| **\#** | **Task**                                                              | **Output**                                    | **Time** |
| S-01   | Scaffold project with Vite + React + Tailwind. Install dependencies.  | npm run dev works, blank page loads           | 30 min   |
| S-02   | Create Header.jsx with app title and dark mode toggle button.         | Header renders, toggle works visually         | 30 min   |
| S-03   | Build api.js --- GNews fetch function for a single category.          | console.log shows 10 headlines object         | 30 min   |
| S-04   | Build cache.js --- getCached() and setCache() with today\'s date key. | Cache saves + reads correctly on refresh      | 30 min   |
| S-05   | Build useHeadlines.js custom hook combining api.js + cache.js.        | Hook returns headlines array and loading bool | 40 min   |
| S-06   | Build HeadlineCard.jsx with all 7 data fields from spec.              | Cards render correctly with real data         | 45 min   |
| S-07   | Build HeadlineGrid.jsx --- tab bar + 3-column card grid.              | All 6 tabs work, cards display per category   | 60 min   |
| S-08   | Wire App.jsx --- integrate Header + HeadlineGrid + dark mode logic.   | Full app renders with live news data          | 30 min   |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>🎯 <strong>End of Saturday Goal</strong></p>
<p>By end of Saturday, the app fetches real news, displays it in tabs with cards, and caches it. The UI looks good in light and dark mode. No AI yet — that's Sunday.</p></td>
</tr>
</tbody>
</table>

**Sunday --- AI Integration & Deploy**

|        |                                                                             |                                                     |          |
|--------|-----------------------------------------------------------------------------|-----------------------------------------------------|----------|
| **\#** | **Task**                                                                    | **Output**                                          | **Time** |
| S-09   | Create netlify/functions/brief.js with Gemini API call and prompt template. | Function returns AI text when called via curl       | 60 min   |
| S-10   | Build CategorySelector.jsx --- checkboxes for topic selection (max 3).      | Selector enforces 3-topic limit correctly           | 30 min   |
| S-11   | Build BriefPanel.jsx --- displays category selector, button, and AI text.   | Panel renders correctly, button is wired up         | 45 min   |
| S-12   | Connect BriefPanel → Netlify Function → render response in panel.           | Full AI brief generates from real headlines         | 45 min   |
| S-13   | Add SkeletonCard.jsx loading state for all fetch operations.                | Skeleton cards show during loading, disappear after | 30 min   |
| S-14   | Add countdown timer to header (time until midnight reset).                  | Timer counts down correctly                         | 20 min   |
| S-15   | Mobile responsive pass --- test at 375px, fix layout issues.                | App looks good on mobile                            | 40 min   |
| S-16   | Deploy to Netlify. Set env vars in dashboard. Test live URL.                | Live app accessible at yoursite.netlify.app         | 30 min   |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>⏱️ Total Saturday: ~5.5 hours</p>
<p>⏱️ Total Sunday: ~5.5 hours (includes polish &amp; deploy)</p>
<p>⏱️ Grand Total: ~11 hours — achievable across one weekend</p></td>
</tr>
</tbody>
</table>

**9. Netlify Deployment --- Step by Step**

1.  **Step 1:** Push your project to a GitHub repository (public or private).

2.  **Step 2:** Go to netlify.com → Log in → \'Add new site\' → \'Import an existing project\'.

3.  **Step 3:** Connect your GitHub account and select the morning-brief repository.

4.  **Step 4:** Netlify auto-detects Vite. Build command: npm run build \| Publish dir: dist

5.  **Step 5:** Before deploying: go to Site Settings → Environment Variables.

6.  **Step 6:** Add VITE_GNEWS_API_KEY with your GNews key. Add GEMINI_API_KEY with your Gemini key.

7.  **Step 7:** Click \'Deploy site\'. Netlify builds, deploys, and gives you a live URL.

8.  **Step 8:** Test the live URL. Click Generate My Brief. Verify AI response appears.

9.  **Step 9:** (Optional) Set a custom domain in Site Settings → Domain Management.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>✅ <strong>Netlify Auto-Deploys</strong></p>
<p>Every time you push to your GitHub main branch, Netlify automatically rebuilds and redeploys. Your live site stays current with zero extra steps.</p></td>
</tr>
</tbody>
</table>

**10. Acceptance Criteria**

The app is production-ready when every item below is checked. Test each one manually before shipping.

**News & Data**

- **☐** App loads and displays headlines on the first visit with no errors.

- **☐** Switching tabs loads headlines for that category correctly.

- **☐** Refreshing the page does NOT trigger a new API call --- cached data loads instantly.

- **☐** The next day (or clearing localStorage) triggers a fresh API fetch.

- **☐** Each card displays: title, source, relative time, description, and Read Article link.

- **☐** Clicking Read Article opens the original article URL in a new browser tab.

**AI Brief**

- **☐** Selecting 0 topics and clicking Generate shows a helpful validation message.

- **☐** Selecting more than 3 topics is blocked by the UI --- checkbox disables at limit.

- **☐** Clicking Generate My Brief shows a loading spinner while waiting.

- **☐** The AI brief appears after the API call completes --- warm, conversational tone.

- **☐** The generated brief is 120--150 words and references actual headline topics.

- **☐** If the Netlify function call fails, an error message shows --- app does not crash.

**UX & Performance**

- **☐** Dark mode toggle works and persists after page refresh.

- **☐** Skeleton loading cards appear during all fetch operations.

- **☐** Countdown timer counts down correctly toward midnight.

- **☐** App is fully usable on a 375px mobile screen (no horizontal scroll).

- **☐** App looks correct on 1280px and 1440px desktop viewport.

**Security & Deploy**

- **☐** GEMINI_API_KEY does NOT appear anywhere in the built frontend source.

- **☐** Inspect Network tab in browser: Gemini is called from netlify.com, not directly.

- **☐** App is live at a public Netlify URL and accessible without login.

- **☐** .env.local is listed in .gitignore and NOT present in the GitHub repository.

**11. Risks, Mitigations & Known Gotchas**

|                                         |                |            |                                                                                                                            |
|-----------------------------------------|----------------|------------|----------------------------------------------------------------------------------------------------------------------------|
| **Risk**                                | **Likelihood** | **Impact** | **Mitigation**                                                                                                             |
| GNews free tier: 100 requests/day limit | Low            | Medium     | localStorage cache = 1 req per user per category per day. You won\'t hit the limit in development or with small user base. |
| Gemini API slow response (\>3s)         | Medium         | Medium     | Show a clear loading spinner in BriefPanel. Add a 10s timeout with a friendly error message.                               |
| Gemini returns text that\'s too long    | Medium         | Low        | Add max_output_tokens: 300 in Gemini API call params to hard-limit the response length.                                    |
| GNews returns articles with no image    | High           | Low        | HeadlineCard checks if article.image is truthy. If not, show a styled placeholder with the source name initials.           |
| Netlify Function cold start delay       | Low            | Low        | Add a \'Warming up\...\' state for the first call. Subsequent calls are faster.                                            |
| VITE\_ prefix exposes GNews key         | Info           | Low        | GNews API allows client-side usage (unlike NewsAPI). The VITE\_ prefix is intentional and safe for this API.               |
| Category selector allows 0 selections   | Medium         | Low        | Disable \'Generate\' button if no categories selected. Show helper text: \'Pick at least 1 topic\'.                        |

**12. Dependencies --- package.json**

**npm install (production)**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>npm install @google/generative-ai</p>
<p># That's the ONLY npm dependency for the Gemini SDK.</p>
<p># GNews API is called with native fetch() — no library needed.</p></td>
</tr>
</tbody>
</table>

**npm install -D (dev)**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>npm create vite@latest morning-brief -- --template react</p>
<p>cd morning-brief</p>
<p>npm install</p>
<p>npm install -D tailwindcss postcss autoprefixer</p>
<p>npx tailwindcss init -p</p></td>
</tr>
</tbody>
</table>

**Netlify Function dependency**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p># Inside netlify/functions/ — create a separate package.json:</p>
<p>{</p>
<p>"dependencies": {</p>
<p>"@google/generative-ai": "^0.21.0"</p>
<p>}</p>
<p>}</p>
<p># Netlify auto-installs this during the build.</p></td>
</tr>
</tbody>
</table>

**13. v2 Roadmap --- After You Ship v1**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>🚫 <strong>Rule</strong></p>
<p>Do not build any of these in v1. Ship the core first. These are rewards for completing v1.</p></td>
</tr>
</tbody>
</table>

|                      |                                                                            |                |
|----------------------|----------------------------------------------------------------------------|----------------|
| **Feature**          | **Why It\'s Good**                                                         | **Complexity** |
| Text-to-speech brief | Click a button and hear the AI brief read aloud using Web Speech API       | Low            |
| Email subscription   | Users enter email to receive their brief every morning at 7am              | Medium         |
| Share to Twitter / X | One-click share of the AI brief as a tweet                                 | Low            |
| Briefing history     | Archive past 7 days of briefs in localStorage                              | Low            |
| Custom prompt style  | Let user pick: \'Formal anchor\' vs \'Casual friend\' vs \'Bullet points\' | Medium         |
| PWA (installable)    | Add a manifest.json so users can install it on their phone home screen     | Medium         |
| Multilingual briefs  | Add a language selector and pass it to Gemini for translated output        | Medium         |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>☀️</p>
<p><strong>You have the full blueprint.</strong></p>
<p>React + GNews + Gemini + Netlify.</p>
<p>One weekend. One shipped product. Let's go. 🚀</p>
<p>─────────────────────────────────────────────</p>
<p>Morning Brief PRD v1.0 | Confidential | Not for redistribution</p></td>
</tr>
</tbody>
</table>
