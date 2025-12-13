import React, { useState } from 'react';
import { BookingState, TariffType } from '../types';
import { RACKET_PRICE, TARIFFS } from '../constants';
import { DateTimeStep } from './BookingWizard/DateTimeStep';
import { TariffStep } from './BookingWizard/TariffStep';
import { ContactStep } from './BookingWizard/ContactStep';
import { SummaryStep } from './BookingWizard/SummaryStep';
import { Button } from './Button';
import { sendBookingToTelegram } from '../services/telegramService';

interface BookingWizardProps {
  onBack: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({ onBack }) => {
  const [bookingState, setBookingState] = useState<BookingState>({
    step: 1,
    selectedDate: new Date(),
    selectedSlots: [],
    tariff: TariffType.SINGLE,
    racketCount: 0,
    contactName: '',
    contactPhone: '',
    contactComment: '',
    isSubmitting: false,
    isSuccess: false
  });

  const updateState = (updates: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    if (bookingState.step === 4) {
      // Submit
      updateState({ isSubmitting: true });
      await sendBookingToTelegram(bookingState);
      updateState({ isSubmitting: false, isSuccess: true });
    } else {
      updateState({ step: bookingState.step + 1 });
    }
  };

  const handleBack = () => {
    if (bookingState.step === 1) {
      onBack();
    } else {
      updateState({ step: bookingState.step - 1 });
    }
  };

  // --- Validation ---
  const isStep1Valid = bookingState.selectedSlots.length > 0;
  const isStep3Valid = bookingState.contactName.length > 1 && bookingState.contactPhone.length > 5;
  
  const canProceed = () => {
    switch(bookingState.step) {
      case 1: return isStep1Valid;
      case 2: return true; // Tariff always has default
      case 3: return isStep3Valid;
      case 4: return !bookingState.isSubmitting && !bookingState.isSuccess;
      default: return false;
    }
  };

  // --- Price Calculation for Sticky Footer ---
  const getPricePreview = () => {
    const tariff = TARIFFS[bookingState.tariff];
    const durationHours = bookingState.selectedSlots.length * 0.5;
    const courtPrice = durationHours * tariff.pricePerHour;
    const racketPrice = bookingState.racketCount * RACKET_PRICE;
    return courtPrice + racketPrice;
  };

  const renderStep = () => {
    switch (bookingState.step) {
      case 1: return <DateTimeStep state={bookingState} onUpdate={updateState} />;
      case 2: return <TariffStep state={bookingState} onUpdate={updateState} />;
      case 3: return <ContactStep state={bookingState} onUpdate={updateState} />;
      case 4: return <SummaryStep state={bookingState} />;
      default: return null;
    }
  };

  const stepTitles = ["Время", "Тариф", "Контакты", "Итог"];

  if (bookingState.isSuccess) {
    return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-4">
            <SummaryStep state={bookingState} />
         </div>
         <div className="p-4 border-t border-white/5 bg-vamos-bg">
            <Button fullWidth onClick={onBack}>Вернуться на главную</Button>
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full relative">
      
      {/* Step Progress */}
      <div className="px-4 py-4 flex items-center justify-between">
         <div className="flex gap-2">
            {[1, 2, 3, 4].map(num => (
              <div 
                key={num} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  num <= bookingState.step ? 'w-8 bg-vamos' : 'w-4 bg-white/10'
                }`} 
              />
            ))}
         </div>
         <span className="text-xs uppercase font-bold text-vamos-gray tracking-wider">
           Шаг {bookingState.step} из 4
         </span>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-32">
        <h1 className="text-3xl font-display font-bold mb-6 mt-2">{stepTitles[bookingState.step - 1]}</h1>
        {renderStep()}
      </div>

      {/* Sticky Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-vamos-bg/90 backdrop-blur-xl border-t border-white/10 p-4 z-40">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="text-xs text-vamos-gray uppercase tracking-wider mb-0.5">Итого</div>
            <div className="text-xl font-display font-bold text-white">
              {getPricePreview().toLocaleString()} ₽
            </div>
          </div>
          <div className="w-1/2">
            <Button 
              fullWidth 
              onClick={handleNext} 
              disabled={!canProceed()}
            >
              {bookingState.step === 4 ? 'Забронировать' : 'Далее'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};