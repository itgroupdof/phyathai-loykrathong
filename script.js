// script.js - Loy Krathong Online 2569 Phyathai 2 Hospital (Full Luxury Redesign)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxovjMWLTCTzCxF4TLwVjfooHgT5sXFr6p0Ml4oSlmaGTkdUe1r6LeYVId07GmQBD9F/exec";

// 5 Popular Locations in Thailand with Visual Themes
const LOCATIONS = {
  chaophraya: {
    name: "แม่น้ำเจ้าพระยา (วัดอรุณฯ - กรุงเทพมหานคร)",
    short: "แม่น้ำเจ้าพระยา (กทม.)",
    skyColor: "linear-gradient(to bottom, #020713 0%, #08162d 48%, #092543 52%, #020f1e 100%)",
    silhouette: "radial-gradient(circle at 68% 45%, rgba(255, 200, 50, 0.22) 0%, transparent 45%)"
  },
  sukhothai: {
    name: "สุโขทัย (อุทยานประวัติศาสตร์ เผาเทียนเล่นไฟ)",
    short: "สุโขทัย (เผาเทียนเล่นไฟ)",
    skyColor: "linear-gradient(to bottom, #070312 0%, #1a0a2a 48%, #1f0e38 52%, #090212 100%)",
    silhouette: "radial-gradient(circle at 45% 45%, rgba(243, 156, 18, 0.25) 0%, transparent 50%)"
  },
  chiangmai: {
    name: "เชียงใหม่ (ริมแม่น้ำปิง ประเพณียี่เป็ง)",
    short: "เชียงใหม่ (ยี่เป็ง)",
    skyColor: "linear-gradient(to bottom, #030a16 0%, #0c1e38 48%, #0f274a 52%, #020c1a 100%)",
    silhouette: "radial-gradient(circle at 55% 40%, rgba(230, 126, 34, 0.28) 0%, transparent 55%)"
  },
  ayutthaya: {
    name: "พระนครศรีอยุธยา (คุ้งน้ำอยุธยา มรดกโลก)",
    short: "อยุธยา (คุ้งน้ำมรดกโลก)",
    skyColor: "linear-gradient(to bottom, #090714 0%, #1c152d 48%, #201738 52%, #0a0714 100%)",
    silhouette: "radial-gradient(circle at 50% 48%, rgba(255, 215, 0, 0.24) 0%, transparent 50%)"
  },
  phuket: {
    name: "ภูเก็ต (แหลมพรหมเทพ ทะเลอันดามัน)",
    short: "ภูเก็ต (แหลมพรหมเทพ)",
    skyColor: "linear-gradient(to bottom, #010a14 0%, #06192e 48%, #082845 52%, #010e1c 100%)",
    silhouette: "radial-gradient(circle at 35% 50%, rgba(0, 168, 204, 0.28) 0%, transparent 55%)"
  }
};

