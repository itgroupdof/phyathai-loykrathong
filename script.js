// script.js - Loy Krathong Online 2569 Phyathai 2 Hospital
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxovjMWLTCTzCxF4TLwVjfooHgT5sXFr6p0Ml4oSlmaGTkdUe1r6LeYVId07GmQBD9F/exec";

// 5 Popular Locations in Thailand
const LOCATIONS = {
  chaophraya: { name: "แม่น้ำเจ้าพระยา (วัดอรุณฯ กรุงเทพฯ)", short: "แม่น้ำเจ้าพระยา" },
  sukhothai: { name: "สุโขทัย (อุทยานประวัติศาสตร์ เผาเทียนเล่นไฟ)", short: "อุทยานฯ สุโขทัย" },
  chiangmai: { name: "เชียงใหม่ (ริมแม่น้ำปิง ประเพณียี่เป็ง)", short: "ริมแม่น้ำปิง เชียงใหม่" },
  ayutthaya: { name: "พระนครศรีอยุธยา (คุ้งน้ำอยุธยา มรดกโลก)", short: "คุ้งน้ำอยุธยา" },
  phuket: { name: "ภูเก็ต (แหลมพรหมเทพ ทะเลอันดามัน)", short: "แหลมพรหมเทพ ภูเก็ต" }
};

