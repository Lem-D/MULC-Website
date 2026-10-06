# MULC Website — Design Document

**Project:** The official website for the MacEwan University Law Club (MULC)
**Status:** Draft v1 (2026-10-06)
**Owner:** Lem

> A one-page hub where students can learn about the club, meet the execs, see upcoming events and photos, find out how to join, and get in touch.

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

## 3. User Flow

The site is a **single landing page**. The user arrives on a hero section with general club info, then scrolls (or jumps via the nav) through the sections in this order:

```
┌─────────────────────────────┐
│ Sticky Nav (logo + links +  │
│ "Join" button)              │
├─────────────────────────────┤
│ 1. Hero / General info      │  ← landing view
│ 2. About Us (detailed)      │
│ 3. Upcoming Events          │
│ 4. Meet the Execs           │
│ 5. How to Join              │
│ 6. Photo Albums             │
│ 7. FAQ                      │
│ 8. Contact                  │
├─────────────────────────────┤
│ Footer                      │
└─────────────────────────────┘
```

**Ordering rationale:** Identity first (Hero → About), then the most time-sensitive content (Events), then people (Execs), then the conversion step (Join) while interest is high. Photos reinforce the vibe, FAQ catches remaining doubts, and Contact is the catch-all at the end.

### Navigation
- **Sticky top nav** with anchor links to every section; smooth-scroll to anchors (`#about`, `#events`, `#execs`, `#join`, `#photos`, `#faq`, `#contact`).
- The active section is highlighted in the nav as the user scrolls.
- On mobile, links collapse into a hamburger menu that opens a full-screen overlay; the **Join** button stays visible outside the menu.
- A "back to top" button appears after scrolling past the hero.

---

## 4. Section Specs

### 4.1 Hero / General Info (`#home`)
- Club logo, name ("MacEwan University Law Club"), and a one-line tagline.
- 2–3 sentence summary of what MULC does.
- Primary CTA: **Join MULC** (scrolls to `#join`). Secondary CTA: **See Events** (scrolls to `#events`).
- Background: a campus/club photo with a dark overlay for text contrast, or a solid brand colour if no photo is ready.
- Optional "next event" pill under the CTAs (pulled from events data) so the most important update is visible without scrolling.

### 4.2 About Us (`#about`)
- Mission statement.
- "What we do" as 3–4 icon cards (e.g. Speaker Nights, LSAT Prep, Mock Trials, Networking).
- Short history / founding year and affiliation with MacEwan Students' Association.

### 4.3 Upcoming Events (`#events`)
- Cards sorted by date, nearest first. Each card: date badge, title, time, location, short description, and an RSVP / details link if available.
- Events whose date has passed are automatically hidden (filtered at build time and again on the client).
- Empty state: "No upcoming events right now. Follow us on Instagram to hear first."
- Optional "Add to calendar" (.ics) link per event.

### 4.4 Meet the Execs (`#execs`)
- Responsive grid of cards: photo, name, role, program/year, 1–2 line bio, optional LinkedIn/email.
- Square photos, consistent crop. Fallback: initials avatar when no photo.
- Ordered by role (President first).

### 4.5 How to Join (`#join`)
- 3 numbered steps (e.g. 1. Sign up on the form, 2. Join our Discord/Instagram, 3. Come to an event).
- Big primary button to the sign-up form (Google Form or MacEwan SA club page link).
- Note on eligibility / cost (e.g. "Open to all MacEwan students. Free.").

### 4.6 Photo Albums (`#photos`)
- Grid of album covers (cover photo, album title, date).
- Clicking an album opens a lightbox gallery with keyboard + swipe navigation.
- v1: images stored in the repo, optimized at build time. If storage grows, albums can link out to Google Photos / Instagram instead.

### 4.7 FAQ (`#faq`)
- Accordion of question/answer pairs; one open at a time is not required.
- Built with native `<details>/<summary>` for accessibility and no-JS support.
- Starter questions: Do I need to be pre-law? Is there a fee? How often do you meet? How do I become an exec?

