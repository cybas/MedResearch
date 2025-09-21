#MedResearchAI — UI Prototype (Medical Research Assistant)

A clean, grid-aligned UI prototype for a medical research assistant that monitors journals & clinical trials, summarizes updates, and lets users build a personal research memory.

Status: Landing (WIP), Dashboard (v1), Keywords Manager (v1).
Goal: Ship a credible UX shell first, then wire data + AI.

⸻

✨ Features (current)
	•	Centered, 12-column grid with strict gutters & safe padding on all pages.
	•	Dashboard: latest updates feed, saved memory panel, filters, paywall badges, Ask-AI drawer (shell).
	•	Keywords Manager: table with match types (Exact/Phrase/Semantic/Boolean), groups, weights, scopes, synonyms, alerts, CSV import/export, edit drawer.
	•	Medical theme: blue/white/green palette, compliance hooks (HIPAA/GDPR copy), accessible focus states.
	•	Routing & nav: sidebar links, active states, breadcrumbs, URL-persisted filters.

⸻

🧭 Routes
	•	/dashboard — main cockpit
	•	/keywords — keywords list/table
	•	/keywords/:id — reserved for deep link
	•	/sources — (next) source manager
	•	/updates — global updates feed
	•	/memory — saved library
	•	/compliance — compliance center
	•	/settings — profile/org settings

Drawer links (query params):
	•	New keyword: /keywords?drawer=new
	•	Edit keyword: /keywords?drawer=edit&id={keywordId}

⸻

🖼 Design System

Alignment
	•	Max content width: 1280px; margin-inline: auto;
	•	Side padding: 24px (desktop), 16px (mobile)
	•	Grid: 12 cols desktop (24px gutters), 8 cols tablet (16px), 1 col mobile
	•	Vertical rhythm: 32–40px section spacing; 16–20px card padding

Tokens

:root{
  --med-blue-600:#2563EB; --med-blue-50:#EFF6FF;
  --med-green-600:#16A34A; --med-amber-600:#D97706;
  --ink-900:#0F172A; --ink-600:#475569; --ink-300:#CBD5E1;
  --card-bg:#fff; --page-bg:#F8FAFC; --border:#E2E8F0;
}

Type scale
	•	H1 28/36 · H2 22/30 · H3 18/26 · Body 14/22 (Inter/Montserrat)

Cards
	•	bg --card-bg, border 1px solid var(--border), radius 10px, soft shadow

Accessibility
	•	WCAG AA contrast, visible focus rings, keyboard-navigable controls, aria-label on icon buttons, no color-only indicators (e.g., paywall uses lock icon + badge).

⸻

🧩 Key Screens

Dashboard
	•	Welcome strip with monitored keywords
	•	Filter bar: timeframe · source type · keyword chips · sort · paywalled toggle
	•	Latest Updates: source logo, title, 3–4 line AI summary, tags, paywall badge, actions (Read · Save to Memory · Ask AI)
	•	Saved Memory: compact list with search, filters (All/Highlights/My Notes)
	•	Ask-AI drawer (shell): context header, chat area, quick prompts

Keywords
	•	Page header: Add Keyword, Import CSV, Export
	•	Sticky filter bar: search · group · status · match type · scope · timeframe + bulk actions
	•	Table columns: [□] Keyword/Type · Group · Weight · Scope · Matches(7d) · Last Fetch · Status · Actions
	•	Edit Drawer tabs: Basics · Sources · Synonyms · Alerts · Advanced
	•	Basics: match type, semantic threshold, language, weight, group, paywalled toggle
	•	Sources: whitelist domains/journals/authors; exclusions
	•	Synonyms: weighted expansions + smart suggestions (PEG↔polyethylene glycol, etc.)
	•	Alerts: frequency, thresholds, delivery (in-app/email/webhook)
	•	Advanced: stopwords, regex, auto-tags
	•	Test Query panel with 3 sample results
	•	Right rail: Groups & Defaults and Synonyms & Exclusions

⸻

🔌 State & URL Conventions
	•	Persist page filters in the query string:
search, group, status, matchType, sourceScope, timeframe, page
	•	Drawers use ?drawer=new|edit&id=...
	•	Sidebar collapse state: localStorage.nav_collapsed=true|false

⸻

🗂 Suggested Types (frontend)

type KeywordMatch = 'exact'|'phrase'|'semantic'|'boolean';

type Keyword = {
  id: string;
  label: string;
  match: KeywordMatch;
  semanticThreshold?: number; // 0.6–0.9 when match==='semantic'
  group?: string;
  weight: 1|2|3|4|5;
  includePaywalled?: boolean;
  sources?: string[];        // ids or domains
  excludeSources?: string[];
  synonyms?: { term: string; weight?: number }[];
  stopwords?: string[];
  alerts?: { frequency:'realtime'|'daily'|'weekly'; threshold?: number; channels: ('inapp'|'email'|'webhook')[]; };
  stats?: { matches7d: number; lastFetchISO?: string; };
  status: 'active'|'paused';
};


⸻

🛠 Quickstart (placeholder)

# Prereqs: Node 18+, pnpm or yarn
pnpm i
pnpm dev         # start app at http://localhost:3000
pnpm build       # production build
pnpm preview     # preview build

If you’re not using pnpm, swap for yarn/npm.
Place env config in .env.local as needed (API keys, etc.).

⸻

📦 Project Structure (suggested)

src/
  components/
  pages/
    dashboard/
    keywords/
    sources/
    updates/
    memory/
    compliance/
    settings/
  styles/
  lib/
public/


⸻

🔜 Roadmap
	•	Sources Manager (whitelist journals/domains/authors, crawl status, errors)
	•	Updates Feed (global) with pagination & infinite scroll
	•	Memory (notes, compare, export bundle)
	•	Ask-AI: real article context + RAG over Memory
	•	CSV import validation & error reporting
	•	Auth + org/team roles
	•	Compliance Center content + audit logs
	•	Integrations: PubMed, ClinicalTrials.gov, RSS, custom domains
	•	Notifications: email/slack digests
	•	E2E & a11y tests

⸻

📝 License

MIT — see LICENSE (or update to your preferred license).

⸻

🙌 Credits

Design prompts and UX system by Vedant + AI assistant.
Icons/imagery: medical theme placeholders until brand assets are ready!