// 9 Auspicious Krathong SVG Vectors (Realistic & Beautiful)
const KRATHONG_SVGS = {
  // 1. บัวสวรรค์สุขภาพดี
  k1_lotus_pink: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <ellipse cx="60" cy="78" rx="48" ry="16" fill="#1b4d2e"/>
    <path d="M15 75 Q60 92 105 75 Q60 62 15 75" fill="#2d6a3f"/>
    <path d="M22 68 C15 50 40 40 50 65" fill="#f78fb3"/>
    <path d="M98 68 C105 50 80 40 70 65" fill="#f78fb3"/>
    <path d="M35 68 C30 42 55 35 60 62" fill="#ff9ff3"/>
    <path d="M85 68 C90 42 65 35 60 62" fill="#ff9ff3"/>
    <path d="M45 66 C45 32 75 32 75 66" fill="#f368e0"/>
    <rect x="57" y="32" width="6" height="28" fill="#fbc531" rx="2"/>
    <ellipse cx="60" cy="24" rx="4" ry="9" fill="#ff9f1a" class="svg-flame"/>
    <circle cx="60" cy="24" r="9" fill="rgba(255,200,50,0.4)" class="svg-glow"/>
    <line x1="53" y1="62" x2="49" y2="28" stroke="#8c2a1e" stroke-width="1.8"/>
    <line x1="60" y1="62" x2="60" y2="22" stroke="#8c2a1e" stroke-width="1.8"/>
    <line x1="67" y1="62" x2="71" y2="28" stroke="#8c2a1e" stroke-width="1.8"/>
  </svg>`,

  // 2. ใบตองทองนำโชค
  k2_banana_gold: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <ellipse cx="60" cy="80" rx="50" ry="16" fill="#1e4620"/>
    <path d="M12 76 L30 50 L45 76 Z" fill="#388e3c"/>
    <path d="M32 76 L50 46 L65 76 Z" fill="#4caf50"/>
    <path d="M55 76 L70 46 L88 76 Z" fill="#388e3c"/>
    <path d="M75 76 L90 50 L108 76 Z" fill="#2e7d32"/>
    <circle cx="45" cy="68" r="8" fill="#fbc531"/>
    <circle cx="60" cy="70" r="9" fill="#ffa801"/>
    <circle cx="75" cy="68" r="8" fill="#fbc531"/>
    <rect x="58" y="34" width="5" height="26" fill="#f5f6fa" rx="1.5"/>
    <ellipse cx="60.5" cy="27" rx="3.5" ry="8" fill="#ff9f1a" class="svg-flame"/>
    <line x1="54" y1="64" x2="51" y2="26" stroke="#900C3F" stroke-width="1.8"/>
    <line x1="67" y1="64" x2="70" y2="26" stroke="#900C3F" stroke-width="1.8"/>
  </svg>`,

  // 3. ประทีปทองส่องทาง
  k3_golden_lantern: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <ellipse cx="60" cy="82" rx="46" ry="14" fill="#2d3436"/>
    <ellipse cx="60" cy="76" rx="44" ry="12" fill="#d4af37"/>
    <path d="M20 74 Q60 52 100 74 Q60 90 20 74" fill="#f1c40f"/>
    <rect x="54" y="24" width="12" height="42" fill="#ffefa0" rx="3"/>
    <ellipse cx="60" cy="14" rx="5" ry="12" fill="#e67e22" class="svg-flame"/>
    <circle cx="60" cy="14" r="14" fill="rgba(243, 156, 18, 0.45)" class="svg-glow"/>
  </svg>`,

  // 4. ผกาแก้วการุณย์
  k4_mali_glass: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <ellipse cx="60" cy="80" rx="48" ry="15" fill="#1b4d2e"/>
    <circle cx="28" cy="72" r="9" fill="#ffffff"/>
    <circle cx="44" cy="68" r="10" fill="#a29bfe"/>
    <circle cx="60" cy="66" r="11" fill="#ffffff"/>
    <circle cx="76" cy="68" r="10" fill="#a29bfe"/>
    <circle cx="92" cy="72" r="9" fill="#ffffff"/>
    <rect x="57" y="32" width="6" height="28" fill="#6c5ce7" rx="2"/>
    <ellipse cx="60" cy="24" rx="4" ry="9" fill="#ff9f1a" class="svg-flame"/>
    <line x1="53" y1="62" x2="49" y2="28" stroke="#8c2a1e" stroke-width="1.8"/>
    <line x1="67" y1="62" x2="71" y2="28" stroke="#8c2a1e" stroke-width="1.8"/>
  </svg>`,

  // 5. บัวชมพูมงคลเก้า
  k5_royal_pink: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <ellipse cx="60" cy="80" rx="50" ry="16" fill="#1b4d2e"/>
    <path d="M20 72 C10 45 45 35 55 64" fill="#ff7675"/>
    <path d="M100 72 C110 45 75 35 65 64" fill="#ff7675"/>
    <path d="M35 70 C30 38 60 30 65 60" fill="#fd79a8"/>
    <path d="M85 70 C90 38 60 30 55 60" fill="#fd79a8"/>
    <circle cx="60" cy="64" r="8" fill="#ffeaa7"/>
    <rect x="58" y="30" width="5" height="30" fill="#fdcb6e" rx="2"/>
    <ellipse cx="60.5" cy="22" rx="4" ry="10" fill="#e17055" class="svg-flame"/>
    <circle cx="60.5" cy="22" r="10" fill="rgba(225, 112, 85, 0.4)" class="svg-glow"/>
  </svg>`,

  // 6. ใบตองลายวิจิตร
  k6_banana_craft: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <ellipse cx="60" cy="82" rx="52" ry="16" fill="#1e4620"/>
    <polygon points="15,78 30,42 45,78" fill="#2e7d32"/>
    <polygon points="35,78 50,38 65,78" fill="#43a047"/>
    <polygon points="55,78 70,38 85,78" fill="#43a047"/>
    <polygon points="75,78 90,42 105,78" fill="#2e7d32"/>
    <circle cx="35" cy="72" r="6" fill="#ffb300"/>
    <circle cx="50" cy="72" r="6" fill="#ffb300"/>
    <circle cx="70" cy="72" r="6" fill="#ffb300"/>
    <circle cx="85" cy="72" r="6" fill="#ffb300"/>
    <rect x="58" y="34" width="5" height="28" fill="#fff" rx="1.5"/>
    <ellipse cx="60.5" cy="26" rx="3.5" ry="9" fill="#ff9f1a" class="svg-flame"/>
  </svg>`,

  // 7. กะลามะพร้าวธรรมชาติ
  k7_coconut_shell: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <path d="M20 62 C20 90 100 90 100 62 Z" fill="#4a2c11"/>
    <ellipse cx="60" cy="62" rx="40" ry="14" fill="#6d431c"/>
    <circle cx="45" cy="62" r="6" fill="#f1c40f"/>
    <circle cx="75" cy="62" r="6" fill="#e67e22"/>
    <rect x="57" y="32" width="6" height="26" fill="#fffa65" rx="2"/>
    <ellipse cx="60" cy="24" rx="4" ry="9" fill="#ff9f1a" class="svg-flame"/>
    <circle cx="60" cy="24" r="10" fill="rgba(255,200,50,0.45)" class="svg-glow"/>
  </svg>`,

  // 8. ดอกไม้สดผาสุก
  k8_fresh_flowers: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <ellipse cx="60" cy="80" rx="48" ry="15" fill="#2d6a3f"/>
    <circle cx="28" cy="72" r="10" fill="#e84393"/>
    <circle cx="44" cy="66" r="11" fill="#fdcb6e"/>
    <circle cx="60" cy="65" r="12" fill="#00cec9"/>
    <circle cx="76" cy="66" r="11" fill="#fdcb6e"/>
    <circle cx="92" cy="72" r="10" fill="#e84393"/>
    <rect x="58" y="32" width="5" height="28" fill="#e17055" rx="2"/>
    <ellipse cx="60.5" cy="24" rx="4" ry="9" fill="#ff9f1a" class="svg-flame"/>
  </svg>`,

  // 9. ดอกบัวแก้วรัตนตรัย
  k9_crystal_lotus: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <ellipse cx="60" cy="82" rx="46" ry="14" fill="#0c2461"/>
    <path d="M18 72 C15 40 45 35 55 64" fill="#81ecec"/>
    <path d="M102 72 C105 40 75 35 65 64" fill="#81ecec"/>
    <path d="M35 70 C32 32 60 25 65 60" fill="#74b9ff"/>
    <path d="M85 70 C88 32 60 25 55 60" fill="#74b9ff"/>
    <path d="M48 66 C48 24 72 24 72 66" fill="#a29bfe"/>
    <rect x="58" y="24" width="5" height="34" fill="#ffffff" rx="2"/>
    <ellipse cx="60.5" cy="16" rx="4.5" ry="11" fill="#ff9f1a" class="svg-flame"/>
    <circle cx="60.5" cy="16" r="13" fill="rgba(255, 234, 167, 0.6)" class="svg-glow"/>
  </svg>`
};

// Populate preview art in customizer
for (let i = 1; i <= 9; i++) {
  const el = document.getElementById(`art_k${i}`);
  const keys = Object.keys(KRATHONG_SVGS);
  if (el && keys[i - 1]) {
    el.innerHTML = KRATHONG_SVGS[keys[i - 1]];
  }
}

// Mobile-Compatible Web Audio Synthesizer (Loy Krathong Song)
class MobileLoyKrathongAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.notes = [
      { f: 392.00, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 523.25, d: 0.4 }, { f: 523.25, d: 0.4 },
      { f: 587.33, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 440.00, d: 0.4 }, { f: 392.00, d: 0.6 },
      { f: 392.00, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 659.25, d: 0.4 },
      { f: 587.33, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 587.33, d: 0.6 },
      { f: 523.25, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 392.00, d: 0.35 }, { f: 329.63, d: 0.4 },
      { f: 392.00, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 523.25, d: 0.6 }
    ];
    this.noteIdx = 0;
  }

  unlock() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playNote(freq, dur) {
    if (!this.ctx || !this.isPlaying) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + dur);
  }

  step() {
    if (!this.isPlaying) return;
    const n = this.notes[this.noteIdx];
    this.playNote(n.f, n.d);
    this.noteIdx = (this.noteIdx + 1) % this.notes.length;
    this.timer = setTimeout(() => this.step(), (n.d + 0.1) * 1000);
  }

  start() {
    this.unlock();
    this.isPlaying = true;
    this.step();
  }

  stop() {
    this.isPlaying = false;
    clearTimeout(this.timer);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

const audioEngine = new MobileLoyKrathongAudio();

// Unlock Audio on First User Interaction (Any touch/click on mobile)
window.addEventListener("touchstart", () => audioEngine.unlock(), { once: true });
window.addEventListener("click", () => audioEngine.unlock(), { once: true });

// Seed Data
const DEFAULT_WISHES = [
  { name: "นพ. กิตติศักดิ์ และทีมแพทย์ พญาไท 2", desc: "ขอให้ผู้รับบริการทุกท่านสุขภาพร่างกายสมบูรณ์แข็งแรง ปราศจากโรคภัย มีอายุยืนยาว", type: "k1_lotus_pink", loc: "chaophraya" },
  { name: "พยาบาลและบุคลากรการแพทย์ รพ.พญาไท 2", desc: "ขอส่งกำลังใจให้ผู้ป่วยทุกท่าน หายป่วยโดยเร็ว มีรอยยิ้มที่สดใส", type: "k4_mali_glass", loc: "chiangmai" },
  { name: "คุณวิภาวรรณ สุขสม และครอบครัว", desc: "ขอให้ปี ๒๕๖๙ มีแต่ความสุข ความเจริญ สุขภาพแข็งแรง ไร้ทุกข์โศกโรคภัย", type: "k2_banana_gold", loc: "sukhothai" },
  { name: "ครอบครัวรุ่งโรจน์วิริยะ", desc: "ร่วมอนุรักษ์สายน้ำ ขอขมาพระแม่คงคา ไม่สร้างขยะสู่ธรรมชาติ ๑๐๐%", type: "k7_coconut_shell", loc: "ayutthaya" },
  { name: "น้องณิชาและคุณแม่", desc: "ขอให้ครอบครัวอบอุ่น มีความสุข ความรักความเข้าใจ สุขภาพกายใจแข็งแรง", type: "k9_crystal_lotus", loc: "phuket" }
];

let userWishes = [];
try {
  const cached = localStorage.getItem("phyathai2_wishes_2569_v2");
  if (cached) userWishes = JSON.parse(cached);
} catch (e) {
  console.warn(e);
}
const allWishes = [...userWishes, ...DEFAULT_WISHES];

// DOM References
const riverStage = document.getElementById("riverStage");
const starsContainer = document.getElementById("starsContainer");
const lanternsContainer = document.getElementById("lanternsContainer");
const krathongRiverFlow = document.getElementById("krathongRiverFlow");
const krathongCounter = document.getElementById("krathongCounter");
const wasteReducedKg = document.getElementById("wasteReducedKg");

const openCustomizerBtn = document.getElementById("openCustomizerBtn");
const customizerDrawer = document.getElementById("customizerDrawer");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const drawerDragHandle = document.getElementById("drawerDragHandle");
const loyKrathongForm = document.getElementById("loyKrathongForm");
const userNameInput = document.getElementById("userName");
const userDescInput = document.getElementById("userDesc");

const openLocationModalBtn = document.getElementById("openLocationModalBtn");
const headerLocationName = document.getElementById("headerLocationName");
const locationModal = document.getElementById("locationModal");
const closeLocModalBtn = document.getElementById("closeLocModalBtn");

const viewWishesBtn = document.getElementById("viewWishesBtn");
const wishesModal = document.getElementById("wishesModal");
const closeWishesModalBtn = document.getElementById("closeWishesModalBtn");
const wishesFeedList = document.getElementById("wishesFeedList");

const certificateModal = document.getElementById("certificateModal");
const certCardToCapture = document.getElementById("certCardToCapture");
const certKrathongHero = document.getElementById("certKrathongHero");
const certLocText = document.getElementById("certLocText");
const certUserName = document.getElementById("certUserName");
const certWishQuote = document.getElementById("certWishQuote");
const downloadImageBtn = document.getElementById("downloadImageBtn");
const closeCertBtn = document.getElementById("closeCertBtn");
const certStatusMsg = document.getElementById("certStatusMsg");

const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

let currentLocation = "chaophraya";

// Music Button Handler
musicToggleBtn.addEventListener("click", () => {
  const playing = audioEngine.toggle();
  if (playing) {
    musicToggleBtn.classList.add("playing");
    musicIcon.textContent = "🔊";
    musicText.textContent = "กำลังเล่น";
  } else {
    musicToggleBtn.classList.remove("playing");
    musicIcon.textContent = "🎵";
    musicText.textContent = "เปิดเพลง";
  }
});

// Twinkling Stars & Ascending Lanterns Generation
function createNightAtmosphere() {
  // Stars
  for (let i = 0; i < 45; i++) {
    const s = document.createElement("div");
    s.className = "sky-star";
    const size = Math.random() * 2.2 + 1;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.top = `${Math.random() * 90}%`;
    s.style.left = `${Math.random() * 100}%`;
    s.style.setProperty("--twinkle-d", `${Math.random() * 3 + 1.5}s`);
    starsContainer.appendChild(s);
  }

  // Floating Sky Lanterns
  for (let j = 0; j < 8; j++) {
    const l = document.createElement("div");
    l.className = "sky-lantern";
    l.style.left = `${Math.random() * 95}%`;
    l.style.animationDelay = `${Math.random() * 18}s`;
    l.style.setProperty("--ascend-d", `${Math.random() * 10 + 20}s`);
    lanternsContainer.appendChild(l);
  }
}

// Spawn Realistic Krathong onto Living Water
function spawnKrathongToRiver(name, desc, type, isUser = false) {
  const kItem = document.createElement("div");
  kItem.className = "water-krathong-item";

  const bottomPx = Math.floor(Math.random() * 120) + 20;
  kItem.style.bottom = `${bottomPx}px`;

  const scale = 0.8 + (bottomPx / 180);
  kItem.style.setProperty("--k-w", `${Math.floor(75 * scale)}px`);
  kItem.style.setProperty("--k-h", `${Math.floor(65 * scale)}px`);

  const duration = isUser ? 26 : Math.floor(Math.random() * 15) + 24;
  kItem.style.setProperty("--flow-d", `${duration}s`);

  if (!isUser) {
    const delay = -(Math.random() * duration);
    kItem.style.animationDelay = `${delay}s, -${Math.random() * 3}s`;
  }

  const svgStr = KRATHONG_SVGS[type] || KRATHONG_SVGS.k1_lotus_pink;
  kItem.innerHTML = `
    <div class="krathong-svg-wrapper">${svgStr}</div>
    <span class="krathong-name-tag">${name}</span>
  `;

  kItem.title = `${name}: "${desc}" (คลิกเพื่อดูคำอธิษฐาน)`;
  kItem.addEventListener("click", () => {
    alert(`🪷 กระทงของคุณ ${name}\n\nคำอธิษฐาน: "${desc}"\n\n🌱 รพ.พญาไท ๒ ชวนรักษ์สายน้ำ ลดขยะสู่ธรรมชาติ ๑๐๐%`);
  });

  krathongRiverFlow.appendChild(kItem);
}

// Update Eco Statistics
function updateEcoStats() {
  const base = 1250;
  const total = base + allWishes.length;
  krathongCounter.textContent = total.toLocaleString("th-TH");
  
  // 1 krathong = 0.5 kg waste reduced
  const kg = (total * 0.5).toFixed(1);
  wasteReducedKg.textContent = Number(kg).toLocaleString("th-TH");
}

function initRiver() {
  allWishes.forEach(w => spawnKrathongToRiver(w.name, w.desc, w.type || "k1_lotus_pink"));
  updateEcoStats();
}

// Drawer Controls
openCustomizerBtn.addEventListener("click", () => customizerDrawer.classList.add("open"));
closeDrawerBtn.addEventListener("click", () => customizerDrawer.classList.remove("open"));
drawerDragHandle.addEventListener("click", () => customizerDrawer.classList.remove("open"));

// Krathong Selection
document.querySelectorAll(".k-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".k-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});

// Quick Wish Chips
document.querySelectorAll(".wish-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    userDescInput.value = chip.getAttribute("data-wish");
    userDescInput.focus();
  });
});

// Location Modal & Selection
openLocationModalBtn.addEventListener("click", () => locationModal.classList.add("open"));
closeLocModalBtn.addEventListener("click", () => locationModal.classList.remove("open"));

document.querySelectorAll(".loc-choice-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".loc-choice-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    
    currentLocation = item.getAttribute("data-loc");
    const locMeta = LOCATIONS[currentLocation];
    headerLocationName.textContent = locMeta.short;
    riverStage.setAttribute("data-location", currentLocation);
    riverStage.style.background = locMeta.skyColor;
    
    locationModal.classList.remove("open");
  });
});

// Community Wishes Modal
viewWishesBtn.addEventListener("click", () => {
  wishesFeedList.innerHTML = "";
  allWishes.slice().reverse().forEach(w => {
    const bubble = document.createElement("div");
    bubble.className = "wish-bubble";
    const locName = LOCATIONS[w.loc]?.short || "แม่น้ำเจ้าพระยา (กทม.)";
    bubble.innerHTML = `
      <div class="bubble-head">
        <span class="bubble-name">🪷 ${w.name}</span>
        <span class="bubble-loc">📍 ${locName}</span>
      </div>
      <div class="bubble-text">${w.desc}</div>
    `;
    wishesFeedList.appendChild(bubble);
  });
  wishesModal.classList.add("open");
});

closeWishesModalBtn.addEventListener("click", () => wishesModal.classList.remove("open"));

// Send Wish to Google Sheet Webhook
async function sendToGoogleSheet(name, desc, loc) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        desc,
        location: LOCATIONS[loc]?.name || loc,
        year: "2569",
        timestamp: new Date().toISOString()
      })
    });
    console.log("Sent wish to Google Sheet successfully");
  } catch (err) {
    console.error("Sheet sync error:", err);
  }
}

// Form Submission (Float & Celebrate)
loyKrathongForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = userNameInput.value.trim();
  const desc = userDescInput.value.trim();
  const selectedType = document.querySelector('input[name="krathongType"]:checked')?.value || "k1_lotus_pink";

  if (!name || !desc) return;

  // Auto-play music if idle
  if (!audioEngine.isPlaying) {
    audioEngine.start();
    musicToggleBtn.classList.add("playing");
    musicIcon.textContent = "🔊";
    musicText.textContent = "กำลังเล่น";
  }

  const newWish = { name, desc, type: selectedType, loc: currentLocation };
  userWishes.unshift(newWish);
  allWishes.unshift(newWish);
  try {
    localStorage.setItem("phyathai2_wishes_2569_v2", JSON.stringify(userWishes));
  } catch (err) {}

  // Spawn to river & update stats
  spawnKrathongToRiver(name, desc, selectedType, true);
  updateEcoStats();

  // Send to Sheet
  sendToGoogleSheet(name, desc, currentLocation);

  // Close Customizer Drawer
  customizerDrawer.classList.remove("open");

  // Populate Digital Certificate Card for Screenshot
  certKrathongHero.innerHTML = KRATHONG_SVGS[selectedType] || KRATHONG_SVGS.k1_lotus_pink;
  certLocText.textContent = LOCATIONS[currentLocation]?.name || "แม่น้ำเจ้าพระยา กรุงเทพมหานคร";
  certUserName.textContent = `คุณ ${name}`;
  certWishQuote.textContent = `"${desc}"`;
  certStatusMsg.textContent = "";

  // Show Certificate Modal
  certificateModal.classList.add("open");

  // Reset form
  loyKrathongForm.reset();
  document.querySelector(".k-card").classList.add("active");
});

// html2canvas Download Button
downloadImageBtn.addEventListener("click", async () => {
  certStatusMsg.textContent = "กำลังสร้างรูปภาพการ์ดคำอธิษฐาน...";
  try {
    const canvas = await html2canvas(certCardToCapture, {
      scale: 2.5,
      useCORS: true,
      backgroundColor: "#091e38"
    });
    const link = document.createElement("a");
    link.download = `Phyathai2-LoyKrathong-2569-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    certStatusMsg.textContent = "✅ บันทึกรูปภาพสำเร็จแล้ว!";
  } catch (err) {
    console.error("Screenshot capture error:", err);
    certStatusMsg.textContent = "ขออภัย เบราว์เซอร์นี้ไม่รองรับการบันทึกภาพอัตโนมัติ";
  }
});

closeCertBtn.addEventListener("click", () => certificateModal.classList.remove("open"));

// Close modals when clicking backdrop
[locationModal, wishesModal, certificateModal].forEach(m => {
  m.addEventListener("click", (e) => {
    if (e.target === m) m.classList.remove("open");
  });
});

// Initialize on Load
createNightAtmosphere();
initRiver();
