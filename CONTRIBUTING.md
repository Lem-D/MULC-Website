# Updating the MULC website

New to this? Read **`EDITING-GUIDE.md`** first. It walks through updating events, partners and the FAQ on github.com, step by step. This page is the full reference for every field.

Everything on the site comes from the files in `src/content/`. You don't need to touch any code to update it. Anything in `[brackets]` is a placeholder waiting for real content.

After editing, run `npm run dev` to check it (and `npm run check` to catch broken links), then commit and push to `main`. The site updates itself within a few minutes. If GitHub's build fails (a red X under **Actions**), the live site stays as it was until the error is fixed.

## Add or change an event

Edit `src/content/events.json`. Each event looks like this:

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
  "summary": "Shown on the event card.",
  "description": "Shown in the Learn more popup.",
  "image": "images/events/speaker-night.jpg",
  "rsvpUrl": "https://forms.gle/..."
}
```

- `start` and `end` turn on the **Add to calendar** button. Leave them as `""` to hide it.
- `rsvpUrl`: where the **RSVP** button (on the card and in the popup) goes. Every event shows RSVP. If you leave it as `""`, the button opens MULC's events list on Campus Labs.
- `dateTbd`: set to `true` for an event that's planned but has no date yet. The card shows a **TBD** disc and a "Coming soon" label, and hides Add to calendar. Put a rough time in `dateLabel` (e.g. `"Winter 2027"`) and leave `location` empty until it's booked. Switch it back to `false` once the date is set.
- `image` is the photo across the top of the card and the popup. Put event photos (landscape, about 1200px wide) in `public/images/events/` and point `image` at them.
- Delete events once they're over, and add them to `albums.json` if there are photos.

## Swap an exec

Edit `src/content/execs.json`. Put headshots (square crops look best) in `public/images/execs/` and set `photo` to e.g. `"images/execs/maria.jpg"`. Without a photo the card shows the person's first initial. `linkedin` is optional.

Also update the year (`2026–2027`) in `src/pages/about.astro`.

## Add a photo album

Put the photos in `public/images/albums/<album-name>/`, then add an entry to `src/content/albums.json`:

```json
{
  "title": "Mock Trial 2026",
  "date": "March 2026",
  "cover": "images/albums/mock-trial-2026/01.jpg",
  "photos": ["images/albums/mock-trial-2026/01.jpg", "images/albums/mock-trial-2026/02.jpg"],
  "externalUrl": "https://instagram.com/..."
}
```

Keep each photo under about 500 KB (resize to 1600px wide) so the site stays fast. `externalUrl` adds a **See the full album** button.

## Joining (Campus Labs)

Every **Join MULC** button goes to the Join page (`/join/`), which sends students on to Campus Labs.

- `campusLabsUrl` in `src/content/site.json`: MULC's Campus Labs page, e.g. `"https://samu.campuslabs.ca/engage/organization/mulc"`. Until it's set, the Campus Labs buttons show "Campus Labs link coming soon".
- `src/content/join.json`: the intro, the 4 steps and the requirements. The requirements follow Article III of the constitution, so update them if the constitution changes.

## Club info and socials

Edit `src/content/site.json`:

- `email`, `socials` and `location.mapsUrl`: links only appear once a URL is filled in.
- `stats`, `standFor`, `mission` and `history`: the text on Home and About Us.
- `heroImage`: the team photo at the top of the Home page (landscape). On computers it sits on the right and fades into the dark behind the text; on tablets and phones it is a band above the text. Put it in `public/images/hero/` and set e.g. `"images/hero/team.jpg"`.
- `heroImageWidths`: optional. If you list widths like `[960, 1440, 1920]`, the page loads resized copies named `team-960.jpg` + `team-960.webp` and so on (they must all exist), so phones download a small file. Leave it out or `[]` to use the single file as is.
- `heroImagePhone` / `heroImagePhoneWidths`: optional taller crop used on phones (under 761px wide), same naming rules. Crop it so everyone is in frame with a little space around them. Leave `heroImagePhone` as `""` to use the landscape photo on phones too.
- When swapping in a new photo, check the Home page at phone, tablet and laptop widths to make sure nobody sits behind the text.

## FAQ and club documents

Edit `src/content/faq.json` for the questions. The **Club documents** dropdown at the bottom of the FAQ comes from `src/content/documents.json`:

- PDFs live in `public/docs/constitution/` (older ones in `past/`).
- When a new constitution is ratified, move the old `current` file into `past/`, add it to the top of the `past` list, and point `current` at the new file with its title and `details` line (pages and signing date).
- Link straight to the dropdown with `faq/#documents`.

## Partners and sponsors

- `src/content/sponsors.json`: the partner logos shown right under the hero on Home and at the bottom of **Partner with us**. Logos go in `public/images/sponsors/`.
- `src/content/partners.json`: everything else on the **Partner with us** page.
  - `email`: the one general partnerships address shown on the page.
  - `formspreeId`: the inquiry popup sends through [Formspree](https://formspree.io). Create a form there, then paste the ID from its endpoint (`https://formspree.io/f/abcdwxyz` -> `"abcdwxyz"`). Until it's set, the popup shows but its Send button is switched off.
  - `stats`, `pitch`, `options` (the two sponsorship cards and their perks).
  - `package.pdf`: put the sponsorship package in `public/docs/` and set e.g. `"docs/sponsorship-package-2026-2027.pdf"`. This turns on **Download PDF** and **View online**. `package.viewUrl` is optional, for an online version (e.g. a Canva link) that should open instead of the PDF. Update `package.details` with the page count and date.

## Link previews

When a link to the site is pasted into an email, LinkedIn or a chat, it shows a preview card. The images are `public/images/share/home.png` (every page) and `public/images/share/partners.png` (Partner with us), both 1200 × 630. Replace them with files of the same size and name to change the card. The preview text is each page's description, set at the top of the page in `src/pages/`.
