import { BookingState } from '../types';
import { RACKET_PRICE, TARIFFS } from '../constants';

// --- НАСТРОЙКИ ТЕЛЕГРАМ ---
const BOT_TOKEN = '8540952504:AAGWlL37SEy5deAYwndLzuz9ITW_c9cZsTo';

// ВАЖНО: Бот должен знать, куда отправлять сообщение (ID вашего личного чата или группы).
// Чтобы получить CHAT_ID:
// 1. Найдите своего бота в Telegram и нажмите Start (или добавьте его в группу).
// 2. Перейдите в браузере: https://api.telegram.org/bot8540952504:AAGWlL37SEy5deAYwndLzuz9ITW_c9cZsTo/getUpdates
// 3. Напишите боту любое сообщение. Обновите страницу в браузере.
// 4. Скопируйте число из поля "id" (например: 123456789 или -100123...) и вставьте ниже.
const CHAT_ID = ''; // <-- ВСТАВЬТЕ СЮДА ВАШ ID (в кавычках)

export const sendBookingToTelegram = async (data: BookingState): Promise<boolean> => {
  const tariff = TARIFFS[data.tariff];
  const durationHours = data.selectedSlots.length * 0.5;
  const courtPrice = durationHours * tariff.pricePerHour;
  const racketPrice = data.racketCount * RACKET_PRICE;
  const totalPrice = courtPrice + racketPrice;

  const dateStr = data.selectedDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const slotsStr = data.selectedSlots.sort().join(', ');

  const message = `
🎾 *НОВАЯ ЗАЯВКА VAMOS PADEL* 🎾

👤 *Имя:* ${data.contactName}
📞 *Телефон:* ${data.contactPhone}
📅 *Дата:* ${dateStr}
⏰ *Время:* ${slotsStr} (${durationHours} ч.)
🏆 *Тариф:* ${tariff.name}
🎾 *Ракетки:* ${data.racketCount} шт.
💬 *Комментарий:* ${data.contactComment || 'Нет'}

💰 *Итого:* ${totalPrice.toLocaleString('ru-RU')} ₽
  `.trim();

  // Проверка для тестирования
  if (!CHAT_ID) {
    alert(`ТЕСТОВЫЙ РЕЖИМ:\nТокен бота подключен!\n\nНо для отправки нужно указать CHAT_ID в файле services/telegramService.ts.\n\nДанные заявки:\n${message}`);
    console.log("Токен есть, но нет CHAT_ID. Сообщение не отправлено в API.");
    // Возвращаем true, чтобы интерфейс показал "Успех" (для теста визуальной части)
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
  }

  try {
    // Прямая отправка (Client-side) для тестирования
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram Error:", errorData);
      throw new Error(`Ошибка Telegram: ${errorData.description}`);
    }
    
    return true;
  } catch (error) {
    console.error("Ошибка отправки:", error);
    alert("Не удалось отправить сообщение в Telegram. Проверьте консоль.");
    return false;
  }
};