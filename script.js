/* =============================================
   PHYATHAI 2 LOY KRATHONG 2569 - script.js
   Complete Redesign v3
   ============================================= */

'use strict';

// ---- CONFIG ----
const SHEET_WEBHOOK = 'https://script.google.com/macros/s/AKfycbxovjMWLTCTzCxF4TLwVjfooHgT5sXFr6p0Ml4oSlmaGTkdUe1r6LeYVId07GmQBD9F/exec';
const YEAR = '๒๕๖๙';

// ---- 9 KRATHONG TYPES ----
const KRATHONG_TYPES = [
  {
    id: 'lotus-heaven',
    name: 'บัวสวรรค์สุขภาพดี',
    emoji: '🪷',
    colors: { base: '#c8973a', petal1: '#ff8bb0', petal2: '#e8749a', petal3: '#c43a6a', center: '#fde88c' },
    art: buildKrathong({ baseColor: '#c8973a', p1: '#ffb3cc', p2: '#ff8bb0', p3: '#e8749a', center: '#fff9c4', candle: '#fff8e7', flame: '#ff9900', leaf: '#2d7a3a' })
  },
  {
    id: 'gold-banana',
    name: 'ใบตองทองนำโชค',
    emoji: '🌿',
    colors: { base: '#8B6914', petal1: '#f9e45a', petal2: '#e6c820', petal3: '#c8a010' },
    art: buildKrathong({ baseColor: '#8B6914', p1: '#fff27a', p2: '#f9e45a', p3: '#e6c820', center: '#ffa020', candle: '#fffde7', flame: '#ff6600', leaf: '#1a5c26' })
  },
  {
    id: 'golden-lamp',
    name: 'ประทีปทองส่องทาง',
    emoji: '🕯️',
    colors: { base: '#6a3d00', petal1: '#ffd77a', petal2: '#ffb830', petal3: '#e09000' },
    art: buildKrathong({ baseColor: '#6a3d00', p1: '#ffe9a0', p2: '#ffd77a', p3: '#ffb830', center: '#ff8c00', candle: '#fffacd', flame: '#ff4400', leaf: '#2a6830' })
  },
  {
    id: 'jasmine-grace',
    name: 'ผกาแก้วการุณย์',
    emoji: '🌸',
    colors: { base: '#8b2252', petal1: '#ffd6e7', petal2: '#ffaac8', petal3: '#ff7aab' },
    art: buildKrathong({ baseColor: '#8b2252', p1: '#ffe5f0', p2: '#ffc0d8', p3: '#ff88b8', center: '#c0f0e8', candle: '#fff9f9', flame: '#ff7700', leaf: '#2a7030' })
  },
  {
    id: 'pink-lotus-9',
    name: 'บัวชมพูมงคลเก้า',
    emoji: '🌺',
    colors: { base: '#6b1a4a', petal1: '#ff99cc', petal2: '#ff66aa', petal3: '#dd3388' },
    art: buildKrathong({ baseColor: '#6b1a4a', p1: '#ffccee', p2: '#ff99cc', p3: '#ff66aa', center: '#ffdd44', candle: '#fffef0', flame: '#ff8800', leaf: '#1e6628' })
  },
  {
    id: 'fancy-banana',
    name: 'ใบตองลายวิจิตร',
    emoji: '🍃',
    colors: { base: '#1a5c2a', petal1: '#90ee90', petal2: '#3cb371', petal3: '#228B22' },
    art: buildKrathong({ baseColor: '#1a5c2a', p1: '#b8f0b0', p2: '#78d878', p3: '#44aa44', center: '#ffd700', candle: '#fffff0', flame: '#ff9900', leaf: '#0f4018' })
  },
  {
    id: 'coconut-natural',
    name: 'กะลามะพร้าวธรรมชาติ',
    emoji: '🥥',
    colors: { base: '#5c3a1e', petal1: '#d4a054', petal2: '#c8832a', petal3: '#a85c14' },
    art: buildKrathong({ baseColor: '#5c3a1e', p1: '#e8c07a', p2: '#d4a054', p3: '#c8832a', center: '#ffe4b5', candle: '#fff8dc', flame: '#dd4400', leaf: '#2d6020' })
  },
  {
    id: 'fresh-flowers',
    name: 'ดอกไม้สดผาสุก',
    emoji: '💐',
    colors: { base: '#7a2080', petal1: '#ff99ff', petal2: '#dd44dd', petal3: '#aa00aa' },
    art: buildKrathong({ baseColor: '#7a2080', p1: '#ffccff', p2: '#ff88ff', p3: '#cc44cc', center: '#fffacd', candle: '#fff9f0', flame: '#ff6600', leaf: '#24682a' })
  },
  {
    id: 'jewel-lotus',
    name: 'บัวแก้วรัตนตรัย',
    emoji: '💎',
    colors: { base: '#1a3a7a', petal1: '#b0c8ff', petal2: '#6688ee', petal3: '#3355cc' },
    art: buildKrathong({ baseColor: '#1a3a7a', p1: '#ccddff', p2: '#99bbff', p3: '#5577ee', center: '#fff9c4', candle: '#f0f8ff', flame: '#ffaa00', leaf: '#204060' })
  }
];

