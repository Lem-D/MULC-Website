# MULC Website — Design Document

**Project:** The official website for the MacEwan University Law Club (MULC)
**Status:** Draft v3 (2026-10-06), updated with the wireframe and club branding
**Owner:** Lem

> A hub where students can learn about the club, meet the execs, see upcoming events and photos, find out how to join, and get in touch.

---

## 1. Purpose & Problem

Students who are interested in, or already part of, MULC currently have **nowhere to learn about the club or stay updated**. Information lives in scattered social posts, group chats, and word of mouth. This site gives MULC a single, always-current home base.

### Goals
1. Give any student a clear picture of what MULC is and why they should care, within the first screen.
2. Make upcoming events easy to find and act on (date, time, place, RSVP link).
3. Make joining frictionless: one obvious call to action, visible from anywhere on the page.
4. Put faces to the club by introducing the exec team.
5. Be easy for non-developer execs to keep up to date year after year.

### Non-goals (v1)
- User accounts, logins, or a member portal.
- A CMS backend or database.
- Payments / membership fees collected on-site.
- Blog or news feed (can be added later as its own section).

---

## 2. Audience

**Primary:** MacEwan students who are invested in MULC: current members, prospective members, and pre-law / law-curious students.

| Persona | What they want | What success looks like |
|---|---|---|
| **Curious first-year** | "What is this club and is it for me?" | Reads the hero + About, scrolls to How to Join, signs up. |
| **Active member** | "What's happening next?" | Lands, jumps straight to Upcoming Events, gets the details. |
| **Pre-law senior** | "Who runs this, and can they help me with LSAT / law school apps?" | Reads Execs + FAQ, contacts the club. |

### Usage assumptions
- Most visits come from **phones** (links in Instagram bio, Discord, posters with QR codes). Design mobile-first.
- Visits are short. The page must be skimmable and fast on campus Wi-Fi / mobile data.

---

## 3. Site Map & User Flow

> **Updated 2026-10-06 to match Lem's wireframe** (`MULC Wire framing.pdf`). The site is now a **home page plus two detail pages**, not a single page.

```
/            Home       (scrolling landing page)
/about       About Us   (mission, history, our team)
/faq         FAQ        (drop-down Q&A)
```

### Home page flow (scroll order)
```
┌──────────────────────────────────────┐
│ Header: "MacEwan Law Club" · menu    │
├──────────────────────────────────────┤
│ 1. Hero: logo, hook message,         │  ← landing view
│    club statistics, Join button      │
│ 2. What We Stand For (photo bg)      │
│ 3. Upcoming Events                   │
│ 4. Sponsors                          │
│ 5. Previous Events (+ photos)        │
├──────────────────────────────────────┤
│ Footer: Location · Socials · Menu    │
└──────────────────────────────────────┘
```

### About Us page flow
Mission → History → Our Team (grid of exec cards).

### FAQ page
A single list of drop-down questions.

### Navigation
- Header on every page: "MacEwan Law Club" wordmark on the left (links home), menu on the right (Home, About Us, FAQ) plus a **Join** button.
- On mobile the menu collapses into a hamburger; the Join button stays visible.
- Footer on every page repeats the menu, socials, and the club's location.
- Home page links into About Us ("Learn more about us" under Vision) and FAQ (from the footer and Join area).

---

## 4. Section Specs

### Home page

#### 4.1 Hero
- Left-aligned text, no large logo (the logo stays in the header). A short **hook message** (one punchy line plus one supporting sentence).
- **Club statistics** row: 3–4 big numbers, e.g. members, events hosted, years running, sponsors/partners. Numbers live in `site.json` so they are easy to update each term.
- Primary CTA: **Join MULC** (to the sign-up form). Secondary: **Upcoming events** (scrolls down).

#### 4.2 What We Stand For
- Full-width section with a **club photo as the background** and a dark overlay for legibility.
- Section title "*What we* / STAND FOR" (replaces "Our Vision"; same idea). Short statement plus 2×2 grid of points (e.g. what members get out of MULC).
- "Learn more about us" link to `/about`.

#### 4.3 Upcoming Events
- Event cards: event logo/image, title, date, time, location, short blurb, **Learn more** button.
- Horizontal carousel with dots when there are several events (swipeable on mobile); a simple stack when there is only one.
- **Learn more** opens a modal with full details and the RSVP link (no separate page needed for v1).
- Past events drop out automatically and move to Previous Events.
- Empty state: "No upcoming events right now. Follow us on Instagram to hear first."

