# Bank Materi Edukasi Pasien

Satu file = satu topik. Halaman `index.html` menampilkan materi ini, dan link/QR hanya berisi kode topik (`?t=dm,ht,infus`).

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Halaman baca untuk pasien (`?t=...`). Tanpa kode di link hanya menampilkan ajakan scan QR. Pemilih materi + QR ada di aplikasi Catatan Lemon, menu **Edukasi** (pakai password) |
| `materi.js` | Gabungan semua file `.md`. **Dibuat otomatis, jangan diedit manual** |
| `perbarui-materi.html` | Alat untuk membuat ulang `materi.js` setiap kali file `.md` diubah |
| `lib/qrcode.js` | Pembuat QR (lisensi MIT, Kazuhiko Arase). Bekerja di HP sendiri, tanpa internet |
| `penyakit/`, `tindakan/` | File materi |

## Alur kerja

1. **Revisi materi**: edit file `.md`.
2. **Perbarui**: buka `perbarui-materi.html` di browser, pilih folder `edukasi`, unduh `materi.js`, lalu timpa file lama.
3. **Unggah**: commit folder `edukasi` ke repo `catatan-lemon` (GitHub Pages). Link lama tetap jalan dan otomatis menampilkan isi terbaru.

## Pengaturan nama situs

Buka `index.html`, cari bagian `PENGATURAN` di dekat awal skrip. Di situ ada `nama`, `penyusun`, dan `catatan` (teks di kaki halaman pasien).

## Kode topik jangan diganti

`id` yang sudah pernah dipakai di QR yang dicetak **jangan diganti namanya**. Kalau diganti, QR lama akan menampilkan "materi tidak ditemukan". Kalau ingin mengganti, tambahkan topik baru saja.

## Kata kunci (`kata:`)

Daftar kata dipisah koma, misalnya `kata: dbd, dhf, dengue`. Dipakai untuk dua hal:
1. **Pencarian** di menu Edukasi.
2. **Centang otomatis**: kalau salah satu kata muncul di diagnosis kerja (A) atau Plan pasien di CPPT, materinya langsung tercentang saat menu Edukasi dibuka. Kata dicocokkan utuh (bukan potongan kata), huruf besar-kecil tidak berpengaruh.

## Aturan format (supaya nanti gampang dituang ke HTML)

1. **Frontmatter wajib** di paling atas tiap file:
   ```
   ---
   id: dm                 # kode pendek, huruf kecil, tanpa spasi. Ini yang masuk ke link/QR
   judul: Diabetes (Kencing Manis)
   kategori: penyakit     # penyakit | tindakan
   untuk: pasien          # pasien | keluarga
   ringkas: Satu kalimat yang muncul di daftar pilihan
   status: draf           # draf | direview | final
   ---
   ```
2. **Judul bagian pakai `##`** dan urutannya seragam per kategori (lihat di bawah).
3. **Bagian tanda bahaya selalu diawali kata "Segera"** (misalnya "Segera ke IGD jika", "Segera panggil perawat jika", "Segera telepon 119 jika"), karena nanti di HTML semua judul yang diawali "Segera" otomatis diberi kotak merah.
4. **Catatan untuk dokter** (angka yang perlu dicek, kebijakan RS) ditulis sebagai komentar `<!-- cek: ... -->`. Tidak tampil di layar pasien.
5. **Bahasa:** sapaan "Bapak/Ibu", kalimat pendek, tanpa singkatan medis. Kalau istilah medis terpaksa dipakai, langsung diberi arti di kalimat yang sama.
6. **Jangan tulis dosis obat.** Cukup "sesuai resep dokter". Dosis bisa beda per pasien, dan materi ini dipakai banyak orang.

## Urutan bagian

**Penyakit:** Apa itu → Kenapa bisa terjadi → Yang perlu dilakukan di rumah → Obat → Makanan dan minuman → Segera ke IGD jika → Kontrol

**Tindakan:** Apa itu → Kenapa perlu → Bagaimana prosesnya → Apa yang akan dirasakan → Risiko → Yang perlu dijaga → Segera panggil perawat jika

## Daftar topik

### Penyakit
| Kode | Judul | Untuk |
|---|---|---|
| `dm` | Diabetes (Kencing Manis) | pasien |
| `hiperglikemia` | Gula Darah Terlalu Tinggi (Krisis Gula) | pasien |
| `ht` | Hipertensi (Darah Tinggi) | pasien |
| `pjk` | Penyakit Jantung Koroner / Serangan Jantung | pasien |
| `chf` | Gagal Jantung | pasien |
| `aki` | Gangguan Ginjal Mendadak | pasien |
| `ckd` | Penyakit Ginjal Kronis | pasien |
| `dbd` | Demam Berdarah Dengue | pasien |
| `tifus` | Demam Tifoid (Tifus) | pasien |
| `gout` | Asam Urat Tinggi dan Serangan Gout | pasien |
| `dislipidemia` | Kolesterol Tinggi | pasien |
| `syok` | Syok | keluarga |

### Tindakan
| Kode | Judul | Untuk |
|---|---|---|
| `infus` | Infus | pasien |
| `ngt` | Selang Makan Lewat Hidung (NGT) | keluarga |
| `dc` | Selang Kencing (Kateter Urin) | pasien |
| `cvc` | Infus Pembuluh Besar (Kateter Vena Sentral) | keluarga |
| `cdl` | Selang Cuci Darah (Kateter Double Lumen) | pasien |
| `intubasi` | Selang Napas dan Mesin Bantu Napas | keluarga |
| `rjp` | Resusitasi Jantung Paru dan Kejut Listrik di RS | keluarga |
| `dnr` | Keputusan Tidak Dilakukan Resusitasi | keluarga |
| `rjp-awam` | Pertolongan Pertama Henti Jantung di Rumah | keluarga |
| `hd` | Cuci Darah Rutin (Hemodialisis) | pasien |
| `hd-supportif` | Cuci Darah Sementara (Darurat) | keluarga |
