import React, { useMemo } from 'react';
import { useHotel } from '../context/HotelContext';
import { Suite } from '../types/hotel';
import { Search, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';

export const SuiteCatalog: React.FC = () => {
  const {
    suites,
    filterState,
    setFilterState,
    setSelectedSuiteForBooking,
    setSelectedSuiteForDetail,
    isRoomAvailableForDates
  } = useHotel();

  // Filter suites by tier, guest count, and search query
  const filteredSuites = useMemo(() => {
    return suites.filter(suite => {
      // Tier match
      if (filterState.tier !== 'All' && suite.tier !== filterState.tier) {
        return false;
      }
      // Guest capacity match
      if (suite.maxGuests < filterState.guests) {
        return false;
      }
      // Search text query
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matchesName = suite.name.toLowerCase().includes(q);
        const matchesTagline = suite.tagline.toLowerCase().includes(q);
        const matchesAmenity = suite.amenities.some(a => a.toLowerCase().includes(q));
        const matchesView = suite.view.toLowerCase().includes(q);
        if (!matchesName && !matchesTagline && !matchesAmenity && !matchesView) {
          return false;
        }
      }
      return true;
    });
  }, [suites, filterState]);

  // Compute stay nights
  const checkInDate = new Date(filterState.checkIn);
  const checkOutDate = new Date(filterState.checkOut);
  const diffTime = Math.max(0, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  return (
    <section id="suites" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E7E1D8] gap-6">
        <div>
          <div className="text-xs font-semibold tracking-[0.2em] text-[#9C532B] uppercase mb-2">
            Sanctuary Collection
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] tracking-tight">
            Curated Suites &amp; Private Pavilions
          </h2>
          <p className="mt-3 text-sm text-[#78716C] max-w-xl">
            Each dwelling is oriented toward the horizon, furnished in raw travertine, teak timber, and whisper-quiet acoustic separation.
          </p>
        </div>

        {/* Tier filter controls - segmented controls as functional buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#ECE6DC] rounded-lg border border-[#DDD5C9] self-start md:self-auto">
          {(['All', 'Villa', 'Pavilion', 'Suite', 'Penthouse'] as const).map(tierOption => (
            <button
              key={tierOption}
              onClick={() => setFilterState(prev => ({ ...prev, tier: tierOption }))}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterState.tier === tierOption
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              {tierOption === 'All' ? 'All Dwellings' : `${tierOption}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Capacity helper bar */}
      <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716C]" />
          <input
            type="text"
            placeholder="Search by feature (e.g. pool, tub, butler)..."
            value={filterState.searchQuery}
            onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#E7E1D8] rounded-lg text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#9C532B]"
          />
        </div>

        <div className="text-xs text-[#78716C] flex items-center gap-2 self-start sm:self-auto">
          <span>Showing <strong className="text-[#1C1917] font-mono tabular-nums">{filteredSuites.length}</strong> available sanctuaries</span>
          <span aria-hidden="true">·</span>
          <span>Dates: <strong className="text-[#1C1917] font-mono">{filterState.checkIn}</strong> to <strong className="text-[#1C1917] font-mono">{filterState.checkOut}</strong> ({nights} {nights === 1 ? 'night' : 'nights'})</span>
        </div>
      </div>

      {/* Suite Grid */}
      {filteredSuites.length === 0 ? (
        <div className="p-16 text-center bg-white border border-[#E7E1D8] rounded-2xl">
          <h3 className="font-serif text-2xl text-[#1C1917] mb-2">No Sanctuaries Match Your Criteria</h3>
          <p className="text-sm text-[#78716C] mb-6 max-w-md mx-auto">
            Try adjusting your guest count, changing dates, or resetting your filter category to explore our available suites.
          </p>
          <button
            onClick={() => setFilterState(prev => ({ ...prev, tier: 'All', guests: 2, searchQuery: '' }))}
            className="px-5 py-2.5 bg-[#2E3D2E] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1E2B1E] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredSuites.map((suite) => {
            const isAvailable = isRoomAvailableForDates(suite.id, filterState.checkIn, filterState.checkOut);
            const totalEstimated = suite.basePrice * nights;

            return (
              <div
                key={suite.id}
                className="group bg-white border border-[#E7E1D8] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Visual Image Lead (65-75% card visual weight) */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#ECE6DC]">
                  <img
                    src={suite.imageUrl}
                    alt={suite.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle dark gradient scrim for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Top clean category text */}
                  <div className="absolute top-4 left-4 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/90 drop-shadow-xs">
                    {suite.tier}
                  </div>

                  {/* Availability badge */}
                  <div className="absolute top-4 right-4">
                    {isAvailable ? (
                      <span className="text-[11px] tracking-wider text-[#FAF8F5] bg-[#2E3D2E]/80 backdrop-blur-xs px-2.5 py-1 rounded-sm flex items-center gap-1 font-medium">
                        <Check className="w-3 h-3 text-[#A3E635]" /> Available
                      </span>
                    ) : (
                      <span className="text-[11px] tracking-wider text-[#FAF8F5] bg-[#78350F]/80 backdrop-blur-xs px-2.5 py-1 rounded-sm font-medium">
                        Dates Booked
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Overlay Title & Price */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <h3 className="font-serif text-2xl font-normal leading-tight drop-shadow-xs">
                        {suite.name}
                      </h3>
                      <div className="text-xs text-white/80 font-light mt-0.5">
                        {suite.view}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-normal font-serif text-white tabular-nums drop-shadow-xs">
                        ${suite.basePrice.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-white/70 uppercase tracking-widest font-sans">
                        Per Night
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata with Typographic Interpuncts (Zero-Pill Discipline) */}
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#78716C] mb-3">
                      <span>{suite.sizeSqFt.toLocaleString()} sq ft</span>
                      <span aria-hidden="true" className="text-[#A8A29E]">·</span>
                      <span>{suite.bedType}</span>
                      <span aria-hidden="true" className="text-[#A8A29E]">·</span>
                      <span>Up to {suite.maxGuests} Guests</span>
                      <span aria-hidden="true" className="text-[#A8A29E]">·</span>
                      <span>{suite.roomNumbers.length} Sanctuaries</span>
                    </div>

                    <p className="text-xs leading-relaxed text-[#57534E] line-clamp-2 mb-4">
                      {suite.tagline}
                    </p>

                    {/* Signature Amenities list */}
                    <div className="grid grid-cols-2 gap-2 mb-6 pt-3 border-t border-[#F3EFE6]">
                      {suite.amenities.slice(0, 4).map((amenity, i) => (
                        <div key={i} className="text-[11px] text-[#44403C] flex items-center gap-1.5 truncate">
                          <span className="w-1 h-1 rounded-full bg-[#9C532B] shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-4 border-t border-[#E7E1D8] flex items-center justify-between gap-4">
                    <div className="text-xs text-[#78716C]">
                      <span>{nights} nights total: </span>
                      <strong className="text-[#1C1917] font-mono tabular-nums text-sm font-semibold">
                        ${totalEstimated.toLocaleString()}
                      </strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedSuiteForDetail(suite)}
                        className="px-3.5 py-2 text-xs font-medium text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE6] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => setSelectedSuiteForBooking(suite)}
                        disabled={!isAvailable}
                        className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                          isAvailable
                            ? 'bg-[#2E3D2E] text-white hover:bg-[#1E2B1E] shadow-xs active:scale-[0.98]'
                            : 'bg-[#E7E1D8] text-[#A8A29E] cursor-not-allowed'
                        }`}
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
