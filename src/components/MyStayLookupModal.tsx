import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Reservation } from '../types/hotel';
import { Search, X, Printer, Calendar, BedDouble, CheckCircle2 } from 'lucide-react';

export const MyStayLookupModal: React.FC = () => {
  const { isLookupModalOpen, setIsLookupModalOpen, lookupReservation } = useHotel();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Reservation[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isLookupModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = lookupReservation(query);
    setResults(res);
    setHasSearched(true);
  };

  const handleClose = () => {
    setIsLookupModalOpen(false);
    setQuery('');
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] border border-[#E7E1D8] rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex justify-between items-start border-b border-[#E7E1D8] pb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#9C532B] font-semibold">
              Guest Services
            </div>
            <h3 className="font-serif text-2xl text-[#1C1917]">Find Your Reservation</h3>
            <p className="text-xs text-[#78716C] mt-0.5">
              Enter your booking reference code (e.g. SLR-1094) or your guest email address.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716C]" />
            <input
              type="text"
              placeholder="e.g. SLR-1094 or elena.rostova@luxurytravel.ch"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#E7E1D8] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9C532B]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#2E3D2E] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1E2B1E] transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Results Area */}
        <div className="max-h-[50vh] overflow-y-auto space-y-4">
          {hasSearched && results.length === 0 && (
            <div className="p-8 text-center bg-white border border-[#E7E1D8] rounded-xl text-[#78716C] text-xs">
              No reservation records found for &ldquo;{query}&rdquo;. Please verify your booking reference or contact our front desk concierge directly.
            </div>
          )}

          {results.map(res => (
            <div
              key={res.id}
              className="bg-white border border-[#E7E1D8] rounded-xl p-5 space-y-4 shadow-xs"
            >
              <div className="flex justify-between items-start border-b border-[#F3EFE6] pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#9C532B] font-semibold">Confirmed Itinerary</span>
                  <div className="font-mono text-xl font-bold text-[#1C1917]">{res.id}</div>
                  <div className="text-xs text-[#78716C]">Booked under {res.guestDetails.fullName}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C] block">Assigned Sanctuary</span>
                  <strong className="text-sm text-[#2E3D2E]">Room {res.roomNumber}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#78716C] block">Dates of Stay</span>
                  <strong className="font-mono text-[#1C1917]">{res.checkIn} → {res.checkOut} ({res.nights} nights)</strong>
                </div>
                <div>
                  <span className="text-[#78716C] block">Sanctuary Type</span>
                  <strong className="text-[#1C1917]">{res.suiteName}</strong>
                </div>
                <div>
                  <span className="text-[#78716C] block">Party Size</span>
                  <strong className="text-[#1C1917]">{res.guests.adults} Adults {res.guests.children > 0 ? `, ${res.guests.children} Children` : ''}</strong>
                </div>
                <div>
                  <span className="text-[#78716C] block">Pillow Preference</span>
                  <strong className="text-[#1C1917]">{res.guestDetails.pillowPreference}</strong>
                </div>
              </div>

              {res.addOns.length > 0 && (
                <div className="text-xs pt-2 border-t border-[#F3EFE6]">
                  <span className="text-[#78716C] block font-semibold mb-1">Curated Experiences Booked:</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-[#57534E]">
                    {res.addOns.map(a => (
                      <li key={a.id}>{a.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-[#F3EFE6]">
                <div className="text-xs">
                  <span className="text-[#78716C]">Total Stay Investment: </span>
                  <strong className="text-[#1C1917] font-mono">${res.totalAmount.toLocaleString()}</strong>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 border border-[#E7E1D8] text-xs font-medium text-[#1C1917] hover:bg-[#F3EFE6] rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#78716C]" />
                  <span>Print Voucher</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
