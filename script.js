let sentCode = "1234";
let myProfile = { name: "Kullanıcı", status: "Bekar", avatar: "https://via.placeholder.com/150", vColor: "#9b59b6", vText: "Dengeli" };

// SAYFA GEÇİŞLERİ (Burası bozuksa hiçbir buton çalışmaz)
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(id);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    if(id === 'chat-list-page') renderChats();
}

// GİRİŞ KONTROLÜ
function handleAuth() {
    const email = document.getElementById('email-input').value;
    if(!email.includes("@")) return alert("Geçerli bir mail gir!");
    myProfile.name = document.getElementById('name-input').value;
    alert("Vibey Giriş Kodun: 1234");
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('verify-form').classList.remove('hidden');
}

function handleVerify() {
    const code = document.getElementById('verify-code').value;
    if(code === sentCode) {
        document.getElementById('nav').classList.remove('hidden');
        showPage('home-page');
        startAura();
    } else {
        alert("Kod hatalı! (Test kodu: 1234)");
    }
}

// AURA ANALİZİ
function startAura() {
    const vibes = [
        { c: "#1a1a2e", t: "Melankolik" },
        { c: "#f8b500", t: "Mutlu" },
        { c: "#2193b0", t: "Huzurlu" }
    ];
    const v = vibes[Math.floor(Math.random() * vibes.length)];
    myProfile.vColor = v.c; myProfile.vText = v.t;
    const orb = document.getElementById('main-orb');
    if(orb) {
        orb.style.background = v.c;
        orb.style.boxShadow = `0 0 80px ${v.c}`;
        document.getElementById('aura-status').innerText = v.t;
        document.getElementById('aura-status').style.color = v.c;
    }
}

// PROFİL İŞLEMLERİ
function openEditModal() { document.getElementById('edit-modal').classList.add('active'); }
function closeModals() { document.querySelectorAll('.modal').forEach(m => m.classList.remove('active')); }

function saveProfile() {
    myProfile.name = document.getElementById('edit-name-input').value || myProfile.name;
    myProfile.status = document.getElementById('edit-status-input').value;
    document.getElementById('my-profile-name').innerText = myProfile.name;
    document.getElementById('my-relationship-status').innerText = myProfile.status;
    closeModals();
}

// CHAT LİSTESİ
function renderChats() {
    const list = document.getElementById('chat-list-container');
    const users = [
        { n: "Selin", s: "Bekar", v: "#f8b500", l: "Çevrimiçi" },
        { n: "Arda", s: "Bekar", v: "#2193b0", l: "5 dk önce" }
    ];
    list.innerHTML = users.map(u => `
        <div class="chat-item" onclick="openChat('${u.n}')">
            <div class="chat-avatar" style="background:${u.v}"></div>
            <div><b>${u.n}</b><br><small>${u.l} • ${u.s}</small></div>
        </div>`).join('');
}

function openChat(name) {
    document.getElementById('current-chat-name').innerText = name;
    showPage('chat-box-page');
}
