# Panduan Menulis Artikel untuk Website Lex Lingua
# Article Writing Guide for Lex Lingua Website

---

## Struktur File Artikel / Article File Structure

Setiap artikel disimpan sebagai file `.md` (Markdown) di folder:
```
src/data/articles/
```

### Penamaan File / File Naming
- Gunakan huruf kecil dan tanda hubung (`-`) sebagai pemisah kata
- Contoh: `cara-translate-dokumen-resmi.md`

---

## Format Artikel / Article Format

Setiap file artikel terdiri dari 2 bagian:
1. **Frontmatter** — metadata di bagian atas (diapit `---`)
2. **Konten** — isi artikel dalam format Markdown

### Template Lengkap / Complete Template:

```markdown
---
slug: "judul-artikel-anda"
title: "Judul Artikel dalam Bahasa Indonesia"
title_en: "Article Title in English"
excerpt: "Ringkasan singkat artikel dalam 1-2 kalimat (Bahasa Indonesia)."
excerpt_en: "Brief summary of the article in 1-2 sentences (English)."
author: "Nama Penulis"
date: "2026-01-15"
category: "Legal"
coverImage: "/images/articles/nama-gambar.jpg"
readingTime: 5
tags: ["tag1", "tag2", "tag3"]
---

## Subjudul Pertama

Paragraf pertama artikel Anda...

## Subjudul Kedua

Paragraf berikutnya...

### Sub-subjudul

- Poin pertama
- Poin kedua
- Poin ketiga

## Kesimpulan

Paragraf penutup...
```

---

## Penjelasan Frontmatter

| Field | Wajib? | Keterangan |
|-------|--------|------------|
| `slug` | Ya | URL artikel (huruf kecil, pakai tanda hubung). Contoh: `tips-legalisasi` → url: `/blog/tips-legalisasi` |
| `title` | Ya | Judul dalam Bahasa Indonesia |
| `title_en` | Tidak | Judul dalam Bahasa Inggris (untuk pengunjung EN) |
| `excerpt` | Ya | Ringkasan 1-2 kalimat (Bahasa Indonesia), ditampilkan di kartu artikel |
| `excerpt_en` | Tidak | Ringkasan dalam Bahasa Inggris |
| `author` | Ya | Nama penulis (contoh: "Tim Lex Lingua", "Prof. Annalisa Y") |
| `date` | Ya | Tanggal publikasi format: `YYYY-MM-DD` |
| `category` | Ya | Kategori: `Legal`, `Academic`, `Business`, atau `Medical` |
| `coverImage` | Ya | Path gambar sampul. Simpan gambar di `public/images/articles/` |
| `readingTime` | Ya | Estimasi waktu baca dalam menit (angka bulat) |
| `tags` | Tidak | Array tag untuk pencarian, format: `["tag1", "tag2"]` |

---

## Format Konten Markdown

### Heading / Judul
```markdown
## Heading 2 (gunakan ini untuk judul section)
### Heading 3 (sub-section)
#### Heading 4 (detail)
```
> **Catatan:** Jangan gunakan `# Heading 1` dalam konten. H1 sudah digunakan oleh judul artikel.

### Teks Biasa
```markdown
Ini adalah paragraf biasa. Tulis saja seperti biasa.

Baris kosong memisahkan antar paragraf.
```

### Bold & Italic
```markdown
**teks tebal** untuk penekanan
*teks miring* untuk istilah atau penekanan ringan
```

### Daftar / List
```markdown
- Item pertama
- Item kedua
- Item ketiga

1. Langkah pertama
2. Langkah kedua
3. Langkah ketiga
```

### Kutipan / Blockquote
```markdown
> Ini adalah kutipan atau catatan penting yang ingin ditonjolkan.
```

### Link
```markdown
[Teks link](https://example.com)
```

### Gambar di dalam Artikel
```markdown
![Deskripsi gambar](/images/articles/nama-gambar.jpg)
```
Simpan gambar di folder `public/images/articles/`.

---

## Menambah Gambar Sampul

1. Siapkan gambar dengan rasio **16:9** (contoh: 1200×675 pixel)
2. Simpan di folder `public/images/articles/`
3. Referensi di frontmatter: `coverImage: "/images/articles/nama-file.jpg"`

---

## Kategori yang Tersedia

| Kategori | Untuk Topik |
|----------|-------------|
| `Legal` | Terjemahan dokumen hukum, legalisasi, kontrak |
| `Academic` | Jurnal ilmiah, tesis, publikasi akademik |
| `Business` | Dokumen bisnis, MoU, laporan korporasi |
| `Medical` | Dokumen medis, farmasi, rekam medis |

---

## Contoh Artikel Sederhana

Simpan sebagai `src/data/articles/pentingnya-penerjemah-tersumpah.md`:

```markdown
---
slug: "pentingnya-penerjemah-tersumpah"
title: "Pentingnya Menggunakan Penerjemah Tersumpah"
title_en: "The Importance of Using Sworn Translators"
excerpt: "Mengapa dokumen resmi harus diterjemahkan oleh penerjemah tersumpah?"
excerpt_en: "Why must official documents be translated by sworn translators?"
author: "Tim Lex Lingua"
date: "2026-06-01"
category: "Legal"
coverImage: "/images/articles/sworn-translator.jpg"
readingTime: 4
tags: ["penerjemah tersumpah", "dokumen resmi", "legal"]
---

## Apa Itu Penerjemah Tersumpah?

Penerjemah tersumpah adalah penerjemah yang telah disumpah...

## Kapan Anda Membutuhkannya?

Anda memerlukan penerjemah tersumpah ketika...

## Kesimpulan

Menggunakan penerjemah tersumpah bukan hanya formalitas...
```

---

## Tips Menulis Artikel yang Baik

1. **Judul menarik** — Gunakan angka atau pertanyaan (contoh: "5 Tips...", "Mengapa...?")
2. **Ringkas dan informatif** — Paragraf pendek, 3-4 kalimat
3. **Gunakan subjudul** — Bagi artikel menjadi section yang jelas
4. **Tambahkan CTA** — Ajak pembaca untuk konsultasi di akhir artikel
5. **SEO-friendly** — Gunakan kata kunci yang relevan secara alami
