import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { RESORT_ADDONS } from '../data/mockHotelData';
import { AddOnExperience, SelectedAddOn, GuestDetails, Reservation } from '../types/hotel';
import { X, Check, ArrowRight, ArrowLeft, Calendar, User, Sparkles, ShieldCheck, Printer, HeartHandshake } from 'lucide-react';

export const BookingFlowModal: React.FC = () => {
  const {
    selectedSuiteForBooking,
    setSelectedSuiteForBooking,
    filterState,
    createReservation
  } = useHotel();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form states
  const [checkIn, setCheckIn] = useState(filterState.checkIn);
  const [checkOut, setCheckOut] = useState(filterState.checkOut);
  const [adults, setAdults] = useState(filterState.guests);
  const [childrenCount, setChildrenCount] = useState(0);

  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOn[]>([]);
  
  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    estimatedArrivalTime: '15:00',
    pillowPreference: 'Organic Goose Down'
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  if (!selectedSuiteForBooking) return null;
  const suite = selectedSuiteForBooking;

  // Nights calculation
  const dIn = new Date(checkIn);
  const dOut = new Date(checkOut);
  const diffTime = Math.max(0, dOut.getTime() - dIn.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  // Pricing calculations
  const roomRateTotal = suite.basePrice * nights;
  
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.calculatedPrice, 0);
  const subtotal = roomRateTotal + addOnsTotal;
  const resortFee = Math.round(subtotal * 0.12 * 100) / 100; // 12%
  const taxes = Math.round(subtotal * 0.08 * 100) / 100; // 8%
  const grandTotal = Math.round((subtotal + resortFee + taxes) * 100) / 100;

  // AddOn toggle
  const toggleAddOn = (addon: AddOnExperience) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(p => p.id === addon.id);
      if (exists) {
        return prev.filter(p => p.id !== addon.id);
      }
      let calculatedPrice = addon.price;
      if (addon.pricingType === 'per_guest') {
        calculatedPrice = addon.price * (adults + childrenCount);
      } else if (addon.pricingType === 'per_night') {
        calculatedPrice = addon.price * nights;
      }
      return [...prev, {
        id: addon.id,
        name: addon.name,
        price: addon.price,
        pricingType: addon.pricingType,
        calculatedPrice
      }];
    });
  };

  const handleNextFromStep1 = () => {
    if (!checkIn || !checkOut || checkIn >= checkOut) {
      alert('Please select a valid check-in and check-out date.');
      return;
    }
    setStep(2);
  };

  const handleNextFromStep3 = () => {
    const errors: { [key: string]: string } = {};
    if (!guestDetails.fullName.trim()) errors.fullName = 'Please enter primary guest name';
    if (!guestDetails.email.trim() || !guestDetails.email.includes('@')) errors.email = 'Please provide a valid email';
    if (!guestDetails.phone.trim()) errors.phone = 'Please provide contact phone';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setStep(4);
  };

  const handleConfirmReservation = () => {
    const res = createReservation({
      suiteId: suite.id,
      checkIn,
      checkOut,
      nights,
      guests: { adults, children: childrenCount },
      guestDetails,
      addOns: selectedAddOns,
      roomRateTotal,
      addOnsTotal,
      resortFee,
      taxes,
      totalAmount: grandTotal
    });
    setConfirmedReservation(res);
    setStep(5);
  };

  const handleClose = () => {
    setSelectedSuiteForBooking(null);
    setStep(1);
    setConfirmedReservation(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E7E1D8] rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-white border-b border-[#E7E1D8] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9C532B]">
              Step {step} of 4 · Reservation Concierge
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917]">
              {step === 5 ? 'Reservation Confirmed' : `Reserve ${suite.name}`}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F3EFE6] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">

          {/* STEP 1: Dates & Guests */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-[#FAF8F5] border border-[#E7E1D8] p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#78716C]">Selected Sanctuary</div>
                  <div className="font-serif text-xl text-[#1C1917]">{suite.name}</div>
                  <div className="text-xs text-[#78716C]">${suite.basePrice.toLocaleString()} / night · Max {suite.maxGuests} guests</div>
                </div>
                <img
                  src={suite.imageUrl}
                  alt={suite.name}
                  className="w-16 h-16 rounded-lg object-cover border border-[#E7E1D8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E7E1D8] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9C532B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E7E1D8] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9C532B]"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#F3EFE6] rounded-xl flex items-center justify-between text-xs text-[#57534E]">
                <span>Duration of Stay</span>
                <span className="font-mono tabular-nums text-sm font-semibold text-[#1C1917]">
                  {nights} {nights === 1 ? 'Night' : 'Nights'} (${roomRateTotal.toLocaleString()} Room Base)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                    Adult Guests
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E7E1D8] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9C532B]"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num} disabled={num > suite.maxGuests}>
                        {num} Adult{num > 1 ? 's' : ''} {num > suite.maxGuests ? '(Exceeds Capacity)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                    Children (Ages 0–12)
                  </label>
                  <select
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E7E1D8] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9C532B]"
                  >
                    {[0, 1, 2, 3].map(num => (
                      <option key={num} value={num}>
                        {num} Children
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNextFromStep1}
                  className="px-6 py-2.5 bg-[#2E3D2E] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1E2B1E] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Continue to Experiences</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Curated Stay Experiences & Add-Ons */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="border-b border-[#E7E1D8] pb-4">
                <h3 className="font-serif text-xl text-[#1C1917]">Tailor Your Sanctuary Experience</h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Select bespoke inclusions to enrich your stay. Added items will be coordinated by your private butler upon arrival.
                </p>
              </div>

              <div className="space-y-3">
                {RESORT_ADDONS.map(addon => {
                  const isSelected = selectedAddOns.some(a => a.id === addon.id);
                  let calculatedPrice = addon.price;
                  if (addon.pricingType === 'per_guest') {
                    calculatedPrice = addon.price * (adults + childrenCount);
                  } else if (addon.pricingType === 'per_night') {
                    calculatedPrice = addon.price * nights;
                  }

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#F4F1EA] border-[#2E3D2E] shadow-xs'
                          : 'bg-white border-[#E7E1D8] hover:border-[#DDD5C9]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#2E3D2E] border-[#2E3D2E] text-white' : 'border-[#D6CEC5] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-[#9C532B] font-semibold">{addon.category}</div>
                          <div className="text-sm font-semibold text-[#1C1917]">{addon.name}</div>
                          <p className="text-xs text-[#78716C] mt-1">{addon.tagline}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-serif text-lg text-[#1C1917] tabular-nums">
                          +${calculatedPrice.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-[#78716C] uppercase font-sans">
                          {addon.pricingType === 'per_guest' ? `($${addon.price} x ${adults + childrenCount} guests)` : 'Per Stay'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#E7E1D8]">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Dates</span>
                </button>

                <div className="flex items-center gap-4">
                  <div className="text-xs text-[#78716C] hidden sm:block">
                    Add-ons total: <strong className="text-[#1C1917] font-mono tabular-nums">${addOnsTotal.toLocaleString()}</strong>
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-[#2E3D2E] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1E2B1E] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Guest Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Profile & Preferences */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-[#E7E1D8] pb-4">
                <h3 className="font-serif text-xl text-[#1C1917]">Primary Guest &amp; Stay Preferences</h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Our concierge coordinates every amenity in advance of your arrival.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Elena Rostova"
                    value={guestDetails.fullName}
                    onChange={(e) => setGuestDetails(prev => ({ ...prev, fullName: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg text-[#1C1917] focus:outline-none ${
                      formErrors.fullName ? 'border-red-500' : 'border-[#E7E1D8] focus:border-[#9C532B]'
                    }`}
                  />
                  {formErrors.fullName && <span className="text-[11px] text-red-600">{formErrors.fullName}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="elena@example.com"
                    value={guestDetails.email}
                    onChange={(e) => setGuestDetails(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg text-[#1C1917] focus:outline-none ${
                      formErrors.email ? 'border-red-500' : 'border-[#E7E1D8] focus:border-[#9C532B]'
                    }`}
                  />
                  {formErrors.email && <span className="text-[11px] text-red-600">{formErrors.email}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={guestDetails.phone}
                    onChange={(e) => setGuestDetails(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg text-[#1C1917] focus:outline-none ${
                      formErrors.phone ? 'border-red-500' : 'border-[#E7E1D8] focus:border-[#9C532B]'
                    }`}
                  />
                  {formErrors.phone && <span className="text-[11px] text-red-600">{formErrors.phone}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                    Estimated Arrival Time
                  </label>
                  <select
                    value={guestDetails.estimatedArrivalTime}
                    onChange={(e) => setGuestDetails(prev => ({ ...prev, estimatedArrivalTime: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E7E1D8] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9C532B]"
                  >
                    <option value="13:00">1:00 PM (Early Arrival)</option>
                    <option value="15:00">3:00 PM (Standard Check-In)</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="19:00">7:00 PM (Evening Arrival)</option>
                    <option value="21:00">9:00 PM (Late Night Arrival)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                  Bespoke Pillow Menu Selection
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Organic Goose Down', 'Lavender Infused', 'Ergonomic Memory Foam', 'Hypoallergenic Bamboo'] as const).map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setGuestDetails(prev => ({ ...prev, pillowPreference: p }))}
                      className={`p-2.5 text-xs rounded-lg border text-left transition-colors cursor-pointer ${
                        guestDetails.pillowPreference === p
                          ? 'border-[#2E3D2E] bg-[#F4F1EA] text-[#1C1917] font-medium'
                          : 'border-[#E7E1D8] bg-white text-[#78716C] hover:border-[#DDD5C9]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                  Dietary Restrictions &amp; Concierge Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Gluten-free breakfast preference, celebrating an anniversary, preferred evening chilled water..."
                  value={guestDetails.specialRequests}
                  onChange={(e) => setGuestDetails(prev => ({ ...prev, specialRequests: e.target.value }))}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E7E1D8] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9C532B]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#E7E1D8]">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Add-Ons</span>
                </button>

                <button
                  onClick={handleNextFromStep3}
                  className="px-6 py-2.5 bg-[#2E3D2E] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1E2B1E] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Review &amp; Summary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review, Transparent Pricing & Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="border-b border-[#E7E1D8] pb-4">
                <h3 className="font-serif text-xl text-[#1C1917]">Review Your Stay Itinerary</h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Transparent breakdown with zero hidden fees. Confirm below for instant reservation reservation voucher.
                </p>
              </div>

              <div className="bg-white border border-[#E7E1D8] rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-start pb-4 border-b border-[#F3EFE6]">
                  <div>
                    <div className="font-serif text-lg text-[#1C1917]">{suite.name}</div>
                    <div className="text-xs text-[#78716C] mt-0.5">
                      {checkIn} to {checkOut} ({nights} nights) · {adults} Adults {childrenCount > 0 ? `, ${childrenCount} Children` : ''}
                    </div>
                    <div className="text-xs text-[#9C532B] mt-1">
                      Guest: {guestDetails.fullName} ({guestDetails.email})
                    </div>
                  </div>
                  <div className="text-right font-mono tabular-nums text-sm font-semibold text-[#1C1917]">
                    ${roomRateTotal.toLocaleString()}
                  </div>
                </div>

                {/* Selected Add-ons */}
                {selectedAddOns.length > 0 && (
                  <div className="space-y-2 pb-4 border-b border-[#F3EFE6]">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                      Curated Experiences Selected
                    </div>
                    {selectedAddOns.map(addon => (
                      <div key={addon.id} className="flex justify-between text-xs text-[#57534E]">
                        <span>+ {addon.name}</span>
                        <span className="font-mono tabular-nums text-[#1C1917]">${addon.calculatedPrice.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Fees and Taxes */}
                <div className="space-y-2 text-xs text-[#57534E]">
                  <div className="flex justify-between">
                    <span>Resort &amp; Coastal Marine Preservation Fee (12%)</span>
                    <span className="font-mono tabular-nums text-[#1C1917]">${resortFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Regional Hospitality &amp; Lodging Tax (8%)</span>
                    <span className="font-mono tabular-nums text-[#1C1917]">${taxes.toLocaleString()}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-[#E7E1D8] flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-semibold uppercase tracking-wider text-[#1C1917]">Total Stay Investment</span>
                    <div className="text-[11px] text-[#78716C]">Includes all luxury inclusions, champagne breakfast &amp; butler service</div>
                  </div>
                  <div className="font-serif text-3xl font-normal text-[#1C1917] tabular-nums">
                    ${grandTotal.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Solaria Hospitality Pledge */}
              <div className="p-4 bg-[#F4F1EA] border border-[#DDD5C9] rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#2E3D2E] shrink-0 mt-0.5" />
                <div className="text-xs text-[#57534E] leading-relaxed">
                  <strong className="text-[#1C1917]">Complimentary Flexible Cancellation:</strong> Modify or cancel up to 48 hours prior to arrival with zero penalty. Our concierge will contact you 2 days prior to coordinate private transfers.
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#E7E1D8]">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Profile</span>
                </button>

                <button
                  onClick={handleConfirmReservation}
                  className="px-8 py-3 bg-[#2E3D2E] text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-[#1E2B1E] transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
                >
                  <Check className="w-4 h-4 text-[#A3E635]" />
                  <span>Confirm Reservation</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Instant Confirmation & Digital Stay Voucher */}
          {step === 5 && confirmedReservation && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-[#2E3D2E] text-[#FAF8F5] rounded-full mx-auto flex items-center justify-center shadow-lg">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9C532B] mb-1">
                  Solaria Sanctuary Confirmed
                </div>
                <h3 className="font-serif text-3xl text-[#1C1917]">
                  We look forward to welcoming you, {confirmedReservation.guestDetails.fullName}.
                </h3>
                <p className="text-xs text-[#78716C] max-w-md mx-auto mt-2">
                  A personalized confirmation and arrival itinerary has been sent to <strong className="text-[#1C1917]">{confirmedReservation.guestDetails.email}</strong>.
                </p>
              </div>

              {/* Digital Voucher Card */}
              <div className="bg-white border-2 border-dashed border-[#DDD5C9] rounded-2xl p-6 max-w-lg mx-auto text-left space-y-4 shadow-xs">
                <div className="flex justify-between items-start border-b border-[#F3EFE6] pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#78716C] font-semibold">Reservation Code</span>
                    <div className="font-mono text-2xl font-bold tracking-wider text-[#1C1917]">
                      {confirmedReservation.id}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-[#78716C] font-semibold">Assigned Sanctuary</span>
                    <div className="font-mono text-lg font-bold text-[#9C532B]">
                      Room {confirmedReservation.roomNumber}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#78716C] block">Dates of Stay</span>
                    <strong className="text-[#1C1917] font-mono">{confirmedReservation.checkIn} → {confirmedReservation.checkOut}</strong>
                  </div>
                  <div>
                    <span className="text-[#78716C] block">Party</span>
                    <strong className="text-[#1C1917]">{confirmedReservation.guests.adults} Adults {confirmedReservation.guests.children > 0 ? `, ${confirmedReservation.guests.children} Children` : ''}</strong>
                  </div>
                  <div>
                    <span className="text-[#78716C] block">Dwelling Type</span>
                    <strong className="text-[#1C1917]">{confirmedReservation.suiteName}</strong>
                  </div>
                  <div>
                    <span className="text-[#78716C] block">Pillow Preference</span>
                    <strong className="text-[#1C1917]">{confirmedReservation.guestDetails.pillowPreference}</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F3EFE6] flex justify-between items-center text-xs">
                  <span className="text-[#78716C]">Total Investment</span>
                  <span className="font-mono font-bold text-base text-[#1C1917]">${confirmedReservation.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 border border-[#E7E1D8] bg-white hover:bg-[#F3EFE6] text-xs font-semibold text-[#1C1917] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#78716C]" />
                  <span>Print Stay Voucher</span>
                </button>

                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-[#2E3D2E] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1E2B1E] transition-colors cursor-pointer shadow-xs"
                >
                  Return to Resort
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