#### 4.4 Sponsors
- Logo wall of sponsors/partners, each linking to their site.
- Optional one-line "Interested in sponsoring MULC? Contact us" link.
- Hidden entirely if the sponsor list is empty.

#### 4.5 Previous Events (+ photo albums)
- Grid of past events, newest first, each with a cover photo, title and date.
- Clicking one opens its photo album in a lightbox. **This section replaces the separate Photo Albums section** from v1 of this doc.

#### 4.6 Footer (all pages) — also serves as Contact
- **Location:** where the club meets / campus address.
- **Socials:** Instagram, LinkedIn, Discord, plus club email (mailto).
- **Menu:** Home, About Us, FAQ, Join.
- Copyright and a note that MULC is a student club and does not provide legal advice.

### About Us page (`/about`)

#### 4.7 Mission
Mission statement in a few sentences.

#### 4.8 History
When and why the club started, milestones so far. Can be a short timeline.

#### 4.9 Our Team
- Grid of exec cards (3 across on desktop, 2 on tablet, 1–2 on mobile): photo, name, role, program/year, short bio, optional LinkedIn.
- Ordered by role (President first). Initials avatar if no photo.
- Section title styled like the reference graphic: *The* Executives, with "2026–2027" beside it.
- Current team (2026–2027), from the club's Meet the Team post:

  | Name | Role |
  |---|---|
  | Moselle | President |
  | Mabel | Vice President |
  | Halle | VP of Events |
  | Kanwar | VP of Finance |
  | Maria | VP of Marketing |
  | Matthew | VP of Operations |

  Still needed: last names (if they want them shown), short bios, and individual headshots (the photos in the post can be reused if the originals are available).

### FAQ page (`/faq`)

#### 4.10 FAQ
- Drop-down (accordion) list of questions with a chevron that flips when open.
- Built on native `<details>/<summary>` so it works without JavaScript and with keyboards/screen readers.
- Starter questions: Do I need to be pre-law? Is there a fee? How do I join? How often do you meet? How do I become an exec?
- Ends with "Still have a question?" linking to the club email.

### How to Join (no dedicated section in the wireframe)
- v1 handles joining with the **Join** button in the header and hero, linking straight to the sign-up form, plus a "How do I join?" FAQ entry.
- A short 3-step Join section can be added to the home page later if the form alone isn't enough.

---

## 5. Visual Design

> **Updated 2026-10-06 from Lem's brand references:** the club's profile-picture logo, the "The Executives 2026–2027" title graphic (font idea), and the "Meet the Team 26'/27'" post (colour idea). Lem does **not** want white as the main background, so the site uses a dark, warm base with the club burgundy and cream from the posts.

### Logo
- Reuse the club's existing circular logo: burgundy disc, white serif "MACEWAN UNIVERSITY / LAW CLUB" between two rules, scales of justice below.
- File: `public/images/mulc-logo.png` (square, at least 512×512). Also export a favicon (32×32, 180×180 apple-touch) from it.
- Used in the header (small, ~40px) and footer. No large logo in the hero.

### Colour tokens
| Token | Value | Source / use |
|---|---|---|
| `--color-bg` | `#1A1214` (near-black wine) | Main page background, replaces white |
| `--color-bg-alt` | `#241719` | Alternate section background so sections separate while scrolling |
| `--color-primary` | `#991A2D` (MULC burgundy) | Sampled from the logo. Buttons, header bar, hero accents, section dividers |
| `--color-primary-hover` | `#B32237` | Button hover |
| `--color-cream` | `#FDFBF5` | From the Meet the Team post. Headings and body text on dark backgrounds; card backgrounds where a light panel is needed |
| `--color-rose` | `#D9A3A8` | Script headings and small accents on dark backgrounds (burgundy alone is too dark to read there) |
| `--color-muted` | `#B8AFA8` | Secondary text, dates |
| `--color-border` | `#3A2A2D` | Card borders, thin rules |

Rules:
- Burgundy text is only used on cream panels (like the Meet the Team post), never on the dark background, where it fails contrast.
- On dark backgrounds, text is cream or rose. Check every pair for WCAG AA (4.5:1 body, 3:1 large).
- Cream cards with burgundy text and a thin burgundy frame echo the Meet the Team post and work well for exec cards and event cards.
- Thin double rules (as in the logo) can be used as section dividers.

### Typography
Inspired by the "The Executives" graphic: a flowing script paired with an elegant high-contrast serif.

