/* ═══════════════════════════════════════════════════════════
   ASHWINI ❤ MAYUR — THE ROYAL WEDDING EXPERIENCE
   Vanilla JS · ES6+ · No dependencies
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── ★ CONFIGURATION — edit these values ★ ─────────────── */
const CONFIG = {
  // WhatsApp number for RSVP / sharing (international format, digits only, e.g. "919876543210")
  whatsappNumber: '91XXXXXXXXXX',

  // Google Maps link for venue directions
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Juni+Manawar,+Dhar,+Madhya+Pradesh',

  // Background music file (place mp3 in assets/music/)
  musicSrc: 'assets/music/wedding.mp3',

  // Wedding date & time — IST (UTC+5:30). Muhurat: 2 Dec 2026, 8:00 PM IST
  weddingDateTime: '2026-12-02T20:00:00+05:30',

  // Image paths — drop real photos into the folders; placeholders show until then
  images: {
    bride: 'assets/couple/bride.jpg',
    groom: 'assets/couple/groom.jpg',
    haldi: 'assets/events/haldi.jpg',
    mandap: 'assets/events/mandap.jpg',
    mamera: 'assets/events/mamera.jpg',
    engagement: 'assets/events/engagement.jpg',
  },
};
/* ───────────────────────────────────────────────────────── */

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;

/* ── Toast ───────────────────────────────────────────────── */
function toast(msg) {
  let t = $('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ── Loader ──────────────────────────────────────────────── */
(function loader() {
  const el = $('#loader');
  const bar = $('#loaderBar');
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + Math.random() * 22);
    bar.style.width = p + '%';
    if (p >= 100) {
      clearInterval(tick);
      setTimeout(() => el.classList.add('done'), 350);
    }
  }, 180);
})();

/* ── Intro sequence: envelope → palace doors ─────────────── */
(function intro() {
  const scene = $('#envelopeScene');
  const envelope = $('#envelope');
  const btn = $('#envOpenBtn');
  const doors = $('#palaceDoors');
  let opened = false;

  function openInvitation() {
    if (opened) return;
    opened = true;
    envelope.classList.add('open');
    btn.style.display = 'none';

    setTimeout(() => {
      scene.classList.add('gone');
      doors.classList.add('active');
      // force reflow then animate doors
      void doors.offsetWidth;
      doors.classList.add('open');

      setTimeout(() => {
        doors.classList.add('done');
        doors.classList.remove('active', 'open');
        startHeroReveal();
        initFX(); // particles & petals after intro
      }, 2100);
    }, 1400);
  }

  btn.addEventListener('click', openInvitation);
  envelope.addEventListener('click', openInvitation);

  // If user prefers reduced motion, skip straight through
  if (reduceMotion) {
    scene.style.display = 'none';
    doors.style.display = 'none';
    setTimeout(startHeroReveal, 100);
    setTimeout(initFX, 300);
  }
})();

/* ── Hero reveal after doors ─────────────────────────────── */
function startHeroReveal() {
  $$('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 250 + i * 220);
  });
}

