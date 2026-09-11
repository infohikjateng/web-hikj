# HIKJ backend

Backend ini menyediakan endpoint `GET /api/berita` dan mengambil data dari
WordPress REST API. URL WordPress disimpan di backend melalui environment
variable, bukan di browser.

## Menjalankan

1. Salin `.env.example` menjadi `.env` lalu isi `WORDPRESS_API_URL`.
2. Jalankan `npm run dev` dari folder `backend`.
3. Jalankan `npm run dev` dari folder `frontend` di terminal lain.

Frontend akan memanggil `/api/berita`; Vite meneruskannya ke backend di port
`3001`.