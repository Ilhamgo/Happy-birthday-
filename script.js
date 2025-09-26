document.addEventListener('DOMContentLoaded', () => {
    const openingScreen = document.getElementById('opening-screen');
    const openingText = document.getElementById('opening-text');
    const mainContent = document.getElementById('main-content');
    const surpriseButton = document.getElementById('surprise-button');
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.close-button');

    // --- 1. Opening Animation (Teks muncul pelan-pelan) ---
    function startOpeningAnimation() {
        // Tampilkan teks dengan opacity dan scale penuh
        openingText.style.opacity = 1;
        openingText.style.transform = 'scale(1)';

        // Jalankan efek confetti/balloon
        createConfetti(100); 

        // Setelah delay, hilangkan opening screen dan tampilkan konten utama
        setTimeout(() => {
            openingScreen.style.opacity = 0;
            setTimeout(() => {
                openingScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
            }, 1000); // Tunggu sampai transisi opacity selesai
        }, 3000); // Teks muncul selama 3 detik
    }

    // --- Fungsi Confetti Sederhana (simulasi balloon/confetti) ---
    function createConfetti(count) {
        const container = document.getElementById('confetti-container');
        const colors = ['#f7e8ec', '#c9939e', '#a46f7b', '#ffffff'];

        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'; // Bentuk bulat/kotak
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -10 + 'px';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Animasi jatuh (CSS animation lebih baik, tapi kita pakai JS untuk kesederhanaan)
            const duration = Math.random() * 3 + 2; // 2-5 detik
            confetti.style.transition = `transform ${duration}s linear, top ${duration}s linear, opacity 1s`;
            
            container.appendChild(confetti);

            setTimeout(() => {
                confetti.style.top = '100vh'; // Jatuh ke bawah
                confetti.style.transform += ` translateX(${Math.random() * 200 - 100}px)`; // Sedikit geser
                
                // Hapus setelah jatuh
                confetti.addEventListener('transitionend', () => {
                    confetti.remove();
                });
            }, 100);
        }
    }


    // --- 2. Tombol Kejutan dan Pop-up ---
    surpriseButton.addEventListener('click', () => {
        popup.classList.remove('hidden');
        createHeartRain(20); // Panggil animasi hati
    });

    closeButton.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    // Tutup pop-up ketika klik di luar kotak
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.add('hidden');
        }
    });

    // --- Animasi Hati Berjatuhan ---
    function createHeartRain(count) {
        const container = document.getElementById('heart-rain');
        container.innerHTML = ''; // Bersihkan hujan hati sebelumnya
        const heartColor = '#E96E87'; // Soft Red/Pink

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️'; // Unicode heart
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 30 + 15 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = -50 + 'px';
            heart.style.color = heartColor;
            
            const duration = Math.random() * 3 + 2; // 2-5 detik
            heart.style.transition = `transform ${duration}s linear, top ${duration}s linear, opacity 1s`;
            
            container.appendChild(heart);

            // Animasi jatuh
            setTimeout(() => {
                heart.style.top = '100%'; 
                heart.style.transform = `translateY(100vh) rotate(${Math.random() * 360}deg)`; 
                heart.style.opacity = 0;
                
                // Hapus setelah selesai jatuh
                heart.addEventListener('transitionend', () => {
                    heart.remove();
                });
            }, 50 * i); // Jeda kecil agar tampak berurutan
        }
    }

    // Jalankan animasi pembuka
    startOpeningAnimation();
});