import React, { useMemo } from 'react';
import { BookingState, TimeSlot } from '../../types';
import { OPENING_HOUR, CLOSING_HOUR, SLOT_INTERVAL_MINUTES, MOCK_UNAVAILABLE_SLOTS } from '../../constants';
import { Calendar, Clock } from 'lucide-react';

interface DateTimeStepProps {
  state: BookingState;
  onUpdate: (updates: Partial<BookingState>) => void;
}

export const DateTimeStep: React.FC<DateTimeStepProps> = ({ state, onUpdate }) => {

  // Generate next 14 days
  const dates = useMemo(() => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  // Generate slots for the day
  const slots: TimeSlot[] = useMemo(() => {
    const arr: TimeSlot[] = [];
    let currentHour = OPENING_HOUR;
    let currentMinute = 0;

    while (currentHour < CLOSING_HOUR) {
      const timeStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      
      // Determine availability (simple mock logic + time check)
      let available = !MOCK_UNAVAILABLE_SLOTS.includes(timeStr);
      
      // If it's today, disable passed times
      const now = new Date();
      if (state.selectedDate.toDateString() === now.toDateString()) {
        const slotDate = new Date(state.selectedDate);
        slotDate.setHours(currentHour, currentMinute, 0, 0);
        if (slotDate < now) available = false;
      }

      // ONLY add if available. If occupied or passed, do not add to array.
      if (available) {
        arr.push({ time: timeStr, available });
      }

      currentMinute += SLOT_INTERVAL_MINUTES;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour++;
      }
    }
    return arr;
  }, [state.selectedDate]);

  const toggleSlot = (time: string) => {
    const isSelected = state.selectedSlots.includes(time);
    let newSlots = [...state.selectedSlots];

    if (isSelected) {
      newSlots = newSlots.filter(t => t !== time);
    } else {
      newSlots.push(time);
    }
    
    // Sort slots to ensure they are continuous later if we wanted validation, 
    // but requirement just says "allow multiple selection"
    newSlots.sort();
    
    onUpdate({ selectedSlots: newSlots });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Date Selector */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold flex items-center gap-2">
          <Calendar className="text-vamos" size={24} />
          Выберите дату
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
          {dates.map((date) => {
            const isSelected = date.toDateString() === state.selectedDate.toDateString();
            const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' });
            const dayNum = date.getDate();

            return (
              <button
                key={date.toISOString()}
                onClick={() => onUpdate({ selectedSlots: [], selectedDate: date })}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl border transition-all duration-200 ${
                  isSelected 
                    ? 'bg-vamos border-vamos text-white shadow-lg shadow-vamos/20' 
                    : 'bg-vamos-card border-white/5 text-vamos-gray hover:border-vamos/50 hover:text-white'
                }`}
              >
                <span className="text-xs uppercase font-medium mb-1">{dayName}</span>
                <span className="text-2xl font-bold font-display">{dayNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold flex items-center gap-2">
          <Clock className="text-vamos" size={24} />
          Выберите время
        </h2>
        <p className="text-sm text-vamos-gray">
          Можно выбрать несколько слотов подряд. Один слот = 30 минут.
        </p>
        
        {slots.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {slots.map((slot) => {
              const isSelected = state.selectedSlots.includes(slot.time);
              return (
                <button
                  key={slot.time}
                  onClick={() => toggleSlot(slot.time)}
                  className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-white text-black shadow-white/20 shadow-lg scale-105'
                      : 'bg-vamos-card text-white hover:bg-white/10'
                  }`}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="py-10 text-center bg-vamos-card/50 rounded-2xl border border-white/5">
             <p className="text-vamos-gray">На эту дату нет свободных слотов.</p>
          </div>
        )}
      </div>

      <div className="h-24"></div> {/* Spacer for sticky footer */}
    </div>
  );
};