// ---- BUILD KRATHONG SVG ----
function buildKrathong({ baseColor, p1, p2, p3, center, candle, flame, leaf }) {
  const id = Math.random().toString(36).slice(2, 8);
  return `
<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <radialGradient id="flameGlow${id}" cx="50%" cy="80%">
      <stop offset="0%" stop-color="${flame}" stop-opacity="1"/>
      <stop offset="60%" stop-color="#ffcc44" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="${flame}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="baseGrad${id}" cx="50%" cy="30%">
      <stop offset="0%" stop-color="${baseColor}dd"/>
      <stop offset="100%" stop-color="${baseColor}88"/>
    </radialGradient>
    <filter id="glow${id}">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="leafGrad${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${leaf}"/>
      <stop offset="100%" stop-color="${leaf}88"/>
    </linearGradient>
  </defs>

  <!-- Base banana leaf boat -->
  <ellipse cx="100" cy="175" rx="72" ry="22" fill="url(#leafGrad${id})"/>
  <ellipse cx="100" cy="170" rx="68" ry="18" fill="${leaf}" opacity="0.9"/>
  <path d="M 32 170 Q 100 155 168 170 Q 160 190 100 193 Q 40 190 32 170 Z" fill="${leaf}cc"/>
  <!-- Leaf texture lines -->
  <line x1="100" y1="155" x2="100" y2="193" stroke="${leaf}44" stroke-width="1"/>
  <line x1="68" y1="162" x2="80" y2="193" stroke="${leaf}44" stroke-width="0.8"/>
  <line x1="132" y1="162" x2="120" y2="193" stroke="${leaf}44" stroke-width="0.8"/>

  <!-- Main krathong body (cone shape) -->
  <ellipse cx="100" cy="155" rx="60" ry="16" fill="url(#baseGrad${id})"/>
  <path d="M 48 155 Q 60 130 100 128 Q 140 130 152 155 Z" fill="${baseColor}" opacity="0.95"/>

  <!-- Outer petals (layer 3 - back) -->
  <ellipse cx="62" cy="140" rx="20" ry="30" fill="${p3}" opacity="0.9" transform="rotate(-30 62 155)"/>
  <ellipse cx="138" cy="140" rx="20" ry="30" fill="${p3}" opacity="0.9" transform="rotate(30 138 155)"/>
  <ellipse cx="100" cy="118" rx="20" ry="32" fill="${p3}" opacity="0.9"/>
  <ellipse cx="75" cy="122" rx="18" ry="28" fill="${p3}" opacity="0.85" transform="rotate(-18 75 148)"/>
  <ellipse cx="125" cy="122" rx="18" ry="28" fill="${p3}" opacity="0.85" transform="rotate(18 125 148)"/>

  <!-- Middle petals (layer 2) -->
  <ellipse cx="68" cy="143" rx="16" ry="26" fill="${p2}" opacity="0.95" transform="rotate(-25 68 155)"/>
  <ellipse cx="132" cy="143" rx="16" ry="26" fill="${p2}" opacity="0.95" transform="rotate(25 132 155)"/>
  <ellipse cx="100" cy="124" rx="16" ry="28" fill="${p2}" opacity="0.95"/>
  <ellipse cx="80" cy="128" rx="14" ry="24" fill="${p2}" opacity="0.9" transform="rotate(-14 80 150)"/>
  <ellipse cx="120" cy="128" rx="14" ry="24" fill="${p2}" opacity="0.9" transform="rotate(14 120 150)"/>

  <!-- Inner petals (layer 1 - front) -->
  <ellipse cx="75" cy="145" rx="12" ry="22" fill="${p1}" transform="rotate(-20 75 155)"/>
  <ellipse cx="125" cy="145" rx="12" ry="22" fill="${p1}" transform="rotate(20 125 155)"/>
  <ellipse cx="100" cy="130" rx="12" ry="24" fill="${p1}"/>
  <ellipse cx="88" cy="134" rx="10" ry="20" fill="${p1}" transform="rotate(-10 88 152)"/>
  <ellipse cx="112" cy="134" rx="10" ry="20" fill="${p1}" transform="rotate(10 112 152)"/>

  <!-- Center golden disc -->
  <circle cx="100" cy="140" r="18" fill="${center}" filter="url(#glow${id})"/>
  <circle cx="100" cy="140" r="12" fill="${center}" opacity="0.9"/>
  <circle cx="100" cy="140" r="6" fill="white" opacity="0.6"/>

  <!-- Marigold flowers -->
  <circle cx="78" cy="138" r="7" fill="#ff9900" opacity="0.9"/>
  <circle cx="78" cy="138" r="4" fill="#ffcc00"/>
  <circle cx="122" cy="138" r="7" fill="#ff6688" opacity="0.9"/>
  <circle cx="122" cy="138" r="4" fill="#ffaacc"/>
  <circle cx="100" cy="128" r="6" fill="#ff9900" opacity="0.85"/>
  <circle cx="100" cy="128" r="3.5" fill="#ffdd44"/>

  <!-- Incense sticks (3) -->
  <line x1="90" y1="85" x2="88" y2="140" stroke="#c8a080" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="100" y1="78" x2="100" y2="135" stroke="#c8a080" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="110" y1="85" x2="112" y2="140" stroke="#c8a080" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Incense glow tips -->
  <circle cx="88" cy="85" r="3" fill="#ff4400" opacity="0.9" filter="url(#glow${id})"/>
  <circle cx="100" cy="78" r="3" fill="#ff4400" opacity="0.9" filter="url(#glow${id})"/>
  <circle cx="112" cy="85" r="3" fill="#ff4400" opacity="0.9" filter="url(#glow${id})"/>
  <!-- Incense smoke wisps -->
  <path d="M 88 83 Q 85 76 88 70 Q 91 64 88 58" stroke="rgba(200,180,160,0.5)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M 100 76 Q 97 69 100 63 Q 103 57 100 51" stroke="rgba(200,180,160,0.5)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M 112 83 Q 115 76 112 70 Q 109 64 112 58" stroke="rgba(200,180,160,0.5)" stroke-width="1.5" fill="none" stroke-linecap="round"/>

  <!-- Candle -->
  <rect x="95" y="95" width="10" height="38" rx="2" fill="${candle}"/>
  <rect x="95" y="95" width="10" height="8" rx="1" fill="#f0e0c0" opacity="0.5"/>
  <!-- Candle wick -->
  <line x1="100" y1="92" x2="100" y2="97" stroke="#444" stroke-width="1.5"/>
  <!-- Candle flame -->
  <ellipse cx="100" cy="88" rx="8" ry="12" fill="url(#flameGlow${id})" opacity="0.8"/>
  <ellipse cx="100" cy="90" rx="5" ry="8" fill="${flame}" opacity="0.95"/>
  <ellipse cx="100" cy="91" rx="3" ry="5" fill="#ffee88"/>
  <ellipse cx="100" cy="92" rx="1.5" ry="2.5" fill="white" opacity="0.8"/>
  <!-- Flame animation overlays -->
  <ellipse cx="100" cy="88" rx="10" ry="14" fill="${flame}" opacity="0.2">
    <animate attributeName="rx" values="10;8;11;9;10" dur="0.5s" repeatCount="indefinite"/>
    <animate attributeName="ry" values="14;16;13;15;14" dur="0.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.2;0.35;0.15;0.3;0.2" dur="0.5s" repeatCount="indefinite"/>
  </ellipse>

  <!-- Water surface at base -->
  <ellipse cx="100" cy="190" rx="68" ry="8" fill="rgba(10,42,74,0.4)"/>
  <!-- Light reflection on water -->
  <ellipse cx="100" cy="192" rx="20" ry="3" fill="rgba(255,220,80,0.2)" filter="url(#glow${id})"/>
</svg>`;
}