/* ── Scroll reveal (IntersectionObserver) ────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

function observeReveals() {
  $$('.reveal').forEach((el) => {
    if (!el.closest('.hero')) revealObserver.observe(el);
  });
}

/* ── Parallax ────────────────────────────────────────────── */
(function parallax() {
  if (reduceMotion) return;
  const layers = $$('[data-parallax]');
  let ticking = false;
  function update() {
    const y = window.scrollY;
    layers.forEach((l) => {
      const speed = parseFloat(l.dataset.parallax) || 0.2;
      l.style.transform = `translateY(${y * speed}px)`;
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();

/* ── Golden particles (Canvas) ───────────────────────────── */
function initParticles() {
  if (reduceMotion) return;
  const canvas = $('#particles');
  const ctx = canvas.getContext('2d');
  let W, H, parts = [];
  const COUNT = Math.min(90, Math.floor(window.innerWidth / 14));

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function spawn() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vy: -(Math.random() * 0.35 + 0.08),
      vx: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.6 + 0.15,
      tw: Math.random() * Math.PI * 2,
    };
  }
  parts = Array.from({ length: COUNT }, spawn);

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    parts.forEach((p) => {
      p.y += p.vy; p.x += p.vx; p.tw += 0.03;
      if (p.y < -10) { Object.assign(p, spawn(), { y: H + 10 }); }
      const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(214,180,106,${alpha})`;
      ctx.shadowColor = 'rgba(214,180,106,.8)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(loop);
  })();
}

/* ── Falling rose petals ─────────────────────────────────── */
function initPetals() {
  if (reduceMotion) return;
  const layer = $('#petalsLayer');
  const PETALS = ['🌹', '🌸', '🌺', '🌷'];
  const COUNT = isTouch ? 10 : 18;

  function spawnPetal() {
    const s = document.createElement('span');
    s.className = 'petal';
    s.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
    s.style.left = Math.random() * 100 + 'vw';
    s.style.fontSize = (0.8 + Math.random() * 0.9) + 'rem';
    s.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    const dur = 9 + Math.random() * 9;
    s.style.animationDuration = dur + 's';
    s.style.animationDelay = (Math.random() * 6) + 's';
    layer.appendChild(s);
    setTimeout(() => s.remove(), (dur + 7) * 1000);
  }
  for (let i = 0; i < COUNT; i++) setTimeout(spawnPetal, i * 900);
  setInterval(spawnPetal, 2600);
}

/* ── Floating diyas ──────────────────────────────────────── */
function initDiyas() {
  if (reduceMotion) return;
  const layer = $('#diyasLayer');
  const COUNT = isTouch ? 5 : 9;

  function diyaSVG() {
    return `<svg width="34" height="46" viewBox="0 0 34 46">
      <ellipse cx="17" cy="34" rx="14" ry="6" fill="#8a5a2b"/>
      <path d="M6 30 Q17 24 28 30 L26 36 Q17 32 8 36 Z" fill="#a06a35"/>
      <ellipse cx="17" cy="29" rx="10" ry="3.5" fill="#5c3a1a"/>
      <g class="flame">
        <path d="M17 8 C22 15 22 21 17 25 C12 21 12 15 17 8Z" fill="#ffb347"/>
        <path d="M17 14 C19.5 18 19.5 21 17 23 C14.5 21 14.5 18 17 14Z" fill="#ffe08a"/>
      </g>
      <ellipse cx="17" cy="29" rx="16" ry="4" fill="rgba(255,179,71,.18)"/>
    </svg>`;
  }

  function spawnDiya() {
    const d = document.createElement('div');
    d.className = 'diya';
    d.innerHTML = diyaSVG();
    d.style.left = (5 + Math.random() * 90) + 'vw';
    d.style.setProperty('--sway', (Math.random() * 60 - 30) + 'px');
    const dur = 12 + Math.random() * 10;
    d.style.animationDuration = dur + 's';
    layer.appendChild(d);
    setTimeout(() => d.remove(), dur * 1000 + 500);
  }
  for (let i = 0; i < COUNT; i++) setTimeout(spawnDiya, i * 1400 + 800);
  setInterval(spawnDiya, 4200);
}

function initFX() {
  initParticles();
  initPetals();
  initDiyas();
}

/* ── Countdown (IST) ─────────────────────────────────────── */
(function countdown() {
  const target = new Date(CONFIG.weddingDateTime).getTime();
  const els = {
    d: $('#cdDays'), h: $('#cdHours'), m: $('#cdMins'), s: $('#cdSecs'),
  };
  const pad = n => String(n).padStart(2, '0');

  function tick() {
    // Use IST explicitly: compute difference in IST wall-clock
    const now = new Date();
    const istNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const istTarget = new Date(CONFIG.weddingDateTime);
    let diff = Math.max(0, istTarget.getTime() - istNow.getTime());

    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5);  diff -= h * 36e5;
    const m = Math.floor(diff / 6e4);   diff -= m * 6e4;
    const s = Math.floor(diff / 1e3);

    els.d.textContent = pad(d);
    els.h.textContent = pad(h);
    els.m.textContent = pad(m);
    els.s.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
})();

/* ── Navigation ──────────────────────────────────────────── */
(function nav() {
  const nav = $('#nav');
  const menuBtn = $('#menuBtn');
  const links = $('#navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  menuBtn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menuBtn.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    menuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }));
})();

/* ── Music ───────────────────────────────────────────────── */
(function music() {
  const btn = $('#musicBtn');
  const audio = $('#bgMusic');
  audio.src = CONFIG.musicSrc;
  const iconMusic = $('.icon-music', btn);
  const iconMute = $('.icon-mute', btn);
  let playing = false;

  btn.addEventListener('click', async () => {
    try {
      if (playing) {
        audio.pause();
        playing = false;
        iconMusic.style.display = 'none';
        iconMute.style.display = 'block';
        btn.setAttribute('aria-label', 'Play music');
      } else {
        await audio.play();
        playing = true;
        iconMusic.style.display = 'block';
        iconMute.style.display = 'none';
        btn.setAttribute('aria-label', 'Pause music');
      }
    } catch (e) {
      toast('Music file not found — add an mp3 to assets/music/');
    }
  });
})();

/* ── Photo placeholders ──────────────────────────────────── */
// If a real image exists at the path it will be used; otherwise the
// elegant CSS placeholder remains. To use a photo, place the file and
// the code below will swap it in automatically on load.
function tryLoadPhotos() {
  $$('[data-photo]').forEach((ph) => {
    const src = ph.dataset.photo;
    const img = new Image();
    img.onload = () => {
      ph.classList.remove('placeholder');
      ph.innerHTML = '';
      img.alt = ph.dataset.photo.split('/').pop().replace(/\.[^.]+$/, '');
      ph.appendChild(img);
    };
    img.onerror = () => { /* keep placeholder */ };
    img.src = src;
  });
}

/* ── Maps ────────────────────────────────────────────────── */
(function maps() {
  const btn = $('#mapsBtn');
  if (btn) btn.href = CONFIG.mapsUrl;

  const copyVenue = $('#copyVenue');
  if (copyVenue) copyVenue.addEventListener('click', () => {
    const text = 'Juni Manawar, District Dhar, Madhya Pradesh, India';
    navigator.clipboard?.writeText(text)
      .then(() => toast('Address copied to clipboard'))
      .catch(() => toast(text));
  });
})();

/* ── Copy invitation ─────────────────────────────────────── */
(function copyInvite() {
  const btn = $('#copyInvite');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const text = `ॐ श्री गणेशाय नमः

शुभ विवाह की शुभकामनाएँ!

अश्विनी (M.Sc.) एवं मयूर (B.E. Civil) के विवाह समारोह में आपको सादर आमंत्रित किया जाता है।

📅 Wednesday, 2 December 2026 · 8:00 PM (शुभ लग्न)
📍 Juni Manawar, District Dhar, Madhya Pradesh

आशीर्वाद समारोह: 2 Dec, 5:00 PM — माँ मंगलादेवी मंदिर, सिंघाना रोड, मनावर

श्री लोकेश जी, स्मृति अनिता भण्डारी, विजय, हरशिता, श्रावणी एवं समस्त भण्डारी परिवार

आपकी उपस्थिति से यह अवसर और भी शुभ होगा। ❤`;
    navigator.clipboard?.writeText(text)
      .then(() => toast('Invitation copied to clipboard'))
      .catch(() => toast('Copy failed — please copy manually'));
  });
})();

/* ── RSVP via WhatsApp ───────────────────────────────────── */
(function rsvp() {
  const form = $('#rsvpForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#rsvpName').value.trim();
    const phone = $('#rsvpPhone').value.trim();
    const attend = form.querySelector('input[name="attend"]:checked').value;
    const guests = $('#rsvpGuests').value;

    if (!/^\d{10}$/.test(phone)) {
      toast('Please enter a valid 10-digit phone number');
      return;
    }

    const msg = encodeURIComponent(
      `🙏 Wedding RSVP — Ashwini & Mayur\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Attending: ${attend}\n` +
      `Guests: ${guests}\n\n` +
      `Wedding: 2 December 2026, Juni Manawar, Dhar, MP`
    );
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, '_blank');
    toast('Opening WhatsApp…');
  });
})();

/* ── Share ───────────────────────────────────────────────── */
(function share() {
  const url = encodeURIComponent(location.href);
  const text = encodeURIComponent('Ashwini ❤ Mayur — Royal Wedding · 2 Dec 2026 · Juni Manawar, Dhar MP. You are invited!');

  $('#shareWhatsApp').addEventListener('click', () => {
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  });

  $('#shareCopy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      toast('Invitation link copied!');
    } catch {
      toast(location.href);
    }
  });

  $('#sharePrint').addEventListener('click', () => window.print());
})();

/* ── Custom cursor ───────────────────────────────────────── */
(function cursor() {
  if (isTouch || reduceMotion) return;
  const dot = $('#cursor');
  const ring = $('#cursorRing');
  let mx = -100, my = -100, rx = -100, ry = -100;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  }, { passive: true });

  (function follow() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(follow);
  })();

  $$('a, button, .ev-card, .tl-card, input, select').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

/* ── Boot ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  observeReveals();
  tryLoadPhotos();
});
