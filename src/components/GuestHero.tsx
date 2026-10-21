import React from 'react';
import { useHotel } from '../context/HotelContext';
import { HERO_IMAGE } from '../data/mockHotelData';
import { Calendar, Users, SlidersHorizontal, Sparkles } from 'lucide-react';

export const GuestHero: React.FC = () => {
  const { filterState, setFilterState } = useHotel();

  // Compute stay nights
  const checkInDate = new Date(filterState.checkIn);
  const checkOutDate = new Date(filterState.checkOut);
  const diffTime = Math.max(0, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  const handleDateChange = (field: 'checkIn' | 'checkOut', val: string) => {
    setFilterState(prev => {
      const next = { ...prev, [field]: val };
      // Ensure checkout is after checkin
      if (field === 'checkIn' && next.checkOut <= val) {
        const d = new Date(val);
        d.setDate(d.getDate() + 2);
        next.checkOut = d.toISOString().split('T')[0];
      }
      return next;
    });
  };

  const handleScrollToSuites = () => {
    const el = document.getElementById('suites');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-12 pb-16 px-6 overflow-hidden">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Solaria Haven sunset infinity pool pavilion overlooking ocean"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/50 to-[#1C1917]/20" />
      </div>

      {/* Top Editorial Kicker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8">
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] text-[#ECE6DC] uppercase font-medium">
          <span>Costa Careyes Bluff</span>
          <span aria-hidden="true" className="text-[#9C532B]">·</span>
          <span>Twelve Private Sanctuaries</span>
          <span aria-hidden="true" className="text-[#9C532B]">·</span>
          <span>Pacific Horizon</span>
        </div>
      </div>

      {/* Hero Headline & Value Narrative */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#FAF8F5] leading-[1.08] tracking-tight text-balance">
            Where the azure sea meets solitude and quiet majesty.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#E7E1D8] font-light leading-relaxed max-w-2xl">
            A private coastal refuge carved into golden limestone bluffs. Tailored for those who seek unhurried days, bespoke oceanfront dining, and discreet personal hospitality.
          </p>
        </div>
      </div>

      {/* Integrated Availability Booking Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="bg-[#FAF8F5] border border-[#E7E1D8] rounded-xl p-4 sm:p-5 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            {/* Check-in */}
            <div className="flex flex-col gap-1 border-b sm:border-b-0 sm:border-r border-[#E7E1D8] pb-3 sm:pb-0 sm:pr-4">
              <label className="text-[11px] font-semibold tracking-wider text-[#78716C] uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#9C532B]" />
                <span>Check-In</span>
              </label>
              <input
                type="date"
                value={filterState.checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => handleDateChange('checkIn', e.target.value)}
                className="w-full text-sm font-medium text-[#1C1917] bg-transparent focus:outline-none cursor-pointer"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col gap-1 border-b sm:border-b-0 sm:border-r border-[#E7E1D8] pb-3 sm:pb-0 sm:pr-4">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold tracking-wider text-[#78716C] uppercase flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#9C532B]" />
                  <span>Check-Out</span>
                </label>
                <span className="text-[11px] font-mono text-[#9C532B] tabular-nums">
                  {nights} {nights === 1 ? 'Night' : 'Nights'}
                </span>
              </div>
              <input
                type="date"
                value={filterState.checkOut}
                min={filterState.checkIn}
                onChange={(e) => handleDateChange('checkOut', e.target.value)}
                className="w-full text-sm font-medium text-[#1C1917] bg-transparent focus:outline-none cursor-pointer"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-1 border-b lg:border-b-0 lg:border-r border-[#E7E1D8] pb-3 lg:pb-0 lg:pr-4">
              <label className="text-[11px] font-semibold tracking-wider text-[#78716C] uppercase flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#9C532B]" />
                <span>Guests</span>
              </label>
              <select
                value={filterState.guests}
                onChange={(e) => setFilterState(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                className="w-full text-sm font-medium text-[#1C1917] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Solo Guest</option>
                <option value={2}>2 Guests (Couple)</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests (Family/Pair)</option>
                <option value={6}>6 Guests (Villa/Penthouse)</option>
              </select>
            </div>

            {/* Suite Category */}
            <div className="flex flex-col gap-1 border-b lg:border-b-0 lg:border-r border-[#E7E1D8] pb-3 lg:pb-0 lg:pr-4">
              <label className="text-[11px] font-semibold tracking-wider text-[#78716C] uppercase flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#9C532B]" />
                <span>Sanctuary Tier</span>
              </label>
              <select
                value={filterState.tier}
                onChange={(e) => setFilterState(prev => ({ ...prev, tier: e.target.value }))}
                className="w-full text-sm font-medium text-[#1C1917] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Villa">Private Villas</option>
                <option value="Pavilion">Cliffside Pavilions</option>
                <option value="Suite">Terrace Suites</option>
                <option value="Penthouse">Royal Penthouse</option>
              </select>
            </div>

            {/* Action CTA */}
            <div className="flex items-center">
              <button
                onClick={handleScrollToSuites}
                className="w-full py-3 px-6 bg-[#2E3D2E] text-white hover:bg-[#1E2B1E] text-xs font-semibold tracking-wider uppercase rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Find Suites</span>
                <span className="text-[#ECE6DC] font-mono tabular-nums">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
