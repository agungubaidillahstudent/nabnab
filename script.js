// Inisialisasi variabel global
let currentPhotoId = 1;
const totalPhotos = 6;

// Data foto untuk galeri
const photos = {
  1: {
    title: "Perayaan Ulang Tahun",
    description:
      "Putri Nabila merayakan ulang tahun ke-21 bersama teman-teman terdekatnya.",
    color: "linear-gradient(135deg, #ffb6c1, #ffccd5)",
    icon: "fas fa-birthday-cake",
  },
  2: {
    title: "Moment Bahagia",
    description: "Senyuman indah Putri Nabila di hari yang cerah.",
    color: "linear-gradient(135deg, #a7c7e7, #c1d5f0)",
    icon: "fas fa-smile-beam",
  },
  3: {
    title: "Bersama Teman",
    description:
      "Kebersamaan yang penuh canda dan tawa bersama sahabat-sahabat terbaik.",
    color: "linear-gradient(135deg, #c9e4c5, #d8f3dc)",
    icon: "fas fa-users",
  },
  4: {
    title: "Prestasi Akademik",
    description:
      "Putri Nabila menerima penghargaan atas prestasi akademiknya yang gemilang.",
    color: "linear-gradient(135deg, #ffd6a5, #ffecd1)",
    icon: "fas fa-graduation-cap",
  },
  5: {
    title: "Momen Spesial",
    description: "Detik-detik berharga dalam kehidupan Putri Nabila.",
    color: "linear-gradient(135deg, #cdb4db, #e0c3fc)",
    icon: "fas fa-star",
  },
  6: {
    title: "Kenangan Indah",
    description: "Momen penuh kasih sayang yang akan selalu dikenang.",
    color: "linear-gradient(135deg, #ffafcc, #ffc8dd)",
    icon: "fas fa-heart",
  },
};

