// script.js - Loy Krathong Phyathai Hospital (Online & Eco-friendly)
const SHEET_ID = "1rvy_KvOfpdlgiXxE2aAhv1nJThsGtN2KdzH7L6nhDy4";

// Initial seed data for lively river feel
const DEFAULT_WISHES = [
  { name: "นพ. กิตติศักดิ์ และทีมแพทย์ พญาไท", desc: "ขอให้ผู้รับบริการทุกท่านมีสุขภาพแข็งแรง ปลอดโรค ปลอดภัย", icon: "🪷", time: "10 นาทีที่แล้ว" },
  { name: "พยาบาลและบุคลากรการแพทย์", desc: "ขออวยพรให้คนไข้ทุกท่านหายป่วยโดยเร็ว มีรอยยิ้มสดใสในทุกวัน", icon: "🍃", time: "25 นาทีที่แล้ว" },
  { name: "คุณวิภาวรรณ สุขสม", desc: "ขอให้ปีนี้มีแต่สิ่งดีๆ เข้ามาในชีวิต ครอบครัวอบอุ่น สุขภาพแข็งแรง", icon: "🕯️", time: "40 นาทีที่แล้ว" },
  { name: "ครอบครัวรุ่งโรจน์วิริยะ", desc: "ร่วมอนุรักษ์สายน้ำ ขอขมาพระแม่คงคา ไม่สร้างขยะให้ลำคลอง", icon: "🌸", time: "1 ชม. ที่แล้ว" },
  { name: "น้องณิชาและคุณแม่", desc: "ขอให้เรียนหนังสือเก่งๆ สุขภาพสมบูรณ์ คุณพ่อคุณแม่แข็งแรง", icon: "🪷", time: "2 ชม. ที่แล้ว" }
];

// Krathong icon map
const KRATHONG_ICONS = {
  lotus: "🪷",
  banana: "🍃",
  candle: "🕯️",
  flower: "🌸"
};

// Storage state
let userWishes = [];
try {
  const cached = localStorage.getItem("phyathai_krathong_wishes");
  if (cached) {
    userWishes = JSON.parse(cached);
  }
} catch (e) {
  console.warn("localStorage not accessible");
}

const allWishes = [...userWishes, ...DEFAULT_WISHES];

// DOM Elements
const starsContainer = document.getElementById("starsContainer");
const floatingKrathongs = document.getElementById("floatingKrathongs");
const krathongCountEl = document.getElementById("krathongCount");
const loyKrathongForm = document.getElementById("loyKrathongForm");
const userNameInput = document.getElementById("userName");
const userDescInput = document.getElementById("userDesc");
const wishModal = document.getElementById("wishModal");
const wishesList = document.getElementById("wishesList");
const viewWishesBtn = document.getElementById("viewWishesBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const floatCelebration = document.getElementById("floatCelebration");
const continueBtn = document.getElementById("continueBtn");

// Generate twinkling stars
function createStars() {
  const count = 45;
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

// Spawn krathong into river animation
function spawnKrathong(name, desc, icon, isUser = false) {
  const kElem = document.createElement("div");
  kElem.className = "water-krathong";
  
  // Random vertical placement along the water surface (10% to 75% depth)
  const bottomPercent = Math.floor(Math.random() * 65) + 10;
  kElem.style.bottom = `${bottomPercent}px`;

  // Scale according to distance (deeper is smaller)
  const scale = 0.75 + (bottomPercent / 120);
  kElem.style.setProperty("--k-size", `${Math.floor(26 * scale)}px`);

  // Randomized duration (between 18s and 35s)
  const duration = isUser ? 22 : Math.floor(Math.random() * 15) + 20;
  kElem.style.setProperty("--anim-duration", `${duration}s`);

  // Delay for staggering
  if (!isUser) {
    const delay = -(Math.random() * duration);
    kElem.style.animationDelay = `${delay}s, -${Math.random() * 3}s`;
  }

  kElem.innerHTML = `
    <span class="k-icon">${icon}</span>
    <span class="k-name">${name}</span>
  `;

  kElem.title = `${name}: "${desc}" (คลิกเพื่ออ่านคำอธิษฐาน)`;
  kElem.addEventListener("click", () => {
    alert(`🪷 กระทงของคุณ ${name}\n\nคำอธิษฐาน: "${desc}"\n\n🌱 รพ.พญาไท ชวนรักษ์สิ่งแวดล้อม ปลอดขยะ 100%`);
  });

  floatingKrathongs.appendChild(kElem);
}

// Populate river with existing krathongs
function initRiver() {
  allWishes.forEach(item => {
    spawnKrathong(item.name, item.desc, item.icon || "🪷");
  });
  updateCount();
}

function updateCount() {
  const baseCount = 1250;
  krathongCountEl.textContent = (baseCount + allWishes.length).toLocaleString("th-TH");
}

// Quick Wish tags click
document.querySelectorAll(".wish-tag").forEach(tag => {
  tag.addEventListener("click", () => {
    userDescInput.value = tag.getAttribute("data-wish");
    userDescInput.focus();
  });
});

// Krathong selector active state
document.querySelectorAll(".krathong-option").forEach(opt => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".krathong-option").forEach(o => o.classList.remove("active"));
    opt.classList.add("active");
  });
});

