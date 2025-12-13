import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showBack, onBack }) => {
  return (
    <header className="sticky top-0 z-50 bg-vamos-bg/80 backdrop-blur-md border-b border-white/5 py-4 px-4">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={onBack}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-wider text-white uppercase">
              VAMOS PADEL CLUB
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};