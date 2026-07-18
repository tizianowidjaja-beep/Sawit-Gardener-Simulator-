// Database Kode Redeem Lokal & Riwayat Pemain
const DAFTAR_KODE = {
    "SAWITKEREN2045": {
        hadiah: "🎁 1x Nusantara Exo-Suit, 1 Unit Solar-Drone V3, & 2.045 Golden Seeds!",
        bonusEco: 0
    },
    "CintaSAWIT_IDN": {
        hadiah: "🎁 5x Bibit Unggul Marihat Premium & 1 Pasang Owl Guardian!",
        bonusEco: 100
    }
};

// Menyimpan riwayat kode yang sudah diklaim oleh pemain saat ini
let kodeTerpakai = [];

function prosesKlaim() {
    const inputField = document.getElementById("redeem-input");
    const msgBox = document.getElementById("notification-message");
    const ecoValSpan = document.getElementById("eco-val");
    
    // Ambil teks input, hilangkan spasi kosong, dan ubah ke huruf besar agar tidak sensitif huruf kapital
    const kodeUser = inputField.value.trim();

    // Reset status kotak pesan
    msgBox.className = "message hidden";

    // Validasi 1: Jika kolom input kosong
    if (kodeUser === "") {
        tampilkanPesan("Gagal: Kolom kode tidak boleh kosong!", "error");
        return;
    }

    // Validasi 2: Jika kode sudah pernah diklaim sebelumnya
    if (kodeTerpakai.includes(kodeUser)) {
        tampilkanPesan("Gagal: Anda sudah pernah mengklaim kode ini sebelumnya!", "error");
        return;
    }

    // Validasi 3: Cek apakah kode cocok dengan database
    if (DAFTAR_KODE.hasOwnProperty(kodeUser)) {
        const dataHadiah = DAFTAR_KODE[kodeUser];
        
        // Tambahkan kode ke riwayat agar tidak bisa diklaim lagi
        kodeTerpakai.push(kodeUser);
        
        // Eksekusi efek hadiah (Contoh: Menambah Eco-Score jika ada)
        if (dataHadiah.bonusEco > 0) {
            let currentEco = parseInt(ecoValSpan.innerText);
            ecoValSpan.innerText = currentEco + dataHadiah.bonusEco;
        }

        // Tampilkan pesan sukses ke layar
        tampilkanPesan(`Sukses! Hadiah Berhasil Dikirim:<br><strong>${dataHadiah.hadiah}</strong>`, "success");
        
        // Bersihkan kolom input setelah berhasil
        inputField.value = "";
    } else {
        // Jika kode salah atau tidak terdaftar
        tampilkanPesan("Gagal: Kode salah, tidak valid, atau sudah kedaluwarsa!", "error");
    }
}

// Fungsi pembantu untuk memunculkan kotak notifikasi
function tampilkanPesan(teks, tipe) {
    const msgBox = document.getElementById("notification-message");
    msgBox.innerHTML = teks;
    msgBox.classList.remove("hidden");
    msgBox.classList.add(tipe);
}
