import React from 'react';
import { BookingState } from '../../types';

interface ContactStepProps {
  state: BookingState;
  onUpdate: (updates: Partial<BookingState>) => void;
}

export const ContactStep: React.FC<ContactStepProps> = ({ state, onUpdate }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-1">
        <h2 className="text-xl font-display font-semibold">Контактные данные</h2>
        <p className="text-vamos-gray text-sm">Оставьте свои данные для подтверждения бронирования</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-vamos-gray ml-1">Ваше имя</label>
          <input
            type="text"
            value={state.contactName}
            onChange={(e) => onUpdate({ contactName: e.target.value })}
            placeholder="Иван Иванов"
            className="w-full bg-vamos-card border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-vamos focus:ring-1 focus:ring-vamos transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-vamos-gray ml-1">Номер телефона</label>
          <input
            type="tel"
            value={state.contactPhone}
            onChange={(e) => onUpdate({ contactPhone: e.target.value })}
            placeholder="+7 (999) 000-00-00"
            className="w-full bg-vamos-card border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-vamos focus:ring-1 focus:ring-vamos transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-vamos-gray ml-1">Комментарий (необязательно)</label>
          <textarea
            value={state.contactComment}
            onChange={(e) => onUpdate({ contactComment: e.target.value })}
            placeholder="Нужен тренер, первый раз играю..."
            rows={3}
            className="w-full bg-vamos-card border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-vamos focus:ring-1 focus:ring-vamos transition-all resize-none"
          />
        </div>
      </form>

      <div className="p-4 bg-vamos/10 rounded-xl border border-vamos/20 text-sm text-vamos-gray">
        Нажимая кнопку «Забронировать», вы соглашаетесь с правилами посещения клуба и обработкой персональных данных.
      </div>

      <div className="h-24"></div>
    </div>
  );
};