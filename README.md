# Kinoko Komori

**Kinoko Komori** adalah sebuah bot WhatsApp yang dikembangkan oleh **Zaenishi**. Proyek ini dibuat dengan tujuan memberikan kemudahan dalam otomatisasi berbagai fungsi di WhatsApp, dengan antarmuka yang ramah pengguna dan fleksibel untuk dikembangkan.

## Fitur Utama
- **Responsif**: Menjawab perintah dengan cepat dan akurat.
- **Modular**: Mudah menambahkan fitur baru.
- **Konfigurasi Mudah**: Semua pengaturan dapat diubah dengan cepat melalui file `setting.js`.

---

## Instalasi

1. **Clone repository** ini ke perangkat Anda:
    ```bash
    git clone https://github.com/zaenishi/kinoko.git
    cd kinoko
    ```

2. **Instal dependensi** yang diperlukan:
    ```bash
    npm install
    ```

3. **Konfigurasi awal**:
    - Buka file `setting.js` untuk menyesuaikan pengaturan seperti API key, nama bot, dll.

4. **Jalankan bot**:
    ```bash
    node index.js
    ```

---

## Menambahkan Fitur Baru

1. Buka file `system/cmd.js`.
2. Tambahkan blok kode berikut di dalam file tersebut sesuai dengan kategori fitur yang diinginkan:

    ```javascript
    // category: MAIN (category untuk menu)
    case "ping":
        sock.reply(m.key.remoteJid, { text: "Pong!" }, { quoted: m });
        break;
    ```

3. **Keterangan kode**:
    ```
    - `category`: Tentukan kategori fitur (misalnya: UTILITY, FUN, ADMIN).
    - `case "ping":`: Ganti `"ping"` dengan perintah yang diinginkan.
    - `sock.reply(...)`: Tulis respons bot yang akan dikirim.
    ```

4. Simpan file `cmd.js` dan restart bot untuk melihat perubahan.

---

## Struktur Folder

```plaintext
- system/cmd.js: Tempat untuk menambahkan atau mengubah fitur bot.
- setting.js: File untuk pengaturan global bot.
- index.js: File utama untuk menjalankan bot.
