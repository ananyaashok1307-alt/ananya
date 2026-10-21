import React from 'react';
import { useHotel } from '../context/HotelContext';
import { X, Check, ArrowRight, ShieldCheck, Waves, Wind, Sparkles } from 'lucide-react';

export const SuiteDetailModal: React.FC = () => {
  const {
    selectedSuiteForDetail,
    setSelectedSuiteForDetail,
    setSelectedSuiteForBooking,
    filterState,
    isRoomAvailableForDates
  } = useHotel();

  if (!selectedSuiteForDetail) return null;

  const suite = selectedSuiteForDetail;
  const isAvailable = isRoomAvailableForDates(suite.id, filterState.checkIn, filterState.checkOut);

  // Compute stay nights
  const checkInDate = new Date(filterState.checkIn);
  const checkOutDate = new Date(filterState.checkOut);
  const diffTime = Math.max(0, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
  const totalStay = suite.basePrice * nights;

  const handleStartBooking = () => {
    setSelectedSuiteForBooking(suite);
    setSelectedSuiteForDetail(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E7E1D8] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedSuiteForDetail(null)}
          className="absolute top-4 right-4 z-20 p-2 text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-[#ECE6DC] overflow-hidden">
          <img
            src={suite.imageUrl}
            alt={suite.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-white/80 mb-1">
              {suite.tier} · Sanctuaries {suite.roomNumbers.join(', ')}
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
              {suite.name}
            </h2>
            <div className="text-sm text-white/90 mt-1 font-light">
              {suite.view}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Metadata Specs strip (Zero-Pill discipline) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#78716C] pb-6 border-b border-[#E7E1D8]">
            <span className="font-medium text-[#1C1917]">{suite.sizeSqFt.toLocaleString()} sq ft total living area</span>
            <span aria-hidden="true">·</span>
            <span>{suite.bedType}</span>
            <span aria-hidden="true">·</span>
            <span>Accommodates up to {suite.maxGuests} Guests</span>
            <span aria-hidden="true">·</span>
            <span>Private En-Suite Master Bath</span>
          </div>

          {/* Architectural Description */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9C532B] mb-2">
              Architectural Concept &amp; Atmosphere
            </h3>
            <p className="text-sm text-[#44403C] leading-relaxed">
              {suite.description}
            </p>
          </div>

          {/* Inclusions & Amenities 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#E7E1D8]">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1917] mb-3">
                Suite Amenities &amp; Features
              </h3>
              <ul className="space-y-2.5">
                {suite.amenities.map((item, idx) => (
                  <li key={idx} className="text-xs text-[#57534E] flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-[#2E3D2E] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1917] mb-3">
                Complimentary Solaria Inclusions
              </h3>
              <ul className="space-y-2.5">
                <li className="text-xs text-[#57534E] flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 text-[#2E3D2E] mt-0.5 shrink-0" />
                  <span>Daily champagne and artisanal tropical fruit breakfast</span>
                </li>
                <li className="text-xs text-[#57534E] flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 text-[#2E3D2E] mt-0.5 shrink-0" />
                  <span>Discreet unpacking, pressing, and shoe shine service</span>
                </li>
                <li className="text-xs text-[#57534E] flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 text-[#2E3D2E] mt-0.5 shrink-0" />
                  <span>Sunset meditation &amp; acoustic breathwork sessions</span>
                </li>
                <li className="text-xs text-[#57534E] flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 text-[#2E3D2E] mt-0.5 shrink-0" />
                  <span>High-speed private mesh Wi-Fi &amp; Bang &amp; Olufsen audio</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pricing & Booking Action Bar */}
          <div className="pt-6 border-t border-[#E7E1D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl text-[#1C1917] tabular-nums">
                  ${suite.basePrice.toLocaleString()}
                </span>
                <span className="text-xs text-[#78716C] uppercase tracking-wider">
                  / Night
                </span>
              </div>
              <div className="text-xs text-[#78716C] mt-0.5">
                For {nights} nights ({filterState.checkIn} – {filterState.checkOut}): <strong className="text-[#1C1917] font-mono">${totalStay.toLocaleString()}</strong> (excl. tax &amp; fee)
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setSelectedSuiteForDetail(null)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] hover:bg-[#ECE6DC] rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleStartBooking}
                disabled={!isAvailable}
                className={`w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isAvailable
                    ? 'bg-[#2E3D2E] text-white hover:bg-[#1E2B1E] shadow-sm'
                    : 'bg-[#E7E1D8] text-[#A8A29E] cursor-not-allowed'
                }`}
              >
                <span>{isAvailable ? 'Proceed with Suite' : 'Unavailable for Dates'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