// SVG templates for realistic Krathongs
const KRATHONG_SVGS = {
  lotus: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <ellipse cx="60" cy="78" rx="48" ry="16" fill="#1b4d2e"/>
    <path d="M15 75 Q60 92 105 75 Q60 62 15 75" fill="#2d6a3f"/>
    <path d="M22 68 C15 50 40 40 50 65" fill="#f78fb3"/>
    <path d="M98 68 C105 50 80 40 70 65" fill="#f78fb3"/>
    <path d="M35 68 C30 42 55 35 60 62" fill="#ff9ff3"/>
    <path d="M85 68 C90 42 65 35 60 62" fill="#ff9ff3"/>
    <path d="M45 66 C45 32 75 32 75 66" fill="#f368e0"/>
    <rect x="57" y="32" width="6" height="28" fill="#fbc531" rx="2"/>
    <ellipse cx="60" cy="24" rx="4" ry="9" fill="#ff9f1a" class="svg-flame"/>
    <circle cx="60" cy="24" r="8" fill="rgba(255,200,50,0.4)" class="svg-glow"/>
    <line x1="53" y1="62" x2="49" y2="28" stroke="#8c2a1e" stroke-width="1.8"/>
    <line x1="60" y1="62" x2="60" y2="22" stroke="#8c2a1e" stroke-width="1.8"/>
    <line x1="67" y1="62" x2="71" y2="28" stroke="#8c2a1e" stroke-width="1.8"/>
  </svg>`,
  banana: `<svg viewBox="0 0 120 100" class="krathong-svg">
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
  candle: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <ellipse cx="60" cy="82" rx="46" ry="14" fill="#2d3436"/>
    <ellipse cx="60" cy="76" rx="44" ry="12" fill="#d4af37"/>
    <path d="M20 74 Q60 52 100 74 Q60 90 20 74" fill="#f1c40f"/>
    <rect x="54" y="24" width="12" height="42" fill="#ffefa0" rx="3"/>
    <ellipse cx="60" cy="14" rx="5" ry="12" fill="#e67e22" class="svg-flame"/>
    <circle cx="60" cy="14" r="14" fill="rgba(243, 156, 18, 0.45)" class="svg-glow"/>
  </svg>`,
  flower: `<svg viewBox="0 0 120 100" class="krathong-svg">
    <ellipse cx="60" cy="80" rx="48" ry="15" fill="#1b4d2e"/>
    <circle cx="30" cy="72" r="9" fill="#ffffff"/>
    <circle cx="45" cy="68" r="10" fill="#9b59b6"/>
    <circle cx="60" cy="66" r="11" fill="#ffffff"/>
    <circle cx="75" cy="68" r="10" fill="#9b59b6"/>
    <circle cx="90" cy="72" r="9" fill="#ffffff"/>
    <rect x="57" y="32" width="6" height="28" fill="#9b59b6" rx="2"/>
    <ellipse cx="60" cy="24" rx="4" ry="9" fill="#ff9f1a" class="svg-flame"/>
  </svg>`
};

// Initial Wishes Seed
const DEFAULT_WISHES = [
  { name: "นพ. กิตติศักดิ์ และทีมแพทย์ พญาไท 2", desc: "ขอให้ผู้รับบริการทุกท่านสุขภาพร่างกายแข็งแรง ปราศจากโรคภัยไข้เจ็บ มีอายุยืนยาว", type: "lotus", location: "chaophraya", time: "10 นาทีที่แล้ว" },
  { name: "พยาบาลและบุคลากรการแพทย์ รพ.พญาไท 2", desc: "ขอส่งกำลังใจให้ผู้ป่วยทุกท่าน หายป่วยโดยเร็ว มีรอยยิ้มสดใสในทุกวัน", type: "banana", location: "chiangmai", time: "25 นาทีที่แล้ว" },
  { name: "คุณวิภาวรรณ สุขสม", desc: "ขอให้ปี 2569 มีแต่ความสุข ความเจริญ ครอบครัวอบอุ่น สุขภาพแข็งแรง", type: "candle", location: "sukhothai", time: "40 นาทีที่แล้ว" },
  { name: "ครอบครัวรุ่งโรจน์วิริยะ", desc: "ร่วมอนุรักษ์สายน้ำ ขอขมาพระแม่คงคา ไม่สร้างขยะสู่ธรรมชาติ 100%", type: "flower", location: "ayutthaya", time: "1 ชม. ที่แล้ว" },
  { name: "น้องณิชาและคุณแม่", desc: "ขอให้ครอบครัวมีความสุข ปลอดภัยจากอันตรายทั้งปวง มีพลังใจที่เข้มแข็ง", type: "lotus", location: "phuket", time: "2 ชม. ที่แล้ว" }
];

// Audio Synthesizer Engine (Authentic Thai Loy Krathong Melody - Plays without external mp3 blocks!)
class LoyKrathongAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    // Classic Loy Krathong notes (Frequencies in Hz)
    // "วันเพ็ญเดือนสิบสอง น้ำก็นองเต็มตลิ่ง เราทั้งหลายชายหญิง สนุกกันจริงวันลอยกระทง"
    this.notes = [
      { f: 392.00, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 523.25, d: 0.4 }, { f: 523.25, d: 0.4 }, // วันเพ็ญเดือนสิบสอง
      { f: 587.33, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 440.00, d: 0.4 }, { f: 392.00, d: 0.6 }, // น้ำก็นองเต็มตลิ่ง
      { f: 392.00, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 659.25, d: 0.4 }, // เราทั้งหลายชายหญิง
      { f: 587.33, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 587.33, d: 0.6 },                          // สนุกกันจริง
      { f: 523.25, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 392.00, d: 0.35 }, { f: 329.63, d: 0.4 }, // วันลอยกระทง
      { f: 392.00, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 523.25, d: 0.6 }                          // ลอย ลอยกระทง
    ];
    this.noteIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playNote(freq, duration) {
    if (!this.ctx || !this.isPlaying) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm traditional Thai xylophone / bell tone
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  step() {
    if (!this.isPlaying) return;
    const note = this.notes[this.noteIndex];
    this.playNote(note.f, note.d);
    this.noteIndex = (this.noteIndex + 1) % this.notes.length;
    this.timer = setTimeout(() => this.step(), (note.d + 0.1) * 1000);
  }

  start() {
    this.init();
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
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

const audioEngine = new LoyKrathongAudio();

// Storage State
let userWishes = [];
try {
  const cached = localStorage.getItem("phyathai2_krathong_wishes_2569");
  if (cached) userWishes = JSON.parse(cached);
} catch (e) {
  console.warn("Storage warning:", e);
}

const allWishes = [...userWishes, ...DEFAULT_WISHES];

// DOM Elements
const starsContainer = document.getElementById("starsContainer");
const riverStage = document.getElementById("riverStage");
const currentLocName = document.getElementById("currentLocName");
const floatingKrathongs = document.getElementById("floatingKrathongs");
const krathongCountEl = document.getElementById("krathongCount");
const wasteReducedKgEl = document.getElementById("wasteReducedKg");
const loyKrathongForm = document.getElementById("loyKrathongForm");
const userNameInput = document.getElementById("userName");
const userDescInput = document.getElementById("userDesc");
const wishModal = document.getElementById("wishModal");
const wishesList = document.getElementById("wishesList");
const viewWishesBtn = document.getElementById("viewWishesBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const floatCelebration = document.getElementById("floatCelebration");
const downloadCardBtn = document.getElementById("downloadCardBtn");
const viewRiverBtn = document.getElementById("viewRiverBtn");
const downloadStatus = document.getElementById("downloadStatus");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");

// Music Toggle Click
musicToggleBtn.addEventListener("click", () => {
  const playing = audioEngine.toggle();
  if (playing) {
    musicToggleBtn.classList.add("playing");
    musicIcon.textContent = "🔊";
    musicLabel.textContent = "เพลงกำลังเล่น";
  } else {
    musicToggleBtn.classList.remove("playing");
    musicIcon.textContent = "🎵";
    musicLabel.textContent = "เปิดเพลง";
  }
});

// Twinkling Stars
function createStars() {
  const count = 48;
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 2.5 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 85}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.setProperty("--duration", `${Math.random() * 3 + 1.5}s`);
    starsContainer.appendChild(star);
  }
}

// Spawn Realistic Krathong into River
function spawnKrathong(name, desc, type, isUser = false) {
  const kElem = document.createElement("div");
  kElem.className = "water-krathong";
  
  const bottomPercent = Math.floor(Math.random() * 80) + 12;
  kElem.style.bottom = `${bottomPercent}px`;

  const scale = 0.8 + (bottomPercent / 140);
  kElem.style.setProperty("--k-width", `${Math.floor(70 * scale)}px`);
  kElem.style.setProperty("--k-height", `${Math.floor(60 * scale)}px`);

  const duration = isUser ? 24 : Math.floor(Math.random() * 16) + 22;
  kElem.style.setProperty("--anim-duration", `${duration}s`);

  if (!isUser) {
    const delay = -(Math.random() * duration);
    kElem.style.animationDelay = `${delay}s, -${Math.random() * 3}s`;
  }

  const svgContent = KRATHONG_SVGS[type] || KRATHONG_SVGS.lotus;
  kElem.innerHTML = `
    <div class="k-icon-art">${svgContent}</div>
    <span class="k-name">${name}</span>
  `;

  kElem.title = `${name}: "${desc}" (คลิกเพื่ออ่านคำอธิษฐาน)`;
  kElem.addEventListener("click", () => {
    alert(`🪷 กระทงของคุณ ${name}\n\nคำอธิษฐาน: "${desc}"\n\n🌱 รพ.พญาไท ๒ ชวนรักษ์สายน้ำ ลดขยะสู่ธรรมชาติ 100%`);
  });

  floatingKrathongs.appendChild(kElem);
}

// Update Eco Waste Statistics (1 online krathong = 0.5 kg waste reduced, 100% reduced)
function updateEcoStats() {
  const baseCount = 1250;
  const totalCount = baseCount + allWishes.length;
  krathongCountEl.textContent = totalCount.toLocaleString("th-TH");
  
  // 1 krathong = 0.5 kg river debris prevented
  const kgReduced = (totalCount * 0.5).toFixed(1);
  wasteReducedKgEl.textContent = Number(kgReduced).toLocaleString("th-TH");
}

function initRiver() {
  allWishes.forEach(item => {
    spawnKrathong(item.name, item.desc, item.type || "lotus");
  });
  updateEcoStats();
}

// Location Switching Handler
document.querySelectorAll('input[name="location"]').forEach(radio => {
  radio.parentElement.addEventListener("click", () => {
    document.querySelectorAll(".location-card").forEach(c => c.classList.remove("active"));
    radio.parentElement.classList.add("active");
    const locKey = radio.value;
    riverStage.setAttribute("data-location", locKey);
    currentLocName.textContent = LOCATIONS[locKey]?.name || "แม่น้ำเจ้าพระยา";
  });
});

// Krathong Selection Handler
document.querySelectorAll(".krathong-option").forEach(opt => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".krathong-option").forEach(o => o.classList.remove("active"));
    opt.classList.add("active");
  });
});

// Quick Wish tags click
document.querySelectorAll(".wish-tag").forEach(tag => {
  tag.addEventListener("click", () => {
    userDescInput.value = tag.getAttribute("data-wish");
    userDescInput.focus();
  });
});

// Modal render
function renderWishList() {
  wishesList.innerHTML = "";
  allWishes.slice().reverse().forEach(wish => {
    const item = document.createElement("div");
    item.className = "wish-item";
    const locLabel = LOCATIONS[wish.location]?.short || "แม่น้ำเจ้าพระยา";
    item.innerHTML = `
      <div class="wish-item-header">
        <span class="wish-item-name">🪷 ${wish.name}</span>
        <span class="wish-item-loc">📍 ${locLabel}</span>
      </div>
      <div class="wish-item-text">${wish.desc}</div>
    `;
    wishesList.appendChild(item);
  });
}

viewWishesBtn.addEventListener("click", () => {
  renderWishList();
  wishModal.classList.add("show");
});

closeModalBtn.addEventListener("click", () => wishModal.classList.remove("show"));
wishModal.addEventListener("click", (e) => {
  if (e.target === wishModal) wishModal.classList.remove("show");
});

viewRiverBtn.addEventListener("click", () => {
  floatCelebration.classList.remove("show");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Capture and Download Digital Card via html2canvas
downloadCardBtn.addEventListener("click", async () => {
  downloadStatus.textContent = "กำลังสร้างรูปภาพการ์ด...";
  const captureCard = document.getElementById("captureCard");
  
  try {
    const canvas = await html2canvas(captureCard, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#091e3a"
    });
    
    const link = document.createElement("a");
    link.download = `Phyathai2-LoyKrathong-2569-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    downloadStatus.textContent = "✅ บันทึกรูปภาพสำเร็จแล้ว!";
  } catch (err) {
    console.error("Screenshot error:", err);
    downloadStatus.textContent = "ขออภัย ไม่สามารถบันทึกภาพได้ในเบราว์เซอร์นี้";
  }
});

