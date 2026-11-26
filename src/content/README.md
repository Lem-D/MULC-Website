# Site content: edit everything here

Everything on the MULC website that changes from year to year (numbers, names, events, partners, links, wording) lives in this folder, `src/content/`. You shouldn't need to touch any other code.

Each file is JSON. Only change the text **between the quote marks** on the right-hand side, and keep the commas and brackets as they are. Leaving a link as `""` hides its button.

| What you want to change | File |
| --- | --- |
| Numbers: members, events hosted, partners, attendance | `stats.json` |
| Exec team names, roles, headshots, LinkedIn | `execs.json` |
| Which school year the exec team is for (e.g. "2026–2027") | `site.json` → `execTerm` |
| Faculty advisor: name, bio, photo, profile link | `site.json` → `advisor` |
| Upcoming events: title, date, place, poster, RSVP link | `events.json` |
| Past event photo albums | `albums.json` |
| Partner and sponsor logos | `sponsors.json` |
| Partner with us page: pitch, sponsorship options, sponsor package PDF, partnerships email | `partners.json` |
| Join page: steps and membership requirements | `join.json` |
| FAQ questions and answers | `faq.json` |
| Club documents (constitution PDFs) | `documents.json` |
| Club email, social links, Campus Labs link, address | `site.json` |
| Home page wording: tagline, intro, What we stand for, hero photo | `site.json` |
| About page wording: mission, history timeline, background photo (`aboutImage`) | `site.json` |

## Numbers (`stats.json`)

- `numbers` has each stat's `value` and `label`. Change a number once here and it updates on every page.
- `home` and `partners` list which stats show on each page, in order.
- In page text, `{members}` is replaced with the member count (works for any stat name).

## Photos and PDFs

Pictures and files go in `public/` (for example `public/images/execs/`, `public/images/events/`, `public/docs/`). Then put the path in the content file **without** `public/`, e.g. `"photo": "images/execs/moselle.jpg"`.

Use simple file names with no spaces, and keep photos under about 500 KB.

## More help

- `EDITING-GUIDE.md` (in the main folder) walks through editing on github.com step by step.
- `CONTRIBUTING.md` lists every field in detail.
