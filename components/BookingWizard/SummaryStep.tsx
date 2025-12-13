import React from 'react';
import { BookingState } from '../../types';
import { RACKET_PRICE, TARIFFS } from '../../constants';
import { CheckCircle2, Loader2, Calendar, Clock, Trophy, Phone } from 'lucide-react';

interface SummaryStepProps {
  state: BookingState;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({ state }) => {
  if (state.isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in zoom-in duration-500 text-center px-4">
        <div className="w-20 h-20 bg-vamos rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(109,160,158,0.5)]">
          <CheckCircle2 size={40} className="text-white" />
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Заявка отправлена!</h2>
        <p className="text-vamos-gray max-w-xs">
          Мы получили ваше бронирование. Администратор скоро свяжется с вами в Telegram для подтверждения.
        </p>
      </div>
    );
  }

  if (state.isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-300">
        <Loader2 size={48} className="text-vamos animate-spin mb-4" />
        <h3 className="text-xl font-display font-medium">Отправляем данные...</h3>
      </div>
    );
  }

  // Pre-submission Summary
  const tariff = TARIFFS[state.tariff];
  const durationHours = state.selectedSlots.length * 0.5;
  const courtPrice = durationHours * tariff.pricePerHour;
  const racketPrice = state.racketCount * RACKET_PRICE;
  const totalPrice = courtPrice + racketPrice;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-display font-semibold">Проверьте данные</h2>

      <div className="bg-vamos-card rounded-2xl border border-white/5 overflow-hidden">
        {/* Date/Time Section */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-start gap-3">
             <div className="bg-vamos/10 p-2 rounded-lg text-vamos">
                <Calendar size={20} />
             </div>
             <div>
               <div className="text-sm text-vamos-gray">Дата</div>
               <div className="font-semibold">{state.selectedDate.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
             </div>
          </div>
        </div>

        <div className="p-5 border-b border-white/5">
          <div className="flex items-start gap-3">
             <div className="bg-vamos/10 p-2 rounded-lg text-vamos">
                <Clock size={20} />
             </div>
             <div>
               <div className="text-sm text-vamos-gray">Время ({durationHours} ч.)</div>
               <div className="font-semibold flex flex-wrap gap-1">
                 {state.selectedSlots.sort().map(slot => (
                   <span key={slot} className="bg-white/5 px-2 py-0.5 rounded text-sm">{slot}</span>
                 ))}
               </div>
             </div>
          </div>
        </div>

        {/* Tariff Section */}
        <div className="p-5 border-b border-white/5">
           <div className="flex items-start gap-3">
             <div className="bg-vamos/10 p-2 rounded-lg text-vamos">
                <Trophy size={20} />
             </div>
             <div className="flex-1">
               <div className="text-sm text-vamos-gray">Тариф</div>
               <div className="font-semibold">{tariff.name}</div>
               <div className="flex justify-between mt-1 text-sm">
                 <span className="text-white/60">Корт ({durationHours} ч.)</span>
                 <span>{courtPrice.toLocaleString()} ₽</span>
               </div>
               {state.racketCount > 0 && (
                 <div className="flex justify-between mt-1 text-sm">
                   <span className="text-white/60">Ракетки ({state.racketCount} шт.)</span>
                   <span>+{racketPrice.toLocaleString()} ₽</span>
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="p-5">
           <div className="flex items-start gap-3">
             <div className="bg-vamos/10 p-2 rounded-lg text-vamos">
                <Phone size={20} />
             </div>
             <div>
               <div className="text-sm text-vamos-gray">Контакт</div>
               <div className="font-semibold">{state.contactName}</div>
               <div className="text-white/80">{state.contactPhone}</div>
             </div>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="bg-vamos/20 rounded-2xl p-5 border border-vamos/30 flex justify-between items-center">
        <span className="text-lg font-bold">Итого к оплате</span>
        <span className="text-2xl font-display font-bold text-vamos">{totalPrice.toLocaleString()} ₽</span>
      </div>

      <div className="h-24"></div>
    </div>
  );
};