### 4.8 Contact (`#contact`)
- Club email (mailto link), social links (Instagram, LinkedIn, Discord).
- Optional simple contact form posting to a form service (Formspree or Google Form), so no backend is needed.

### 4.9 Footer
- Logo, social icons, copyright, "Website maintained by MULC," and a disclaimer that MULC is a student club and does not provide legal advice.

---

## 5. Visual Design

> **Assumption:** No branding was provided. The palette below is a placeholder chosen to feel "law club": trustworthy navy with a warm gold accent. Swap in official MULC / MacEwan colours and logo when available.

### Colour tokens
| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#1B2A4A` (deep navy) | Nav, headings, hero overlay |
| `--color-accent` | `#C9A227` (muted gold) | CTAs, highlights, active nav |
| `--color-bg` | `#FAF8F4` (warm off-white) | Page background |
| `--color-surface` | `#FFFFFF` | Cards |
| `--color-text` | `#1F2933` | Body text |
| `--color-muted` | `#6B7280` | Secondary text, dates |
| `--color-border` | `#E5E1D8` | Card borders, dividers |

All text/background pairs must meet WCAG AA contrast (4.5:1 body, 3:1 large text). Gold is used for buttons/accents with navy text on top, not for body text on white.

### Typography
- **Headings:** a serif for a classic legal feel, e.g. *Playfair Display* or *Libre Baskerville* (Google Fonts).
- **Body/UI:** a clean sans, e.g. *Inter*.
- Scale: 16px base body, 1.25 ratio; H1 ~40px mobile / 56px desktop.

### Layout
- Mobile-first; breakpoints at 640px, 768px, 1024px, 1280px.
- Max content width 1200px, centred, 16px side gutters on mobile.
- Generous vertical spacing between sections (64–96px); alternate section backgrounds (bg / surface) so sections are visually distinct while scrolling.
- Cards: 12px radius, subtle shadow, lift slightly on hover.

### Motion
- Smooth scrolling and subtle fade-up as sections enter the viewport.
- Respect `prefers-reduced-motion`: disable animations when set.

---

## 6. Content Management

The site is maintained by execs who change every year, so **content lives in plain data files separate from layout code**. Updating events or execs should never require touching HTML/CSS.

```
src/content/
  site.json        # club name, tagline, about text, social links, join form URL
  events.json      # [{ title, date, startTime, endTime, location, description, link }]
  execs.json       # [{ name, role, program, bio, photo, linkedin, order }]
  faq.json         # [{ question, answer }]
  albums/
    <album-slug>/
      album.json   # { title, date, cover }
      *.jpg
```

A short `CONTRIBUTING.md` (to be written with the build) will explain how to add an event, swap an exec, or upload an album.

---

## 7. Tech Stack

> **Assumption:** No stack was specified. Defaults chosen for a fast, free, low-maintenance static site.

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro** (static output) | Ships near-zero JS, renders JSON content into HTML at build time, easy for beginners to read. |
| Styling | Plain CSS with custom-property tokens (§5) | No extra tooling; easy to rebrand by editing tokens. |
| Interactivity | Small vanilla JS islands (nav highlight, lightbox, mobile menu) | Keeps the page light. |
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
1. **Scaffold:** Astro project, tokens, layout, sticky nav, section shells with placeholder content.
2. **Content sections:** Hero, About, Events, Execs, Join, FAQ, Contact wired to JSON.
3. **Photos:** albums grid + lightbox.
4. **Polish:** motion, accessibility pass, Lighthouse pass, meta tags.
5. **Launch:** GitHub Pages deploy, real content from execs, CONTRIBUTING.md.

---

## 10. Open Questions
- Official MULC logo and colours? (Placeholder palette in §5 until provided.)
- Sign-up method: Google Form, MacEwan SA club page, or something else?
- Which socials does the club actively use (Instagram, Discord, LinkedIn, TikTok)?
- Should past events be archived somewhere, or simply disappear?
- Will photo albums be hosted in the repo or linked externally?
- Custom domain wanted?