// ---- STATE ----
let selectedTypeIndex = 0;
let audioCtx = null;
let audioPlaying = false;
let oscillators = [];
let communityList = [];
let wishCount = 0;

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  createStars();
  createLanterns();
  renderTypeSelector();
  selectType(0);
  initCharCounter();
  loadCommunityWishes();
  setTimeout(() => initAudio(), 1500);
});

// ---- STARS ----
function createStars() {
  const container = document.getElementById('starsContainer');
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 65}%;
      width: ${size}px;
      height: ${size}px;
      --d: ${(Math.random() * 3 + 2).toFixed(1)}s;
      --delay: ${(Math.random() * 4).toFixed(1)}s;
      --op: ${(Math.random() * 0.5 + 0.4).toFixed(2)};
    `;
    container.appendChild(star);
  }
}

// ---- LANTERNS ----
function createLanterns() {
  const container = document.getElementById('lanternsContainer');
  const emojis = ['🏮', '🪔', '✨', '⭐', '🌟'];
  for (let i = 0; i < 8; i++) {
    const el = document.createElement('div');
    el.className = 'lantern';
    el.textContent = emojis[i % emojis.length];
    const dur = (Math.random() * 15 + 20).toFixed(1);
    const left = Math.random() * 90 + 5;
    el.style.cssText = `
      left: ${left}%;
      --dur: ${dur}s;
      animation-name: lanternFloat;
      animation-duration: ${dur}s;
      animation-delay: ${(Math.random() * 15).toFixed(1)}s;
    `;
    container.appendChild(el);
  }
}

// ---- TYPE SELECTOR ----
function renderTypeSelector() {
  const container = document.getElementById('typeSelector');
  KRATHONG_TYPES.forEach((t, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'type-thumb' + (i === 0 ? ' active' : '');
    thumb.innerHTML = `
      <span class="type-thumb-art">${t.emoji}</span>
      <span class="type-thumb-label">${t.name.split('').join('\u200b').substring(0, 16)}</span>
    `;
    thumb.addEventListener('click', () => selectType(i));
    container.appendChild(thumb);
  });
}

function selectType(index) {
  selectedTypeIndex = index;
  const type = KRATHONG_TYPES[index];

  // Update art
  const artEl = document.getElementById('krathongArt');
  artEl.innerHTML = type.art;

  // Update reflection (copy SVG, dimmed)
  const reflectionEl = document.getElementById('krathongReflection');
  reflectionEl.innerHTML = type.art;

  // Update label
  document.getElementById('krathongTypeName').textContent = type.name;

  // Update active thumb
  document.querySelectorAll('.type-thumb').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });

  // Scroll thumb into view
  const thumbs = document.querySelectorAll('.type-thumb');
  if (thumbs[index]) thumbs[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// ---- CHAR COUNTER ----
function initCharCounter() {
  const textarea = document.getElementById('inputWish');
  const counter = document.getElementById('charCount');
  textarea.addEventListener('input', () => {
    counter.textContent = textarea.value.length;
  });
}

// ---- FLOAT KRATHONG ----
async function floatKrathong() {
  const name = document.getElementById('inputName').value.trim();
  const wish = document.getElementById('inputWish').value.trim();
  const location = document.getElementById('inputLocation').value;

  if (!name) {
    document.getElementById('inputName').focus();
    shakeElement(document.getElementById('inputName'));
    return;
  }
  if (!wish) {
    document.getElementById('inputWish').focus();
    shakeElement(document.getElementById('inputWish'));
    return;
  }

  // Disable button
  const btn = document.getElementById('btnFloat');
  btn.disabled = true;
  btn.style.opacity = '0.7';

  const type = KRATHONG_TYPES[selectedTypeIndex];

  // Show float overlay
  showFloatAnimation(type, name, wish);

  // Save to Google Sheet (non-blocking)
  saveToSheet(name, wish, location);

  // Add to community
  addCommunityKrathong(type, name);
  wishCount++;
  document.getElementById('statCount').textContent = wishCount;

  btn.disabled = false;
  btn.style.opacity = '1';
}

function showFloatAnimation(type, name, wish) {
  const overlay = document.getElementById('floatOverlay');
  const floatArt = document.getElementById('floatArt');
  const msgName = document.getElementById('floatMsgName');
  const msgWish = document.getElementById('floatMsgWish');

  floatArt.textContent = type.emoji;
  msgName.textContent = name;
  msgWish.textContent = `"${wish}"`;

  overlay.classList.add('show');
  spawnParticles();
}

function spawnParticles() {
  const container = document.getElementById('particlesContainer');
  container.innerHTML = '';
  const items = ['🌸', '✨', '⭐', '🌟', '🏮', '🪷', '💫', '🌺', '🎇'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const tx = (Math.random() - 0.5) * 400;
    const ty = -(Math.random() * 300 + 100);
    const delay = Math.random() * 1.5;
    const dur = Math.random() * 1.5 + 1.5;
    p.textContent = items[i % items.length];
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 60 + 20}%;
      --tx: ${tx}px;
      --ty: ${ty}px;
      --dur: ${dur}s;
      --delay: ${delay}s;
      --rot: ${(Math.random() - 0.5) * 720}deg;
    `;
    container.appendChild(p);
  }
}

