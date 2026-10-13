// Small enhancements for the MULC site. Every page still works without JavaScript.
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
$$('a', nav).forEach((a) => a.addEventListener('click', () => nav.classList.remove('open')));

// ----- Upcoming events carousel -----
const track = $('#track');
if (track) {
  const dots = $('#dots');
  const cards = () => $$('.ecard', track);
  const step = () => cards()[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap);
  const perView = () => Math.max(1, Math.round(track.clientWidth / step()));
  const pagesCount = () => Math.max(1, cards().length - perView() + 1);
  const current = () => Math.round(track.scrollLeft / step());
  const go = (i) => {
    const c = cards()[Math.max(0, Math.min(i, cards().length - 1))];
    track.scrollTo({ left: c.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };
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
  window.addEventListener('resize', buildDots);
  buildDots();
}

// ----- Popups (event details, photo albums) -----
const readJSON = (id) => JSON.parse($(id)?.textContent || '[]');
const events = readJSON('#events-data');
const albums = readJSON('#albums-data');

$$('dialog').forEach((d) => {
  d.addEventListener('click', (e) => {
    if (e.target === d || e.target.closest('[data-close]')) d.close();
  });
});

const setLink = (el, href) => {
  el.hidden = !href;
  if (href) el.href = href;
};

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-event],[data-album]');
  if (!t) return;
  if (t.dataset.event) {
    const ev = events[+t.dataset.event];
    $('#ev-title').textContent = ev.title;
    $('#ev-date').textContent = ev.dateLabel;
    $('#ev-time').textContent = ev.timeLabel;
    $('#ev-loc').textContent = ev.location;
    $('#ev-desc').textContent = ev.description;
    $('#ev-hero').style.background = ev.image ? `url('${ev.image}') center/cover` : '';
    $('#ev-hero .ph').hidden = Boolean(ev.image);
    setLink($('#ev-rsvp'), ev.rsvpUrl);
    setLink($('#ev-cal'), ev.calendarUrl);
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

// ----- Scroll reveals -----
// Elements with flow_in_up / flow_in_left / fade_in / flow_in_top / flow_in_bottom get .visible
// as soon as their top edge is a little way into the viewport, so each one animates while the
// page is still reaching it. .visible is never removed, so nothing animates back out.
window.mulcReveal = true;
let pending = $$('.flow_in_up, .flow_in_left, .fade_in, .flow_in_top, .flow_in_bottom');
const reveal = () => {
  pending = pending.filter((el) => {
    const r = el.getBoundingClientRect();
    // Measure where the element sits once in place, not where its start offset has moved it.
    const shift = el.classList.contains('flow_in_bottom') ? r.height : el.classList.contains('flow_in_top') ? -1.3 * r.height : 0;
    const top = r.top - shift;
    const bottom = r.bottom - shift;
    if (bottom > innerHeight && top > innerHeight * 0.85) return true;
    el.classList.add('visible');
    // Once it has arrived, drop the stagger delay so hover effects respond straight away.
    el.addEventListener('transitionend', () => el.classList.add('settled'), { once: true });
    return false;
  });
};
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
