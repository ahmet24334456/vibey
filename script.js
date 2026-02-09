let followerCount = 0;
let myProfile = { name: "Kullanıcı", status: "Vibe Aranıyor" };

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    if(pageId === 'profile-page') updateProfileDisplay();
}

function handleAuth() {
    const name = document.getElementById('name-input').value;
    if(!name) return;
    myProfile.name = name;
    alert("Kodunuz: 1234");
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('verify-form').classList.remove('hidden');
}

function handleVerify() {
    document.getElementById('nav').classList.remove('hidden');
    showPage('feed-page');
    renderVideos();
}

function renderVideos() {
    const container = document.getElementById('video-container');
    container.innerHTML = `
        <div class="video-card">
            <div class="v-sidebar">
                <div class="v-action" onclick="toggleLike(this)"><i class="fas fa-heart"></i><br><span>0</span></div>
                <button class="f-btn" onclick="toggleFollow(this)">Takip Et</button>
            </div>
        </div>`;
}

function toggleLike(el) {
    const span = el.querySelector('span');
    let count = parseInt(span.innerText);
    el.classList.toggle('active');
    if(el.classList.contains('active')) {
        span.innerText = count + 1;
        el.style.color = '#ff3366';
    } else {
        span.innerText = count - 1;
        el.style.color = '#fff';
    }
}

function toggleFollow(btn) {
    if(btn.innerText === "Takip Et") {
        btn.innerText = "Takiptesin";
        btn.style.background = "rgba(255,255,255,0.2)";
        followerCount++;
    } else {
        btn.innerText = "Takip Et";
        btn.style.background = "transparent";
        followerCount--;
    }
    updateProfileDisplay();
}

function updateProfileDisplay() {
    document.getElementById('my-profile-name').innerText = myProfile.name;
    document.getElementById('follower-count').innerText = followerCount;
}