// Render Modal Wish list
function renderWishList() {
  wishesList.innerHTML = "";
  allWishes.slice().reverse().forEach(wish => {
    const item = document.createElement("div");
    item.className = "wish-item";
    item.innerHTML = `
      <div class="wish-item-header">
        <span class="wish-item-name">${wish.icon || "🪷"} ${wish.name}</span>
        <span class="wish-item-time">${wish.time || "เมื่อสักครู่"}</span>
      </div>
      <div class="wish-item-text">${wish.desc}</div>
    `;
    wishesList.appendChild(item);
  });
}

// Modal events
viewWishesBtn.addEventListener("click", () => {
  renderWishList();
  wishModal.classList.add("show");
});

closeModalBtn.addEventListener("click", () => {
  wishModal.classList.remove("show");
});

wishModal.addEventListener("click", (e) => {
  if (e.target === wishModal) wishModal.classList.remove("show");
});

continueBtn.addEventListener("click", () => {
  floatCelebration.classList.remove("show");
  // Smooth scroll up to river stage
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Save to Google Sheet using API route or sync endpoint
async function recordToSheet(name, desc) {
  try {
    // If running in local/Vercel with /api/sheet, call it
    await fetch("/api/save-wish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, desc, timestamp: new Date().toISOString() })
    });
  } catch (err) {
    // Fallback: stored in browser local state securely
    console.log("Local sync stored:", { name, desc });
  }
}

// Form Submission (Float Krathong!)
loyKrathongForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = userNameInput.value.trim();
  const desc = userDescInput.value.trim();
  const selectedType = document.querySelector('input[name="krathongType"]:checked')?.value || "lotus";
  const icon = KRATHONG_ICONS[selectedType] || "🪷";

  if (!name || !desc) return;

  const newWish = {
    name,
    desc,
    icon,
    time: "เมื่อสักครู่"
  };

  // Add to in-memory list & LocalStorage
  userWishes.unshift(newWish);
  allWishes.unshift(newWish);
  try {
    localStorage.setItem("phyathai_krathong_wishes", JSON.stringify(userWishes));
  } catch (err) {
    console.warn(err);
  }

  // Record to Sheet
  recordToSheet(name, desc);

  // Spawn into active river immediately
  spawnKrathong(name, desc, icon, true);
  updateCount();

  // Show celebration dialog
  document.getElementById("bigKrathongAnim").textContent = icon;
  document.getElementById("celebrateName").textContent = `คุณ ${name}`;
  document.getElementById("celebrateWish").textContent = `"${desc}"`;
  floatCelebration.classList.add("show");

  // Reset form
  loyKrathongForm.reset();
  document.querySelector(".krathong-option").classList.add("active");
});

// Initialize on Load
createStars();
initRiver();
