# HIKJ backend

Backend ini menyediakan endpoint `GET /api/berita` dan `POST /api/chat`.
Integrasi WordPress dan OpenRouter dipisahkan ke service masing-masing agar
perubahan pada satu API tidak membuat server utama menjadi sulit dirawat.

## Menjalankan

1. Salin `.env.example` menjadi `.env` lalu isi `WORDPRESS_API_URL`.
2. Jalankan `npm run dev` dari folder `backend`.
3. Jalankan `npm run dev` dari folder `frontend` di terminal lain.

Frontend akan memanggil `/api/berita`; Vite meneruskannya ke backend di port
`3001`.

## Struktur backend

```text
config/env.mjs              environment dan header CORS
lib/http.mjs                parser request dan response JSON
routes/chat.mjs             validasi dan rate limit chatbot
routes/berita.mjs           handler endpoint berita
services/openrouter.mjs     komunikasi dengan OpenRouter
services/wordpress.mjs      komunikasi dengan WordPress REST API
server.mjs                  bootstrap server dan routing utama
```