// Fungsi untuk memulai konfetti
function startConfetti() {
  const confettiContainer = document.getElementById("confetti-container");
  const colors = [
    "#e91e63",
    "#ff4081",
    "#ff9800",
    "#4caf50",
    "#2196f3",
    "#9c27b0",
  ];

  // Hapus konfetti sebelumnya jika ada
  confettiContainer.innerHTML = "";

  // Buat konfetti baru
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Warna acak
    const color = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.backgroundColor = color;

    // Posisi awal acak
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";

    // Ukuran acak
    const size = Math.random() * 10 + 5;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";

    // Animasi jatuh
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;
    confetti.style.animation = `fall ${duration}s linear ${delay}s infinite`;

    // Tambahkan keyframes untuk animasi jatuh
    const style = document.createElement("style");
    style.textContent = `
            @keyframes fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);

    confettiContainer.appendChild(confetti);

    // Hapus konfetti setelah selesai
    setTimeout(() => {
      confetti.remove();
    }, (duration + delay) * 1000);
  }
}

// Fungsi untuk kontrol musik
function setupMusicControls() {
  const audio = document.getElementById("birthdaySong");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const stopBtn = document.getElementById("stopBtn");
  const volumeUpBtn = document.getElementById("volumeUpBtn");
  const volumeDownBtn = document.getElementById("volumeDownBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const musicStatus = document.getElementById("musicStatus");

  // Event listener untuk tombol putar
  playBtn.addEventListener("click", () => {
    audio.play();
    musicStatus.textContent = "Memutar lagu ulang tahun";
    musicStatus.style.color = "#4caf50";
  });

  // Event listener untuk tombol jeda
  pauseBtn.addEventListener("click", () => {
    audio.pause();
    musicStatus.textContent = "Lagu dijeda";
    musicStatus.style.color = "#ff9800";
  });

  // Event listener untuk tombol berhenti
  stopBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    musicStatus.textContent = "Lagu dihentikan";
    musicStatus.style.color = "#f44336";
  });

  // Event listener untuk tombol volume naik
  volumeUpBtn.addEventListener("click", () => {
    if (audio.volume < 1) {
      audio.volume = Math.min(1, audio.volume + 0.1);
      volumeSlider.value = audio.volume;
      updateVolumeStatus();
    }
  });

  // Event listener untuk tombol volume turun
  volumeDownBtn.addEventListener("click", () => {
    if (audio.volume > 0) {
      audio.volume = Math.max(0, audio.volume - 0.1);
      volumeSlider.value = audio.volume;
      updateVolumeStatus();
    }
  });

  // Event listener untuk slider volume
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
    updateVolumeStatus();
  });

  // Fungsi untuk memperbarui status volume
  function updateVolumeStatus() {
    const volumePercent = Math.round(audio.volume * 100);
    musicStatus.textContent = `Volume: ${volumePercent}%`;
  }

  // Update status saat lagu berakhir
  audio.addEventListener("ended", () => {
    musicStatus.textContent = "Lagu selesai diputar";
    musicStatus.style.color = "#666";
  });
}

// Fungsi untuk membuka kado
function setupGiftBox() {
  const giftBox = document.getElementById("giftBox");
  const giftContent = document.getElementById("giftContent");
  const giftLid = document.querySelector(".gift-lid");
  const giftLabel = document.querySelector(".gift-label");

  let isOpened = false;

  giftBox.addEventListener("click", () => {
    if (!isOpened) {
      // Buka kado
      giftLid.style.transform = "rotateX(180deg) translateY(-40px)";
      giftContent.classList.add("show");
      giftLabel.textContent = "Terbuka!";
      giftLabel.style.backgroundColor = "#4caf50";

      // Mulai konfetti
      startConfetti();

      // Putar musik otomatis saat kado dibuka
      const audio = document.getElementById("birthdaySong");
      audio.play();
      document.getElementById("musicStatus").textContent =
        "Memutar lagu ulang tahun";
      document.getElementById("musicStatus").style.color = "#4caf50";

      isOpened = true;
    } else {
      // Tutup kado
      giftLid.style.transform = "rotateX(0) translateY(0)";
      giftContent.classList.remove("show");
      giftLabel.textContent = "Klik Lagi!";
      giftLabel.style.backgroundColor = "#e91e63";

      isOpened = false;
    }
  });
}

// Fungsi untuk galeri foto
function setupGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("photoModal");
  const closeModal = document.querySelector(".close-modal");
  const prevPhotoBtn = document.getElementById("prevPhoto");
  const nextPhotoBtn = document.getElementById("nextPhoto");

  // Event listener untuk setiap item galeri
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const photoId = parseInt(item.getAttribute("data-id"));
      currentPhotoId = photoId;
      openModal(photoId);
    });
  });

  // Event listener untuk tombol tutup modal
  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Event listener untuk klik di luar modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  // Event listener untuk tombol sebelumnya
  prevPhotoBtn.addEventListener("click", () => {
    currentPhotoId = currentPhotoId > 1 ? currentPhotoId - 1 : totalPhotos;
    openModal(currentPhotoId);
  });

  // Event listener untuk tombol selanjutnya
  nextPhotoBtn.addEventListener("click", () => {
    currentPhotoId = currentPhotoId < totalPhotos ? currentPhotoId + 1 : 1;
    openModal(currentPhotoId);
  });

  // Event listener untuk keyboard
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("show")) {
      if (e.key === "Escape") {
        modal.classList.remove("show");
      } else if (e.key === "ArrowLeft") {
        currentPhotoId = currentPhotoId > 1 ? currentPhotoId - 1 : totalPhotos;
        openModal(currentPhotoId);
      } else if (e.key === "ArrowRight") {
        currentPhotoId = currentPhotoId < totalPhotos ? currentPhotoId + 1 : 1;
        openModal(currentPhotoId);
      }
    }
  });

  // Fungsi untuk membuka modal dengan foto tertentu
  function openModal(photoId) {
    const photo = photos[photoId];
    const modalPhoto = document.getElementById("modalPhoto");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");

    // Update konten modal
    modalTitle.textContent = photo.title;
    modalDescription.textContent = photo.description;

    // Buat elemen foto
    modalPhoto.innerHTML = `
            <div class="modal-photo-img" style="background: ${photo.color};">
                <i class="${photo.icon}"></i>
            </div>
        `;

    // Tampilkan modal
    modal.classList.add("show");
  }
}

// Fungsi untuk animasi tambahan
function setupAnimations() {
  // Animasi untuk kue ulang tahun
  const candleFlame = document.querySelector(".flame");
  setInterval(() => {
    candleFlame.style.transform = `scale(${0.9 + Math.random() * 0.3})`;
  }, 300);

  // Animasi untuk balon
  const balloons = document.querySelectorAll(".balloon");
  balloons.forEach((balloon, index) => {
    setInterval(() => {
      balloon.style.transform = `translateY(${
        Math.sin(Date.now() / 1000 + index) * 20
      }px)`;
    }, 50);
  });
}

// Fungsi untuk mengatur tanggal di footer
function setupFooterDate() {
  const footerDate = document.querySelector(".footer-date");
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = now.toLocaleDateString("id-ID", options);
  footerDate.textContent = formattedDate;
}

// Inisialisasi semua fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  setupMusicControls();
  setupGiftBox();
  setupGallery();
  setupAnimations();
  setupFooterDate();

  // Mulai dengan sedikit konfetti
  setTimeout(startConfetti, 1000);

  console.log("Website Ulang Tahun Putri Nabila siap digunakan!");
  console.log("Selamat ulang tahun ke-21, Putri Nabila!");
});
