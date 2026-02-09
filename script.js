let myProfile = {
    name: "Yeni Kullanıcı",
    email: "",
    status: "Bekar",
    auraColor: "#9b59b6",
    auraText: "Dengeli Frekans"
};

// --- GİRİŞ VE AUTH SİSTEMİ ---
function handleAuth() {
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    
    if(name.length < 3 || !email.includes("@")) {
        alert("Lütfen geçerli bilgileri gir.");
        return;
    }
    
    myProfile.name = name;
    myProfile.email = email;
    
    document.getElementById('auth-step-1').classList.add('hidden');
    document.getElementById('auth-step-2').classList.remove('hidden');
    alert("Vibey Doğrulama Kodun: 1907"); // Test kodu
}

function handleVerify() {
    const code = document.getElementById('verify-code').value;
    if(code === "1907") {
        document.getElementById('auth-page').classList.remove('active');
        document.getElementById('nav').classList.remove('hidden');
        showPage('feed-page');
        initApp();
    } else {
        alert("Kod hatalı.");
    }
}

// --- SAYFA YÖNETİMİ ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    if(pageId === 'aura-page') startAuraAnalysis();
    if(pageId === 'profile-page') updateProfileUI();
}

// --- APP BAŞLATICI ---
function initApp() {
    renderStories();
    renderFeed();
    renderChatList();
}

// --- KÜRE SİSTEMİ (AURA) ---
function startAuraAnalysis() {
    const orb = document.getElementById('main-orb');
    const status = document.getElementById('aura-status');
    
    orb.style.background = "#333";
    status.innerText = "Frekans Aranıyor...";
    
    const vibes = [
        { c: "radial-gradient(circle, #ff00cc, #3333ff)", t: "Yüksek Enerji", d: "Bugün etrafına neşe saçıyorsun!" },
        { c: "radial-gradient(circle, #00c6ff, #0072ff)", t: "Sakin & Huzurlu", d: "Zihnin berrak, ruhun dingin." },
        { c: "radial-gradient(circle, #555, #000)", t: "Melankolik Vibe", d: "Biraz dinlenmeye ve müzik dinlemeye ne dersin?" },
        { c: "radial-gradient(circle, #fceabb, #f8b500)", t: "Yaratıcı Mod", d: "Yeni fikirler üretmek için harika bir gün!" }
    ];
    
    const randomVibe = vibes[Math.floor(Math.random() * vibes.length)];
    
    setTimeout(() => {
        orb.style.background = randomVibe.c;
        orb.style.boxShadow = `0 0 100px ${randomVibe.c.split(',')[1]}`;
        status.innerText = randomVibe.t;
        document.getElementById('aura-desc').innerText = randomVibe.d;
        myProfile.auraColor = randomVibe.c;
    }, 2000);
}

// --- INSTA STYLE FEED ---
function renderStories() {
    const wrapper = document.getElementById('stories-wrapper');
    const users = ["Sen", "Yasin", "Merve", "Arda", "Ece", "Can"];
    wrapper.innerHTML = users.map(u => `
        <div class="story-item">
            <div class="story-circle"><img src="https://i.pravatar.cc/150?u=${u}"></div>
            <p style="font-size: 0.7rem; text-align:center; margin-top:5px;">${u}</p>
        </div>
    `).join('');
}

function renderFeed() {
    const feed = document.getElementById('main-feed');
    const mockPosts = [
        { user: "yasinyilmaz", loc: "İstanbul", img: "https://picsum.photos/500/500?random=1", desc: "Gece vibe'ı başka... 🌌" },
        { user: "merve_aura", loc: "Keşfet", img: "https://picsum.photos/500/500?random=2", desc: "Küreniz bugün ne renk?" }
    ];
    
    feed.innerHTML = mockPosts.map(p => `
        <div class="post-card">
            <div class="post-header">
                <img src="https://i.pravatar.cc/50?u=${p.user}">
                <b>${p.user}</b>
            </div>
            <img src="${p.img}" class="post-img">
            <div class="post-actions">
                <i class="far fa-heart"></i>
                <i class="far fa-comment"></i>
                <i class="far fa-paper-plane"></i>
            </div>
            <div style="padding: 0 12px 10px;">
                <p><b>${p.user}</b> ${p.desc}</p>
            </div>
        </div>
    `).join('');
}

// --- MESAJLAR ---
function renderChatList() {
    const container = document.getElementById('chat-list-container');
    const chats = [
        { n: "Yasin", m: "Selam kanka, kürenin rengi çok iyi!", t: "12:40" },
        { n: "Ece", m: "Hadi gelmiyor musun?", t: "10:15" }
    ];
    
    container.innerHTML = chats.map(c => `
        <div class="chat-item">
            <img src="https://i.pravatar.cc/100?u=${c.n}" class="chat-avatar">
            <div class="chat-info">
                <h4>${c.n}</h4>
                <p>${c.m} • ${c.t}</p>
            </div>
        </div>
    `).join('');
}

// --- PROFİL YÖNETİMİ ---
function updateProfileUI() {
    document.getElementById('profile-username-top').innerText = myProfile.name.toLowerCase().replace(" ", "_");
    document.getElementById('my-profile-name').innerText = myProfile.name;
    document.getElementById('my-relationship-status').innerText = myProfile.status;
    
    // Grid doldur
    const grid = document.getElementById('profile-posts');
    grid.innerHTML = "";
    for(let i=1; i<10; i++) {
        grid.innerHTML += `<div class="grid-item" style="background: url('https://picsum.photos/200?random=${i}'); background-size: cover;"></div>`;
    }
}

function openEditModal() { document.getElementById('edit-modal').classList.add('active'); }
function closeModals() { document.getElementById('edit-modal').classList.remove('active'); }

function saveProfile() {
    myProfile.name = document.getElementById('edit-name-input').value || myProfile.name;
    myProfile.status = document.getElementById('edit-status-input').value;
    updateProfileUI();
    closeModals();
}
