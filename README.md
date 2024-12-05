# Kinoko Komori

Selamat datang di **Kinoko Komori**, bot WhatsApp yang dikembangkan oleh **Zaenishi**. Bot ini dirancang untuk memberikan pengalaman otomatisasi WhatsApp yang fleksibel, responsif, dan mudah dikembangkan.

---

## ✨ Fitur Utama
- **Responsif**: Menjawab perintah dengan cepat.
- **Mudah Dikustomisasi**: Tambahkan fitur baru dengan mudah.
- **Pengaturan Sederhana**: Atur semua konfigurasi di file `setting.js`.

---

## 🚀 Instalasi

Ikuti langkah-langkah berikut untuk memulai:

1. **Clone repository**:
    ```bash
    git clone https://github.com/zaenishi/kinoko.git
    cd kinoko
    ```

2. **Instal dependensi**:
    ```bash
    npm install
    ```

3. **Konfigurasi awal**:
    - Edit file `setting.js` sesuai kebutuhan (contoh: owner, database, dsb).

4. **Jalankan bot**:
    ```bash
    node index.js
    ```

---

## 📚 Cara Menambahkan Fitur Baru

1. **Buka file `system/cmd.js`**.
2. **Tambahkan kode berikut** sesuai dengan kategori fitur yang diinginkan:

    ```javascript
    // category: MAIN
    case "ping":
        sock.reply(m.key.remoteJid, { text: "Pong!" }, { quoted: m });
        break;
    ```

3. **Penjelasan kode**:
    - `category`: Nama kategori untuk menu fitur (misal: UTILITY, FUN, ADMIN).
    - `case "ping":`: Perintah yang diketik oleh pengguna.
    - `sock.reply(...)`: Respons bot terhadap perintah tersebut.

4. **Simpan file** dan **restart bot** untuk melihat perubahan.

---

## 📂 Struktur Folder

```plaintext
kinoko/
├── setting.js         # Pengaturan global bot
├── index.js           # File utama untuk menjalankan bot
└── system/
    └── cmd.js         # Tambahkan atau ubah fitur bot di sini
