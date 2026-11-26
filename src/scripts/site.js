// Small enhancements for the MULC site. Every page still works without JavaScript.
// Loaded on every page by layouts/Base.astro. Each block below checks that its elements exist,
// so a feature only runs on the page that has it.
//
// Sections:
//   Mobile menu ............ header menu button (all pages)
//   Events carousel ........ arrows and dots for Upcoming Events (Home)
//   Previous events ........ "See all past events" on phones (Home)
//   Popups ................. event details and photo albums (Home)
//   Partner inquiry popup .. form toggle and Formspree sending (Partner with us)
//   Scroll reveals ......... flow_in_* / fade_in animations (all pages)
//   Header tuck ............ header hides while scrolling down on desktop
//   Background video ....... pauses for reduced-motion visitors

// Shorthand: $ finds one element, $$ finds all of them as an array.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

// ----- Mobile menu -----
const nav = $('#mainNav');
const menuBtn = $('#menuBtn');
menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
const closeMenu = (focusBtn) => {
  if (!nav?.classList.contains('open')) return;
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
  if (focusBtn) menuBtn.focus();
};
if (nav) $$('a', nav).forEach((a) => a.addEventListener('click', () => closeMenu(false)));
// Escape or a tap outside the header closes the menu.
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(true); });
document.addEventListener('click', (e) => { if (!e.target.closest('header.site')) closeMenu(false); });

