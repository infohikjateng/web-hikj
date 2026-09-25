import { readJson, sendJson } from '../lib/http.mjs'
import { getChatAnswer } from '../services/openrouter.mjs'

const chatRequests = new Map()
const bankingKeywords = [
  'syariah', 'tabungan', 'deposito', 'pembiayaan', 'akad', 'nisbah', 'margin',
  'bprs', 'bank', 'rekening', 'produk', 'layanan', 'qurban', 'thr', 'simulasi',
]
const sensitivePattern = /\b(pin|otp|password|kata sandi|nomor rekening|nik|transaksi|saldo)\b/i
const outOfScopeMessage = 'Maaf, saya hanya dapat membantu pertanyaan seputar perbankan syariah dan layanan BPRS HIK Jawa Tengah.'
const sensitiveMessage = 'Demi keamanan, jangan kirim PIN, OTP, password, nomor rekening, NIK, saldo, atau data transaksi. Untuk bantuan lebih lanjut, silakan hubungi kantor melalui WhatsApp.'

function isBankingQuestion(message) {
  return bankingKeywords.some((keyword) => message.toLowerCase().includes(keyword))
}

function isRateLimited(request) {
  const address = request.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const recentRequests = (chatRequests.get(address) || []).filter((timestamp) => now - timestamp < 60_000)
  recentRequests.push(now)
  chatRequests.set(address, recentRequests)
  return recentRequests.length > 10
}

export function createChatRoute(config) {
  return async function chatRoute(request, response) {
    const headers = config.headers
    if (isRateLimited(request)) {
      sendJson(response, 429, { error: 'Terlalu banyak permintaan. Silakan coba lagi sebentar.' }, headers)
      return
    }

    try {
      const body = await readJson(request)
      const message = typeof body.message === 'string' ? body.message.trim().slice(0, 500) : ''
      const history = Array.isArray(body.history) ? body.history : []

      if (!message) {
        sendJson(response, 400, { error: 'Pertanyaan tidak boleh kosong' }, headers)
        return
      }
      if (sensitivePattern.test(message)) {
        sendJson(response, 200, { answer: sensitiveMessage }, headers)
        return
      }
      if (!isBankingQuestion(message)) {
        sendJson(response, 200, { answer: outOfScopeMessage }, headers)
        return
      }

      sendJson(response, 200, { answer: await getChatAnswer(message, history, config) }, headers)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Gagal memproses chat'
      sendJson(response, 502, { error: message }, headers)
    }
  }
}