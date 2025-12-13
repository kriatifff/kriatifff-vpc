import React from 'react';
import { BookingState, TariffType } from '../../types';
import { TARIFFS, RACKET_PRICE } from '../../constants';
import { Users, Trophy, User, Plus, Minus } from 'lucide-react';

interface TariffStepProps {
  state: BookingState;
  onUpdate: (updates: Partial<BookingState>) => void;
}

export const TariffStep: React.FC<TariffStepProps> = ({ state, onUpdate }) => {

  const handleIncrementRacket = () => {
    onUpdate({ racketCount: state.racketCount + 1 });
  };

  const handleDecrementRacket = () => {
    if (state.racketCount > 0) {
      onUpdate({ racketCount: state.racketCount - 1 });
    }
  };

  const getIcon = (type: TariffType) => {
    switch (type) {
      case TariffType.SINGLE: return <User size={24} />;
      case TariffType.GROUP: return <Users size={24} />;
      case TariffType.TOURNAMENT: return <Trophy size={24} />;
      default: return <User size={24} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Tariffs */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold">Выберите тариф</h2>
        <div className="space-y-3">
          {Object.values(TARIFFS).map((tariff) => {
            const isSelected = state.tariff === tariff.id;
            return (
              <div
                key={tariff.id}
                onClick={() => onUpdate({ tariff: tariff.id })}
                className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-vamos/10 border-vamos'
                    : 'bg-vamos-card border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-vamos text-white' : 'bg-white/10 text-vamos-gray'}`}>
                    {getIcon(tariff.id)}
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-vamos border-2 border-black flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                
                <h3 className="font-display font-bold text-lg text-white mb-1">{tariff.name}</h3>
                <p className="text-sm text-vamos-gray mb-3">{tariff.description}</p>
                <div className="text-vamos font-semibold">
                  {tariff.pricePerHour.toLocaleString()} ₽ <span className="text-xs text-vamos-gray font-normal">/ час</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rackets */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold">Дополнительно</h2>
        
        <div className="bg-vamos-card border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white mb-1">Аренда ракетки</h3>
            <p className="text-sm text-vamos-gray">+{RACKET_PRICE} ₽ за шт.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-black/30 rounded-xl p-1.5">
            <button 
              onClick={handleDecrementRacket}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
              disabled={state.racketCount === 0}
            >
              <Minus size={16} />
            </button>
            <span className="font-bold w-4 text-center">{state.racketCount}</span>
            <button 
              onClick={handleIncrementRacket}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-vamos text-white hover:bg-vamos-dark active:scale-95 transition-all"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="h-24"></div>
    </div>
  );
};