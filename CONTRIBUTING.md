# Updating the MULC website

Everything on the site comes from the files in `src/content/`. You don't need to touch any code to update it. Anything in `[brackets]` is a placeholder waiting for real content.

After editing, run `npm run dev` to check it, then commit and push to `main`. The site updates itself within a few minutes.

## Add or change an event

Edit `src/content/events.json`. Each event looks like this:

```json
{
  "title": "Lawyer Speaker Night",
  "start": "2026-11-05T18:00",
  "end": "2026-11-05T20:00",
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
- `rsvpUrl` turns on the **RSVP** button. Leave it as `""` to hide it.
- Put event posters in `public/images/events/` and point `image` at them.
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

## Club info, socials and the sign-up form

Edit `src/content/site.json`:

- `joinFormUrl`: the sign-up form link (e.g. a Google Form). Every **Join MULC** button uses it. Until it's set, those buttons scroll to the Join section.
- `email`, `socials` and `location.mapsUrl`: links only appear once a URL is filled in.
- `stats`, `standFor`, `mission` and `history`: the text on Home and About Us.

## FAQ and sponsors

Edit `src/content/faq.json` and `src/content/sponsors.json`. Sponsor logos go in `public/images/sponsors/`.