function resetForm() {
  document.getElementById('floatOverlay').classList.remove('show');
  document.getElementById('inputName').value = '';
  document.getElementById('inputWish').value = '';
  document.getElementById('charCount').textContent = '0';
  document.getElementById('inputLocation').selectedIndex = 0;
  selectType(Math.floor(Math.random() * KRATHONG_TYPES.length));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- SAVE CARD (html2canvas) ----
async function saveCard() {
  const name = document.getElementById('floatMsgName').textContent;
  const wish = document.getElementById('floatMsgWish').textContent;
  const type = KRATHONG_TYPES[selectedTypeIndex];

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#050d1e');
  grad.addColorStop(0.5, '#0a1628');
  grad.addColorStop(1, '#050d1e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 600);

  // Stars
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.6 + 0.2})`;
    ctx.beginPath();
    ctx.arc(Math.random() * 800, Math.random() * 300, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Moon
  const moonGrad = ctx.createRadialGradient(680, 70, 0, 680, 70, 55);
  moonGrad.addColorStop(0, '#fffde7');
  moonGrad.addColorStop(0.6, '#f0d070');
  moonGrad.addColorStop(1, '#c8a030');
  ctx.fillStyle = moonGrad;
  ctx.beginPath();
  ctx.arc(680, 70, 45, 0, Math.PI * 2);
  ctx.fill();

  // Moon glow
  const mgGrad = ctx.createRadialGradient(680, 70, 40, 680, 70, 100);
  mgGrad.addColorStop(0, 'rgba(255,220,80,0.3)');
  mgGrad.addColorStop(1, 'rgba(255,220,80,0)');
  ctx.fillStyle = mgGrad;
  ctx.beginPath();
  ctx.arc(680, 70, 100, 0, Math.PI * 2);
  ctx.fill();

  // Krathong emoji
  ctx.font = '120px serif';
  ctx.textAlign = 'center';
  ctx.fillText(type.emoji, 400, 280);

  // Gold glow under krathong
  const kGrad = ctx.createRadialGradient(400, 290, 0, 400, 290, 80);
  kGrad.addColorStop(0, 'rgba(200,151,58,0.3)');
  kGrad.addColorStop(1, 'rgba(200,151,58,0)');
  ctx.fillStyle = kGrad;
  ctx.beginPath();
  ctx.arc(400, 290, 80, 0, Math.PI * 2);
  ctx.fill();

  // Name
  ctx.fillStyle = '#fde88c';
  ctx.font = 'bold 32px Sarabun, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(name, 400, 360);

  // Wish
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = '22px Sarabun, sans-serif';
  const lines = wrapText(wish, 580, ctx);
  lines.forEach((line, i) => {
    ctx.fillText(line, 400, 400 + i * 32);
  });

  // Eco badge
  ctx.fillStyle = 'rgba(26,122,110,0.4)';
  roundRect(ctx, 220, 500, 360, 36, 18);
  ctx.fillStyle = '#2aaa96';
  ctx.font = '16px Sarabun, sans-serif';
  ctx.fillText('🌿 กระทงอิเล็กทรอนิกส์ ลดขยะ ๑๐๐%', 400, 523);

  // Hospital name
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '14px Sarabun, sans-serif';
  ctx.fillText('โรงพยาบาลพญาไท ๒ สนามเป้า • วันลอยกระทง ' + YEAR, 400, 570);

  // Krathong type
  ctx.fillStyle = 'rgba(200,151,58,0.6)';
  ctx.font = '15px Sarabun, sans-serif';
  ctx.fillText(type.name, 400, 334);

  // Try to load logo
  try {
    const img = await loadImage('phyathai2-logo.png');
    // White bg for logo
    ctx.fillStyle = 'white';
    roundRect(ctx, 20, 16, 160, 55, 10);
    ctx.drawImage(img, 24, 20, 152, 47);
  } catch (e) {
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = 'bold 15px Sarabun, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('พญาไท ๒', 24, 50);
    ctx.textAlign = 'center';
  }

  // Download
  const link = document.createElement('a');
  link.download = `loykrathong-${name}-${YEAR}.png`;
  link.href = canvas.toDataURL('image/png', 0.95);
  link.click();
}

function wrapText(text, maxWidth, ctx) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const test = current ? current + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
  ctx.fill();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// ---- GOOGLE SHEET ----
async function saveToSheet(name, wish, location) {
  const data = {
    name,
    desc: wish,
    location,
    year: YEAR,
    timestamp: new Date().toLocaleString('th-TH')
  };
  try {
    await fetch(SHEET_WEBHOOK, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (e) {
    console.warn('Sheet save error (non-critical):', e);
  }
}

// ---- COMMUNITY KRATHONGS ----
function addCommunityKrathong(type, name) {
  communityList.unshift({ type, name, id: Date.now() });
  if (communityList.length > 15) communityList.pop();
  renderCommunityKrathongs();
}

function renderCommunityKrathongs() {
  const container = document.getElementById('communityKrathongs');
  container.innerHTML = '';
  communityList.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'community-k';
    const left = 10 + ((i * 60) % 85);
    const dur = 25 + Math.random() * 20;
    el.style.cssText = `left:${left}%; animation-duration:${dur.toFixed(1)}s; animation-delay:-${(Math.random() * dur).toFixed(1)}s;`;
    el.innerHTML = `<div class="community-k-art">${item.type.emoji}</div><div class="community-k-name">${item.name}</div>`;
    container.appendChild(el);
  });
}

async function loadCommunityWishes() {
  // Seed with sample community data
  const sampleNames = ['สมหญิง ใจดี', 'กนกพร รักสุข', 'วิชัย มั่งมี', 'ประภาพร สุขสม', 'นพดล เจริญ'];
  sampleNames.forEach((name, i) => {
    communityList.push({
      type: KRATHONG_TYPES[i % KRATHONG_TYPES.length],
      name,
      id: Date.now() - i * 1000
    });
  });
  wishCount = sampleNames.length;
  document.getElementById('statCount').textContent = wishCount;
  renderCommunityKrathongs();
}

// ---- WISHES WALL ----
function openWishesWall() {
  const modal = document.getElementById('wishesModal');
  const body = document.getElementById('wishesModalBody');
  modal.classList.add('show');

  if (communityList.length === 0) {
    body.innerHTML = '<div class="loading-wishes">ยังไม่มีกระทง ลองลอยกระทงคนแรก!</div>';
    return;
  }

  body.innerHTML = '';
  communityList.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'wish-item';
    div.innerHTML = `
      <div class="wish-item-art">${item.type.emoji}</div>
      <div class="wish-item-info">
        <div class="wish-item-name">${item.name}</div>
        <div class="wish-item-text">${item.type.name}</div>
        <div class="wish-item-meta">🌿 ลดขยะ ๑๐๐% • ${YEAR}</div>
      </div>
    `;
    body.appendChild(div);
  });
}

function closeWishesWall(e) {
  if (!e || e.target === document.getElementById('wishesModal')) {
    document.getElementById('wishesModal').classList.remove('show');
  }
}

// ---- SHAKE ANIMATION ----
function shakeElement(el) {
  el.style.animation = 'none';
  el.style.borderColor = '#ff4466';
  el.style.boxShadow = '0 0 0 3px rgba(255,68,102,0.3)';
  el.animate([
    { transform: 'translateX(-5px)' },
    { transform: 'translateX(5px)' },
    { transform: 'translateX(-4px)' },
    { transform: 'translateX(4px)' },
    { transform: 'translateX(0)' }
  ], { duration: 300, easing: 'ease-in-out' }).finished.then(() => {
    el.style.borderColor = '';
    el.style.boxShadow = '';
  });
}

// ---- WEB AUDIO - LOY KRATHONG MELODY ----
function initAudio() {
  const btn = document.getElementById('audioBtn');
  btn.style.cursor = 'pointer';
}

function toggleAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    startMelody();
    audioPlaying = true;
    document.getElementById('audioIcon').textContent = '🔊';
  } else if (audioPlaying) {
    stopMelody();
    audioPlaying = false;
    document.getElementById('audioIcon').textContent = '🔇';
  } else {
    startMelody();
    audioPlaying = true;
    document.getElementById('audioIcon').textContent = '🔊';
  }
}

function startMelody() {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  // Loy Krathong melody (Do Re Mi notation → frequencies)
  // ลอยกระทง ลอยกระทง ลอย...
  const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88;
  const C5 = 523.25, D5 = 587.33, E5 = 659.25, G5 = 783.99, A5 = 880.00;
  
  // "ลอยกระทง" melody
  const notes = [
    [G4, 0.4], [A4, 0.4], [G4, 0.4], [E4, 0.4],
    [G4, 0.4], [A4, 0.4], [G4, 0.6], [0, 0.2],
    [G4, 0.4], [A4, 0.4], [G4, 0.4], [E4, 0.4],
    [D4, 0.4], [E4, 0.4], [D4, 0.8], [0, 0.4],
    [E4, 0.4], [G4, 0.4], [A4, 0.4], [G4, 0.4],
    [E4, 0.4], [D4, 0.4], [C4, 0.8], [0, 0.4],
    [D4, 0.4], [E4, 0.4], [G4, 0.4], [A4, 0.4],
    [G4, 0.4], [E4, 0.4], [D4, 0.8], [0, 0.6],
    // Chorus
    [C5, 0.4], [B4, 0.4], [A4, 0.4], [G4, 0.4],
    [A4, 0.4], [G4, 0.4], [E4, 0.6], [0, 0.2],
    [G4, 0.4], [A4, 0.4], [G4, 0.4], [E4, 0.4],
    [D4, 0.6], [0, 0.4], [0, 0.4]
  ];

  let time = audioCtx.currentTime + 0.1;
  oscillators = [];

  const playLoop = () => {
    if (!audioPlaying) return;
    notes.forEach(([freq, dur]) => {
      if (freq > 0) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
        gain.gain.linearRampToValueAtTime(0.06, time + dur * 0.7);
        gain.gain.linearRampToValueAtTime(0, time + dur - 0.02);
        osc.start(time);
        osc.stop(time + dur);
        oscillators.push(osc);
      }
      time += dur;
    });

    // Harmony (5th above)
    time = audioCtx.currentTime + 0.1;
    notes.forEach(([freq, dur]) => {
      if (freq > 0) {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.value = freq * 1.5;
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        gain2.gain.setValueAtTime(0, time);
        gain2.gain.linearRampToValueAtTime(0.03, time + 0.03);
        gain2.gain.linearRampToValueAtTime(0, time + dur - 0.03);
        osc2.start(time);
        osc2.stop(time + dur);
        oscillators.push(osc2);
      }
      time += dur;
    });

    const totalDur = notes.reduce((s, [, d]) => s + d, 0);
    if (audioPlaying) {
      setTimeout(playLoop, (totalDur - 0.5) * 1000);
    }
  };

  playLoop();
}

function stopMelody() {
  oscillators.forEach(o => { try { o.stop(); } catch (e) {} });
  oscillators = [];
}