// Send Wish to Google Sheet (Includes location & 2569 stamp)
async function recordToSheet(name, desc, location) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name, 
        desc, 
        location: LOCATIONS[location]?.name || location,
        year: "2569",
        timestamp: new Date().toISOString() 
      })
    });
    console.log("Recorded to Sheet successfully");
  } catch (err) {
    console.error("Sheet record error:", err);
  }
}

// Form Submission (Float Krathong!)
loyKrathongForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = userNameInput.value.trim();
  const desc = userDescInput.value.trim();
  const selectedType = document.querySelector('input[name="krathongType"]:checked')?.value || "lotus";
  const selectedLoc = document.querySelector('input[name="location"]:checked')?.value || "chaophraya";

  if (!name || !desc) return;

  // Auto start pleasant background music on user action if not playing
  if (!audioEngine.isPlaying) {
    audioEngine.start();
    musicToggleBtn.classList.add("playing");
    musicIcon.textContent = "🔊";
    musicLabel.textContent = "เพลงกำลังเล่น";
  }

  const newWish = {
    name,
    desc,
    type: selectedType,
    location: selectedLoc,
    time: "เมื่อสักครู่"
  };

  userWishes.unshift(newWish);
  allWishes.unshift(newWish);
  try {
    localStorage.setItem("phyathai2_krathong_wishes_2569", JSON.stringify(userWishes));
  } catch (err) {
    console.warn(err);
  }

  // Record to Google Sheet
  recordToSheet(name, desc, selectedLoc);

  // Spawn into active river
  spawnKrathong(name, desc, selectedType, true);
  updateEcoStats();

  // Populate Capture Digital Card
  document.getElementById("cardKrathongVisual").innerHTML = KRATHONG_SVGS[selectedType] || KRATHONG_SVGS.lotus;
  document.getElementById("cardLocationName").textContent = LOCATIONS[selectedLoc]?.name || "แม่น้ำเจ้าพระยา";
  document.getElementById("cardUserName").textContent = `คุณ ${name}`;
  document.getElementById("cardWishText").textContent = `"${desc}"`;
  downloadStatus.textContent = "";

  // Show celebration dialog
  floatCelebration.classList.add("show");

  // Reset form
  loyKrathongForm.reset();
  document.querySelector(".location-card").classList.add("active");
  document.querySelector(".krathong-option").classList.add("active");
});

// Initialize on Load
createStars();
initRiver();
