import { BookingState } from '../types';
import { RACKET_PRICE, TARIFFS } from '../constants';

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

  try {
    // Отправляем данные на наш безопасный серверный API (Vercel Function)
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      console.error("Ошибка сервера при отправке:", response.status);
      throw new Error('Ошибка отправки на сервер');
    }
    
    const result = await response.json();
    return result.success === true;
    
  } catch (error) {
    console.error("Ошибка отправки заявки:", error);
    return false;
  }
};