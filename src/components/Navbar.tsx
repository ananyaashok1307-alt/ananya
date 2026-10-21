import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Shield, Sparkles, Search, BedDouble } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, setIsLookupModalOpen, reservations } = useHotel();

  const activeReservationsCount = reservations.filter(r => r.status !== 'cancelled').length;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E1D8]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display serif) */}
        <button
          onClick={() => setActiveView('guest')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9C532B]"
        >
          <span className="font-serif text-2xl tracking-[0.2em] font-medium text-[#1C1917] uppercase block transition-colors group-hover:text-[#9C532B]">
            Solaria Haven
          </span>
          <span className="text-[10px] tracking-[0.25em] text-[#78716C] uppercase block -mt-1 font-sans">
            Boutique Ocean Sanctuary
          </span>
        </button>

        {/* Zone 2: 4 Single-line clean text links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-[#57534E]">
          <a
            href="#suites"
            onClick={(e) => {
              if (activeView !== 'guest') {
                e.preventDefault();
                setActiveView('guest');
                setTimeout(() => {
                  document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Suites &amp; Villas
          </a>
          <a
            href="#experiences"
            onClick={(e) => {
              if (activeView !== 'guest') {
                e.preventDefault();
                setActiveView('guest');
                setTimeout(() => {
                  document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Resort Add-Ons
          </a>
          <a
            href="#sanctuary"
            onClick={(e) => {
              if (activeView !== 'guest') {
                e.preventDefault();
                setActiveView('guest');
                setTimeout(() => {
                  document.getElementById('sanctuary')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            The Estate
          </a>
          <button
            onClick={() => setIsLookupModalOpen(true)}
            className="text-[#57534E] hover:text-[#1C1917] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#9C532B]" />
            <span>Find My Stay</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action / Staff Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center bg-[#ECE6DC] p-1 rounded-lg border border-[#DDD5C9]">
            <button
              onClick={() => setActiveView('guest')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'guest'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <BedDouble className="w-3.5 h-3.5" />
              <span>Guest Portal</span>
            </button>
            <button
              onClick={() => setActiveView('staff')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'staff'
                  ? 'bg-[#2E3D2E] text-white shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Staff Console</span>
              <span className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded ${
                activeView === 'staff' ? 'bg-[#3D4F3D] text-[#ECE6DC]' : 'bg-[#DDD5C9] text-[#57534E]'
              }`}>
                {activeReservationsCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
