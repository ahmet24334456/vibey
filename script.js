// --- 1. DEĞİŞKENLER (Bozmadan korundu) ---
let sentCode = null;
let myVibeColor = '#9b59b6';
let activeChatId = null; 

let myProfile = {
    name: "Kullanıcı",
    status: "Bekar",
    avatar: "https://via.placeholder.com/150",
    vibe: { color: '#9b59b6', text: 'Dengeli' }
};

const users = [
    { id: 1, name: "Ahmet Yılmaz", status: "Bekar", avatar: "https://randomuser.me/api/portraits/men/32.jpg", vibe: { color: '#ff3366', text: 'Enerjik' } },
    { id: 2, name: "Melis Aras", status: "İlişkisi var", avatar: "https://randomuser.me/api/portraits/women/44.jpg", vibe: { color: '#f8b500', text: 'Mutlu' } },
    { id: 3, name: "Can Demir", status: "Bekar", avatar: "https://randomuser.me/api/portraits/men/19.jpg", vibe: { color: '#2193b0', text: 'Huzurlu' } }
];

// --- 2. SAYFA VE TEMA (Senin HTML'indeki isimlerle birebir) ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if(targetPage) targetPage.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const nav = document.querySelector(`.nav-item[onclick*="${pageId}"]`);
    if (nav) nav.classList.add('active');

    if (pageId === 'chat-list-page') renderChatList();
}

function toggleTheme() {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';
    html.setAttribute('data-theme', isLight ? 'dark' : 'light');
    document.getElementById('theme-icon').className = isLight ? 'fas fa-moon' : 'fas fa-sun';
}

// --- 3. REELS ETKİLEŞİMLERİ (Beğeni, Takip, Yorum) ---
function renderVideos() {
    const container = document.getElementById('video-container');
    container.innerHTML = `
        <div class="video-card">
            <video src="https://vjs.zencdn.net/v/oceans.mp4" loop autoplay muted></video>
            <div class="v-sidebar">
                <div class="v-action" onclick="toggleLike(this)"><i class="fas fa-heart"></i><br><span>1.2k</span></div>
                <div class="v-action" onclick="openCommentModal()"><i class="fas fa-comment"></i><br><span>45</span></div>
                <button class="f-btn" onclick="toggleFollow(this)">Takip Et</button>
            </div>
        </div>`;
}

function toggleLike(el) {
    el.classList.toggle('active');
    el.style.color = el.classList.contains('active') ? '#ff3366' : '#fff';
}

function toggleFollow(btn) {
    btn.innerText = (btn.innerText === "Takip Et") ? "Takiptesin" : "Takip Et";
    btn.style.background = (btn.innerText === "Takiptesin") ? "var(--accent-color)" : "transparent";
}

// --- 4. SOHBET VE MESAJLAŞMA (Senin sendMessage isminle) ---
function renderChatList() {
    const container = document.getElementById('chat-list-container');
    container.innerHTML = users.map(u => `
        <div class="chat-item" onclick="startNewChat(${u.id})">
            <img src="${u.avatar}" class="chat-avatar">
            <div class="chat-info"><h4>${u.name}</h4><p>Frekansın çok iyi!</p></div>
        </div>`).join('');
}

function startNewChat(userId) {
    activeChatId = userId;
    const user = users.find(u => u.id === userId);
    document.getElementById('current-chat-user-name').innerText = user.name;
    document.getElementById('messages-container').innerHTML = `<div class="msg received">Selam ${user.name}! Naber?</div>`;
    showPage('chat-box-page');
    if(document.getElementById('discover-modal')) closeDiscoverModal();
}

function sendMessage() {
    const input = document.getElementById('message-input');
    if (!input.value.trim()) return;
    const container = document.getElementById('messages-container');
    container.innerHTML += `<div class="msg sent">${input.value}</div>`;
    input.value = "";
    container.scrollTop = container.scrollHeight;
}

// --- 5. YORUM SİSTEMİ (Senin addComment isminle) ---
function openCommentModal() { document.getElementById('comment-modal').classList.add('active'); }
function closeCommentModal() { document.getElementById('comment-modal').classList.remove('active'); }

function addComment() {
    const input = document.getElementById('new-comment-input');
    if (!input.value.trim()) return;
    document.getElementById('comment-list').innerHTML += `<div class="comment-item"><b>@sen</b> ${input.value}</div>`;
    input.value = "";
}

// --- 6. GİRİŞ VE DİĞERLERİ ---
function handleAuth() {
    const name = document.getElementById('name-input').value;
    if(!name) return alert("İsim yazmalısın.");
    myProfile.name = name;
    sentCode = "1234";
    alert("Kodunuz: 1234");
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('verify-form').classList.remove('hidden');
}

function handleVerify() {
    if (document.getElementById('verify-code').value === "1234") {
        document.getElementById('nav').classList.remove('hidden');
        showPage('home-page');
        startAuraAnalysis();
    }
}

function startAuraAnalysis() {
    const orb = document.getElementById('main-orb');
    orb.style.background = "linear-gradient(45deg, #9b59b6, #2193b0)";
    document.getElementById('aura-status').innerText = "Vibe Yakalandı!";
    renderVideos();
}

// Modal Kapatma Desteği
function closeDiscoverModal() { document.getElementById('discover-modal').classList.remove('active'); }
function openDiscoverModal() { document.getElementById('discover-modal').classList.add('active'); renderDiscoverList(); }
function renderDiscoverList() {
    const list = document.getElementById('discover-list');
    list.innerHTML = users.map(u => `<div class="chat-item" onclick="startNewChat(${u.id})"><b>${u.name}</b></div>`).join('');

}
// --- 7. EKSİK KALAN VE PROFİL FONKSİYONLARI ---
function loadMyProfile() {
    document.getElementById('my-profile-name').innerText = myProfile.name;
    document.getElementById('my-relationship-status').innerText = myProfile.status;
}

function publishVideo() {
    alert("Vibe Paylaşıldı!");
    showPage('feed-page');
}

function previewMyProfilePic(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('my-profile-pic').src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function openEditProfileModal() { document.getElementById('edit-profile-modal').classList.add('active'); }
function closeEditProfileModal() { document.getElementById('edit-profile-modal').classList.remove('active'); }

function saveProfileChanges() {
    myProfile.name = document.getElementById('modal-name-input').value || myProfile.name;
    myProfile.status = document.getElementById('modal-relationship-status').value;
    loadMyProfile();
    closeEditProfileModal();
}

function openProfilePreviewModal() {
    document.getElementById('profile-preview-modal').classList.add('active');
    document.getElementById('preview-profile-name').innerText = myProfile.name;
    document.getElementById('preview-relationship-status').innerText = myProfile.status;
}

function closeProfilePreviewModal() { document.getElementById('profile-preview-modal').classList.remove('active'); }
