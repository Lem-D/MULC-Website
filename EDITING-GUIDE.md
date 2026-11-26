# How to update the MULC website (for execs)

You don't need to know how to code to update the site. Everything you'll change lives in a few text files, and you can edit them right on GitHub in your browser. This guide covers the three updates you'll do most: **events**, **partners** and the **FAQ**.

If you get stuck, ask whoever looks after the website (the VP who set it up), or send them a link to the file you were editing.

---

## Before you start

1. You need a GitHub account with access to the **Lem-D/MULC-Website** repository. Ask the website owner to add you.
2. All the text lives in the **`src/content`** folder. Each file is named after what it controls:

   | To change… | Open this file |
   |---|---|
   | Upcoming events (Home page) | `src/content/events.json` |
   | Partner logos (Home and Partner with us) | `src/content/sponsors.json` |
   | FAQ questions | `src/content/faq.json` |
   | Photo albums of past events | `src/content/albums.json` |
   | Exec team (About Us) | `src/content/execs.json` |
   | Club email, socials, homepage text | `src/content/site.json` |
   | Numbers: members, events, partners (every page) | `src/content/stats.json` |
   | Exec team year, faculty advisor | `src/content/site.json` |

   Everything you can change is in the `src/content/` folder. Its `README.md` has the full list.

## Editing a file on GitHub (the same every time)

1. Go to the repository on github.com and click into `src` → `content` → the file you want.
2. Click the **pencil icon** (Edit this file) at the top right of the file.
3. Make your change. Only change the text **between the quote marks** on the right-hand side.
4. Click **Commit changes…**, write a short note of what you did (e.g. "Add Mock Trial event"), and click **Commit changes** again.
5. Wait about 3 minutes, then open the site and refresh. Your change should be live.

To add a photo or logo: go to the folder it belongs in (for example `public/images/events`), click **Add file → Upload files**, drag the picture in, and commit. Use simple file names with no spaces, like `mock-trial-2026.jpg`.

### The four rules that prevent almost every problem

These files are in a format called JSON. It's fussy, but only in a few ways:

