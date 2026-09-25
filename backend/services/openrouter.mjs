const outOfScopeMessage = 'Maaf, saya hanya dapat membantu pertanyaan seputar perbankan syariah dan layanan BPRS HIK Jawa Tengah.'

export async function getChatAnswer(message, history, config) {
  if (!config.openRouterApiKey) throw new Error('OPENROUTER_API_KEY belum dikonfigurasi di backend/.env')

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.openRouterApiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': config.siteUrl,
      'X-OpenRouter-Title': 'HIK Jawa Tengah - Asisten Informasi',
    },
    body: JSON.stringify({
      model: config.openRouterModel,
      temperature: 0.2,
      max_tokens: 400,
      messages: [
        {
          role: 'system',
          content: `Anda adalah asisten informasi PT BPRS HIK Jawa Tengah. ${outOfScopeMessage} Jangan menjawab riset, coding, berita umum, politik, atau topik lain di luar perbankan syariah. Jangan meminta atau memproses PIN, OTP, password, nomor rekening, NIK, saldo, atau data transaksi. Jangan memberi keputusan persetujuan pembiayaan. Untuk transaksi atau pengaduan, arahkan pengguna menghubungi kantor melalui WhatsApp. Jawab singkat, sopan, dan dalam bahasa Indonesia.`,
        },
        ...history.filter((item) => ['user', 'assistant'].includes(item.role)).slice(-6),
        { role: 'user', content: message },
      ],
    }),
  })

  const result = await response.json()
  if (!response.ok) throw new Error(result.error?.message || 'OpenRouter gagal memproses pertanyaan')
  return result.choices?.[0]?.message?.content || 'Maaf, saya belum dapat menemukan jawaban untuk pertanyaan tersebut.'
}