let followerCount = 0; // Gerçek sayaç

function toggleLike(el) {
    const span = el.querySelector('span');
    let count = parseInt(span.innerText);
    el.classList.toggle('active');
    
    if (el.classList.contains('active')) {
        span.innerText = count + 1;
    } else {
        span.innerText = count - 1;
    }
}

function toggleFollow(btn) {
    // Takipçi sayısını gösteren elementi bul
    const followerDisplay = document.getElementById('follower-count');

    if (btn.innerText === "Takip Et") {
        btn.innerText = "Takiptesin";
        btn.classList.add('following');
        followerCount++;
    } else {
        btn.innerText = "Takip Et";
        btn.classList.remove('following');
        followerCount--;
    }

    // Ekranda sayıyı güncelle
    if(followerDisplay) followerDisplay.innerText = followerCount;
}

// Sayfa yüklendiğinde videoları hazırla
window.onload = () => { renderVideos(); };

function renderVideos() {
    const container = document.getElementById('video-container');
    if(!container) return;
    container.innerHTML = `
        <div class="video-card">
            <div class="v-sidebar">
                <div class="v-action" onclick="toggleLike(this)">
                    <i class="fas fa-heart"></i><br><span>0</span>
                </div>
                <button class="f-btn" onclick="toggleFollow(this)">Takip Et</button>
            </div>
        </div>`;
}