1. **Text goes inside straight double quotes:** `"Room 7-218"`. Not curly quotes (“ ”), not single quotes.
2. **Items are separated by commas, but the last item in a list has no comma after it.**
3. **If your text needs a double quote inside it, put a backslash before it:** `"The \"Meet the Firm\" night"`. Apostrophes (') are fine as they are.
4. **Keep every `{` `}` `[` `]` that was there.** When you copy a block, copy from its `{` to its matching `}`.

`true` and `false` are written without quotes.

**Did it break?** After you commit, GitHub checks the site. Click the **Actions** tab: a green check means it's live, a red X means something's wrong. A red X never breaks the live site, it just keeps the last good version up. Open the failed run to see the error (it usually names the file and line), fix it, and commit again. You can also paste the file into [jsonlint.com](https://jsonlint.com) to find the typo.

**Made a mistake?** Open the file, click **History**, pick the last good version, and copy its text back in. Or just ask the website owner.

---

## Events (`src/content/events.json`)

Each event on the Home page is one block. To add one, copy this block, paste it into the list, and fill it in:

```json
{
  "title": "Lawyer Speaker Night",
  "start": "2026-11-05T18:00",
  "end": "2026-11-05T20:00",
  "dateTbd": false,
  "dateLabel": "Thursday, November 5",
  "timeLabel": "6:00 – 8:00 PM",
  "month": "NOV",
  "day": "05",
  "location": "Room 7-218, Building 7",
  "summary": "One or two lines shown on the event card.",
  "description": "The longer text shown when someone clicks Learn more.",
  "image": "images/events/speaker-night.jpg",
  "rsvpUrl": "https://forms.gle/..."
}
```

What each line does:

| Line | What to put |
|---|---|
| `title` | The event name. |
| `start`, `end` | Date and time as `YEAR-MM-DDTHH:MM` in 24-hour time (6 PM = `18:00`). These power the **Add to calendar** button. Leave them as `""` and the button hides. |
| `dateLabel`, `timeLabel` | The date and time the way people read them. |
| `month`, `day` | What shows in the round date badge: three capital letters and two digits, like `"NOV"` and `"05"`. |
| `location` | Room and building. |
| `summary` | Short text for the card. Keep it to one or two lines. |
| `description` | Full details for the popup: who's speaking, who it's for, anything to bring. |
| `image` | Photo across the top of the card. Upload it to `public/images/events/` first, then write its path starting from `images/`. Leave `""` for none. Landscape, about 1200 px wide, under 500 KB. |
| `rsvpUrl` | Link to the RSVP form. Leave `""` and the RSVP button goes to MULC's events page on Campus Labs instead. |

**Planned but no date yet?** Set `"dateTbd": true`, put a rough time in `dateLabel` (e.g. `"Winter 2027"`), and leave `start`, `end`, `month`, `day`, `timeLabel` and `location` as `""`. The card shows **TBD** and **Coming soon**. When the date is set, switch it back to `false` and fill in the rest.

**Order:** events show in the order they're listed, so keep the soonest one first.

**After the event:** delete its block (from `{` to `}`, plus the comma between it and its neighbour). If you have photos, add an album (below).

### Past event photo albums (`src/content/albums.json`)

Upload the photos to a new folder like `public/images/albums/mock-trial-2026/`, then add a block:

```json
{
  "title": "Mock Trial 2026",
  "date": "March 2026",
  "cover": "images/albums/mock-trial-2026/01.jpg",
  "photos": ["images/albums/mock-trial-2026/01.jpg", "images/albums/mock-trial-2026/02.jpg"],
  "externalUrl": "https://www.instagram.com/p/..."
}
```

`externalUrl` is optional and adds a **See the full album** button (for example, an Instagram post). Resize photos to about 1600 px wide first so the page stays fast on phones.

---

## Partners (`src/content/sponsors.json`)

These are the logos under the hero on Home and at the bottom of **Partner with us**. Each partner is:

```json
{
  "name": "Smith & Lee LLP",
  "logo": "images/sponsors/smith-lee.png",
  "url": "https://smithlee.ca"
}
```

1. Upload the logo to `public/images/sponsors/`. A PNG or SVG with a transparent background looks best on the dark site. A white or light-coloured version of the logo is ideal.
2. Add the block. `name` is also what screen readers announce, so spell it the way the firm does.
3. `url` is optional. With it, the logo links to the partner's site.

To remove a partner, delete their block. If there are no logos yet, a placeholder block shows the name in text.

The rest of the **Partner with us** page (the pitch, the two sponsorship options, the sponsor package PDF and the inquiry form) is in `src/content/partners.json`. See `CONTRIBUTING.md` for those.

---

## FAQ (`src/content/faq.json`)

Each question is a pair:

```json
{
  "question": "How often does the club meet?",
  "answer": "We hold one event most months during the fall and winter terms."
}
```

- Add, reword or delete pairs. They show in the order listed, and the first one starts open.
- Answers are plain text: no bold, bullet points or links.
- The **Club documents** dropdown at the bottom of the FAQ comes from `src/content/documents.json` (the constitution PDFs). See `CONTRIBUTING.md` when a new constitution is ratified.

---

## Things to keep off the site

- Personal phone numbers or personal emails. Use the club email, mulawclub@gmail.com.
- Membership fees or a Discord server. MULC has neither, so don't add them.
- Text in `[square brackets]` is a placeholder. Replace the whole thing, brackets included.

## Want to preview before it goes live?

You can, but it's optional. It needs Node.js on your computer; the steps are in `README.md` (`npm install`, then `npm run dev`). `npm run check` builds the site and checks every link inside it, the same check GitHub runs.
