import React from 'react';
import { Button } from './Button';
import { MapPin } from 'lucide-react';

interface HeroProps {
  onStartBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBooking }) => {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-700">
      
      {/* Decorative Circles (Simulated via SVG or CSS) */}
      <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-vamos/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-vamos/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center px-6 gap-6 z-10">
        
        <div className="space-y-4">
          <h1 className="text-4xl font-display font-bold leading-tight">
            Падел, который<br />
            легко <span className="text-vamos">полюбить</span>
          </h1>
          
          <div className="space-y-3 text-vamos-gray text-base leading-relaxed">
            <p>
              Современная площадка в Москве с качественным покрытием и оборудованием.
            </p>
            <p>
              Твой падел-клуб на Калужской: корты, турниры, события и комьюнити в одном месте: Научный пр. 6А
            </p>
          </div>
        </div>

        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-3 text-sm text-white/80">
            <div className="p-2 bg-vamos/10 rounded-full text-vamos">
              <MapPin size={18} />
            </div>
            <span>5 минут от метро «Калужская»</span>
          </div>
        </div>

        <div className="mt-4">
           <Button onClick={onStartBooking} className="w-full text-lg shadow-[0_0_40px_rgba(109,160,158,0.3)]">
             Забронировать корт
           </Button>
           <p className="text-center text-xs text-vamos-gray mt-4">
             Работаем ежедневно с 07:00 до 23:00
           </p>
        </div>
      </div>

      {/* Visual bottom graphic matching site vibe */}
      <div className="h-12 w-full bg-gradient-to-t from-vamos/20 to-transparent opacity-50" />
    </div>
  );
};