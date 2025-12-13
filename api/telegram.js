export default async function handler(request, response) {
  // Логирование для отладки в панели Vercel
  console.log("Function /api/telegram called");

  const { message } = request.body;
  
  // Получаем ключи из переменных окружения Vercel
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Missing environment variables: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return response.status(500).json({ 
      error: 'Server configuration error', 
      details: 'Telegram secrets are not set in Vercel Environment Variables.' 
    });
  }

  try {
    const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const data = await tgResponse.json();

    if (tgResponse.ok) {
      console.log("Message sent to Telegram successfully");
      return response.status(200).json({ success: true });
    } else {
      console.error("Telegram API Error:", data);
      return response.status(400).json({ error: 'Telegram API Error', details: data });
    }
  } catch (e) {
    console.error("Fetch Error:", e);
    return response.status(500).json({ error: 'Internal Server Error', message: e.message });
  }
}