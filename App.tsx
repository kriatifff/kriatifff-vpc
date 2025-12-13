import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookingWizard } from './components/BookingWizard';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'booking'>('home');

  return (
    <div className="min-h-screen bg-vamos-bg text-white font-sans selection:bg-vamos selection:text-white">
      <div className="max-w-md mx-auto bg-[#0c0c0c] min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        
        <Header 
          showBack={view === 'booking'} 
          onBack={() => setView('home')} 
        />

        <main className="flex-1 flex flex-col relative">
          {view === 'home' ? (
            <Hero onStartBooking={() => setView('booking')} />
          ) : (
            <BookingWizard onBack={() => setView('home')} />
          )}
        </main>

      </div>
    </div>
  );
};

export default App;