| Role | Font (Google Fonts) | Use |
|---|---|---|
| Script display | **Pinyon Script** (alt: *Great Vibes*) | One or two words per section title for flair, e.g. "*The* Executives", "*Upcoming* Events". Large sizes only (48px+), never body text |
| Serif display | **Bodoni Moda** (alt: *Playfair Display*) | Uppercase headings like "MEET THE TEAM", exec names, stats numbers. Matches the logo's Didone serif |
| Body / UI | **Inter** | Paragraphs, buttons, nav, forms |

- Pattern for big titles: small serif or script word over a large uppercase serif word, e.g. *The* / **EXECUTIVES** with "2026–2027" set small beside it.
- Scale: 16px base body, 1.25 ratio; hero H1 ~44px mobile / 72px desktop.

### Layout
- Mobile-first; breakpoints at 640px, 768px, 1024px, 1280px.
- Max content width 1200px, centred, 16px side gutters on mobile.
- Generous vertical spacing between sections (64–96px), alternating `--color-bg` and `--color-bg-alt`.
- Photo-backed sections (Hero, Vision) use a dark overlay (like the Executives graphic) so cream and script text stay legible.
- Cards: small radius (6–8px), thin frame rather than heavy shadow, matching the framed photos in the Meet the Team post.

### Motion
- Smooth scrolling and subtle fade-up as sections enter the viewport.
- Respect `prefers-reduced-motion`: disable animations when set.

---

## 6. Content Management

The site is maintained by execs who change every year, so **content lives in plain data files separate from layout code**. Updating events or execs should never require touching HTML/CSS.

```
src/content/
  site.json        # club name, hook, stats, vision, mission, history, location, socials, join form URL
  events.json      # [{ title, date, startTime, endTime, location, description, link }]
  execs.json       # [{ name, role, program, bio, photo, linkedin, order }]
  faq.json         # [{ question, answer }]
  sponsors.json    # [{ name, logo, url }]
  albums/          # one folder per previous event
    <event-slug>/
      album.json   # { title, date, cover }
      *.jpg
```

A short `CONTRIBUTING.md` (to be written with the build) will explain how to add an event, update stats, swap an exec, add a sponsor, or upload an album.

---

## 7. Tech Stack

> **Assumption:** No stack was specified. Defaults chosen for a fast, free, low-maintenance static site.

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro** (static output) | Ships near-zero JS, handles multiple pages (Home, About, FAQ) with shared header/footer layouts, renders JSON content at build time. |
| Styling | Plain CSS with custom-property tokens (§5) | No extra tooling; easy to rebrand by editing tokens. |
| Interactivity | Small vanilla JS islands (mobile menu, events carousel, event modal, lightbox) | Keeps the page light. |
| Fonts | Pinyon Script, Bodoni Moda, Inter via Google Fonts (`font-display: swap`) | Matches the brand references in §5. |
| Images | Astro's built-in image optimisation (WebP/AVIF, responsive sizes, lazy loading) | Fast photo albums on mobile. |
| Forms | Google Form or Formspree link | No backend to maintain. |
| Hosting | **GitHub Pages** (or Netlify/Vercel) via GitHub Actions | Free, deploys on every push to `main`. |
| Domain | Default `*.github.io` for v1; custom domain later if the club gets one. |

---

## 8. Accessibility & Quality Bar
- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and one `h1`.
- Every image has alt text; exec photos use the person's name.
- Fully keyboard navigable, visible focus states, skip-to-content link.
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90 on mobile.
- Open Graph / Twitter meta tags so links shared in Instagram/Discord show a proper preview card.
- Works without JavaScript (all content visible; only enhancements degrade).

---

## 9. Milestones
1. **Scaffold:** Astro project, tokens, shared layout (header + footer), three pages with placeholder content.
2. **Home page:** Hero + stats, Vision, Upcoming Events (carousel + modal), Sponsors.
3. **About + FAQ pages:** Mission, History, Our Team; FAQ accordion.
4. **Previous Events:** grid + photo lightbox.
5. **Polish:** motion, accessibility pass, Lighthouse pass, meta tags.
6. **Launch:** GitHub Pages deploy, real content from execs, CONTRIBUTING.md.

---

## 10. Open Questions
- Sign-up method: Google Form, MacEwan SA club page, or something else?
- Which socials does the club actively use (Instagram, Discord, LinkedIn, TikTok)?
- Which club statistics to show, and their real numbers?
- Current sponsors (names, logos, links)?
- Where should "Location" in the footer point: a room, a campus building, or a map link?
- Will photo albums be hosted in the repo or linked externally?
- Custom domain wanted?
- Exec bios, last names and original headshots?