// ----- Upcoming events carousel -----
const track = $('#track');
if (track) {
  const dots = $('#dots');
  const cards = () => $$('.ecard', track);
  // Measured live, so the maths follows the CSS at every screen width:
  // step = one card plus the gap, perView = cards visible at once, pagesCount = scroll positions
  // (one dot each), current = index of the card at the left edge.
  const step = () => cards()[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap);
  const perView = () => Math.max(1, Math.round(track.clientWidth / step()));
  const pagesCount = () => Math.max(1, cards().length - perView() + 1);
  const current = () => Math.round(track.scrollLeft / step());
  const go = (i) => {
    const c = cards()[Math.max(0, Math.min(i, cards().length - 1))];
    track.scrollTo({ left: c.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };
  // Highlight the current dot and disable an arrow at either end.
  const sync = () => {
    const i = Math.min(current(), pagesCount() - 1);
    $$('button', dots).forEach((d, j) => d.setAttribute('aria-current', String(j === i)));
    $('#prevEv').disabled = track.scrollLeft < 4;
    $('#nextEv').disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  const buildDots = () => {
    if (!cards().length) return;
    dots.innerHTML = Array.from({ length: pagesCount() }, (_, i) => `<button aria-label="Go to event ${i + 1}"></button>`).join('');
    $$('button', dots).forEach((d, i) => d.addEventListener('click', () => go(i)));
    sync();
  };
  $('#prevEv').addEventListener('click', () => go(current() - 1));
  $('#nextEv').addEventListener('click', () => go(current() + 1));
  track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
  // Cards per view changes with the screen width, and so does the number of dots.
  window.addEventListener('resize', buildDots);
  buildDots();
}

// ----- Previous events: phones show three albums until "See all past events" is tapped -----
const albumGrid = $('#albums');
const albumsMore = $('#albumsMore');
if (albumGrid && albumsMore && $$('.album', albumGrid).length > 3) {
  albumGrid.classList.add('collapsed');
  albumsMore.hidden = false;
  albumsMore.addEventListener('click', () => {
    albumGrid.classList.remove('collapsed');
    albumsMore.hidden = true;
    $$('.album', albumGrid)[3]?.focus();
  });
}

// ----- Popups (event details, photo albums) -----
// The event and album details come from the <script type="application/json"> blocks in index.astro.
const readJSON = (id) => JSON.parse($(id)?.textContent || '[]');
const events = readJSON('#events-data');
const albums = readJSON('#albums-data');

// Clicking the dark backdrop (the <dialog> itself) or any [data-close] button closes a popup.
// Escape closes it too; that is built into <dialog>.
$$('dialog').forEach((d) => {
  d.addEventListener('click', (e) => {
    if (e.target === d || e.target.closest('[data-close]')) d.close();
  });
});

// Show a popup button only when it has somewhere to go.
const setLink = (el, href) => {
  el.hidden = !href;
  if (href) el.href = href;
};

// One listener for every "Learn more" (data-event) and album (data-album) button.
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-event],[data-album]');
  if (!t) return;
  if (t.dataset.event) {
    const ev = events[+t.dataset.event];
    $('#ev-title').textContent = ev.title;
    $('#ev-date').textContent = ev.dateText;
    $('#ev-time').textContent = ev.timeText;
    $('#ev-loc').textContent = ev.locationText;
    $('#ev-desc').textContent = ev.description;
    $('#ev-hero').style.background = ev.image ? `url('${ev.image}') center/cover` : '';
    $('#ev-hero .ph').hidden = Boolean(ev.image);
    setLink($('#ev-rsvp'), ev.rsvpUrl);
    setLink($('#ev-cal'), ev.calendarUrl);
    $('#ev-rsvp-note').hidden = !ev.rsvpUrl;
    $('#dlg-event').showModal();
  } else {
    const al = albums[+t.dataset.album];
    $('#al-title').textContent = al.title;
    $('#al-date').textContent = al.date;
    const photos = $('#photos');
    photos.replaceChildren();
    if (al.photos.length) {
      al.photos.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${al.title}, photo ${i + 1}`;
        img.loading = 'lazy';
        img.style.cssText = 'width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:3px';
        photos.append(img);
      });
    } else {
      // No photos yet: show six grey placeholders so the layout can be checked.
      for (let i = 1; i <= 6; i++) {
        const ph = document.createElement('div');
        ph.textContent = `[Photo ${i}]`;
        photos.append(ph);
      }
    }
    setLink($('#al-more'), al.externalUrl);
    $('#dlg-album').showModal();
  }
});

// ----- Partner inquiry popup (Partner with us page) -----
// Any element with data-inquiry="event" or "general" opens the form with that topic picked.
const inq = $('#dlg-inquiry');
if (inq) {
  const form = $('#inq-form');
  const status = $('#inq-status');
  // Switch the "I'm interested in" toggle; the event dropdown only shows for event sponsorship.
  const pick = (kind) => {
    $$('.seg button', inq).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.kind === kind)));
    $('#inq-interest').value = kind === 'event' ? 'Sponsoring an event' : 'General sponsorship';
    $('#inq-event-field').hidden = kind !== 'event';
  };
  $$('.seg button', inq).forEach((b) => b.addEventListener('click', () => pick(b.dataset.kind)));
  $$('[data-inquiry]').forEach((t) =>
    t.addEventListener('click', (e) => {
      e.preventDefault();
      pick(t.dataset.inquiry);
      status.textContent = '';
      inq.showModal();
    })
  );
  // Sends through Formspree without leaving the page. The form stays switched off
  // until "formspreeId" is set in src/content/partners.json.
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.getAttribute('action')) return;
    const btn = $('button[type="submit"]', form);
    btn.disabled = true;
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      pick('event');
      status.textContent = "Thanks! Your message is on its way and we'll be in touch soon.";
    } catch {
      status.textContent = 'Something went wrong sending your message. Please try again, or email us instead.';
    } finally {
      btn.disabled = false;
    }
  });
}

// ----- Scroll reveals -----
// Elements with flow_in_up / flow_in_left / fade_in / flow_in_top / flow_in_bottom get .visible
// as soon as their top edge is a little way into the viewport, so each one animates while the
// page is still reaching it. .visible is never removed, so nothing animates back out.
// Tells the safety timer in Base.astro that this script loaded, so it leaves the animations on.
window.mulcReveal = true;
let pending = $$('.flow_in_up, .flow_in_left, .fade_in, .flow_in_top, .flow_in_bottom');
const reveal = () => {
  pending = pending.filter((el) => {
    const r = el.getBoundingClientRect();
    // Measure where the element sits once in place, not where its start offset has moved it.
    const shift = el.classList.contains('flow_in_bottom') ? r.height : el.classList.contains('flow_in_top') ? -1.3 * r.height : 0;
    const top = r.top - shift;
    const bottom = r.bottom - shift;
    // Keep waiting while the element is still below the fold (its top not yet 15% up into view).
    if (bottom > innerHeight && top > innerHeight * 0.85) return true;
    el.classList.add('visible');
    // Once it has arrived, drop the stagger delay so hover effects respond straight away.
    el.addEventListener('transitionend', () => el.classList.add('settled'), { once: true });
    return false;
  });
};
// Scroll and resize fire many times a second; this runs the work at most once per frame.
let queued = false;
const onScroll = () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { queued = false; reveal(); tuckHeader(); });
};

// ----- Header hides on scroll down (desktop only) -----
const header = $('header.site');
let lastY = scrollY;
function tuckHeader() {
  const y = scrollY;
  const desktop = innerWidth >= 1024;
  header?.classList.toggle('tucked', desktop && y > lastY && y > 120);
  lastY = y;
}

addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
addEventListener('load', reveal);
reveal();

// ----- Background video: hold still for people who prefer reduced motion -----
const bgVideo = $('.page-bg video');
if (bgVideo && matchMedia('(prefers-reduced-motion: reduce)').matches) {
  bgVideo.removeAttribute('autoplay');
  bgVideo.pause();
}
