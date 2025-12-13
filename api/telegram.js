export default async function handler(request, response) {
  // Получаем данные с фронтенда
  const { message } = request.body;
  
  // Берем секретные данные из переменных окружения (настроим на Vercel)
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return response.status(500).json({ error: 'Telegram config missing' });
  }

  try {
    // Отправляем запрос в Telegram
    const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown' // Чтобы работало форматирование жирным шрифтом
      })
    });

    if (tgResponse.ok) {
      return response.status(200).json({ success: true });
    } else {
      return response.status(400).json({ error: 'Telegram error' });
    }
  } catch (e) {
    return response.status(500).json({ error: e.message });
  }
}