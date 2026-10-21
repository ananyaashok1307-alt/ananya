import React, { useState, useMemo } from 'react';
import { useHotel } from '../context/HotelContext';
import { Reservation, ReservationStatus, RoomCondition, Suite } from '../types/hotel';
import {
  Users,
  CheckCircle2,
  Clock,
  DollarSign,
  Search,
  Filter,
  Plus,
  RefreshCw,
  BedDouble,
  Sparkles,
  AlertCircle,
  LogOut,
  LogIn,
  XCircle,
  FileText
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const {
    reservations,
    roomInventory,
    suites,
    updateReservationStatus,
    updateRoomCondition,
    createReservation,
    resetToDemoData,
    setActiveView
  } = useHotel();

  const [activeTab, setActiveTab] = useState<'roster' | 'rooms'>('roster');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReservationForView, setSelectedReservationForView] = useState<Reservation | null>(null);
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);

  // New walk-in state
  const [walkInSuiteId, setWalkInSuiteId] = useState<string>(suites[0]?.id || '');
  const [walkInGuestName, setWalkInGuestName] = useState('');
  const [walkInEmail, setWalkInEmail] = useState('');
  const [walkInNights, setWalkInNights] = useState(2);

  // Core Hotel KPIs
  const totalRooms = roomInventory.length;
  const occupiedRooms = roomInventory.filter(r => !!r.currentReservationId).length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  const activeReservations = reservations.filter(r => r.status !== 'cancelled');
  const checkedInCount = reservations.filter(r => r.status === 'checked_in').length;
  const pendingArrivalsCount = reservations.filter(r => r.status === 'confirmed').length;
  const totalRevenue = activeReservations.reduce((acc, r) => acc + r.totalAmount, 0);

  // Filtered reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter(res => {
      if (statusFilter !== 'all' && res.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = res.guestDetails.fullName.toLowerCase().includes(q);
        const matchCode = res.id.toLowerCase().includes(q);
        const matchSuite = res.suiteName.toLowerCase().includes(q);
        const matchRoom = res.roomNumber.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchSuite && !matchRoom) {
          return false;
        }
      }
      return true;
    });
  }, [reservations, statusFilter, searchQuery]);

  const handleCreateWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInGuestName || !walkInEmail) {
      alert('Please enter guest name and email.');
      return;
    }
    const targetSuite = suites.find(s => s.id === walkInSuiteId);
    if (!targetSuite) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const checkOutDate = new Date();
    checkOutDate.setDate(checkOutDate.getDate() + walkInNights);
    const checkOutStr = checkOutDate.toISOString().split('T')[0];

    const roomRateTotal = targetSuite.basePrice * walkInNights;
    const resortFee = Math.round(roomRateTotal * 0.12 * 100) / 100;
    const taxes = Math.round(roomRateTotal * 0.08 * 100) / 100;
    const totalAmount = roomRateTotal + resortFee + taxes;

    const res = createReservation({
      suiteId: targetSuite.id,
      checkIn: todayStr,
      checkOut: checkOutStr,
      nights: walkInNights,
      guests: { adults: 2, children: 0 },
      guestDetails: {
        fullName: walkInGuestName,
        email: walkInEmail,
        phone: '+1 555-010-9999',
        specialRequests: 'Front-desk walk-in registration.',
        pillowPreference: 'Organic Goose Down',
        estimatedArrivalTime: 'Immediate'
      },
      addOns: [],
      roomRateTotal,
      addOnsTotal: 0,
      resortFee,
      taxes,
      totalAmount
    });

    // Auto check in walk in
    updateReservationStatus(res.id, 'checked_in');

    setIsWalkInModalOpen(false);
    setWalkInGuestName('');
    setWalkInEmail('');
  };

  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case 'checked_in':
        return (
          <span className="text-xs font-medium text-[#166534] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            <span>Checked In</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="text-xs font-medium text-[#854D0E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
            <span>Confirmed</span>
          </span>
        );
      case 'checked_out':
        return (
          <span className="text-xs font-medium text-[#4B5563] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#9CA3AF]" />
            <span>Checked Out</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="text-xs font-medium text-[#991B1B] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  const getConditionBadge = (condition: RoomCondition) => {
    switch (condition) {
      case 'clean':
        return <span className="text-xs font-medium text-[#166534]">Clean &amp; Ready</span>;
      case 'turn_down':
        return <span className="text-xs font-medium text-[#D97706]">Turn-Down Due</span>;
      case 'inspecting':
        return <span className="text-xs font-medium text-[#2563EB]">Under Inspection</span>;
      case 'maintenance':
        return <span className="text-xs font-medium text-[#DC2626]">Maintenance</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Console Top Breadcrumb Bar */}
      <div className="bg-white border-b border-[#E7E1D8] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#9C532B] font-semibold">
              Front-Desk &amp; Operations Center
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917]">
              Solaria Haven Management Console
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWalkInModalOpen(true)}
              className="px-4 py-2 bg-[#2E3D2E] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1E2B1E] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>New Walk-In Stay</span>
            </button>

            <button
              onClick={resetToDemoData}
              title="Reset sample reservations & rooms"
              className="p-2 border border-[#E7E1D8] bg-white hover:bg-[#F3EFE6] text-[#78716C] hover:text-[#1C1917] rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E7E1D8] rounded-xl p-5">
            <div className="flex items-center justify-between text-xs text-[#78716C] mb-2 font-medium">
              <span>Current Occupancy</span>
              <BedDouble className="w-4 h-4 text-[#9C532B]" />
            </div>
            <div className="font-mono text-3xl font-bold text-[#1C1917] tabular-nums">
              {occupancyRate}%
            </div>
            <div className="text-xs text-[#78716C] mt-1">
              <strong className="text-[#1C1917]">{occupiedRooms}</strong> of {totalRooms} sanctuaries occupied
            </div>
          </div>

          <div className="bg-white border border-[#E7E1D8] rounded-xl p-5">
            <div className="flex items-center justify-between text-xs text-[#78716C] mb-2 font-medium">
              <span>In-House Guests</span>
              <Users className="w-4 h-4 text-[#2E3D2E]" />
            </div>
            <div className="font-mono text-3xl font-bold text-[#1C1917] tabular-nums">
              {checkedInCount}
            </div>
            <div className="text-xs text-[#78716C] mt-1">
              Currently checked in on estate
            </div>
          </div>

          <div className="bg-white border border-[#E7E1D8] rounded-xl p-5">
            <div className="flex items-center justify-between text-xs text-[#78716C] mb-2 font-medium">
              <span>Pending Arrivals</span>
              <Clock className="w-4 h-4 text-[#D97706]" />
            </div>
            <div className="font-mono text-3xl font-bold text-[#1C1917] tabular-nums">
              {pendingArrivalsCount}
            </div>
            <div className="text-xs text-[#78716C] mt-1">
              Confirmed upcoming arrivals
            </div>
          </div>

          <div className="bg-white border border-[#E7E1D8] rounded-xl p-5">
            <div className="flex items-center justify-between text-xs text-[#78716C] mb-2 font-medium">
              <span>Booked Gross Revenue</span>
              <DollarSign className="w-4 h-4 text-[#16A34A]" />
            </div>
            <div className="font-mono text-3xl font-bold text-[#1C1917] tabular-nums">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-[#78716C] mt-1">
              Across active reservations
            </div>
          </div>
        </div>

        {/* Tab switcher: Roster vs Room Inventory */}
        <div className="flex items-center gap-2 border-b border-[#E7E1D8] pb-4">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer ${
              activeTab === 'roster'
                ? 'bg-[#2E3D2E] text-white shadow-xs'
                : 'bg-white text-[#78716C] border border-[#E7E1D8] hover:text-[#1C1917]'
            }`}
          >
            Reservation Roster ({reservations.length})
          </button>

          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer ${
              activeTab === 'rooms'
                ? 'bg-[#2E3D2E] text-white shadow-xs'
                : 'bg-white text-[#78716C] border border-[#E7E1D8] hover:text-[#1C1917]'
            }`}
          >
            Sanctuary &amp; Housekeeping Board ({roomInventory.length})
          </button>
        </div>

        {/* TAB 1: RESERVATION ROSTER */}
        {activeTab === 'roster' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716C]" />
                <input
                  type="text"
                  placeholder="Search guest name, code (SLR-...), room..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#E7E1D8] rounded-lg text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#9C532B]"
                />
              </div>

              {/* Status Segmented Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#ECE6DC] rounded-lg border border-[#DDD5C9]">
                {(['all', 'confirmed', 'checked_in', 'checked_out', 'cancelled'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      statusFilter === s
                        ? 'bg-white text-[#1C1917] shadow-xs'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    {s === 'all' ? 'All' : s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-[#E7E1D8] rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-[#E7E1D8] text-[#78716C] uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Ref Code</th>
                      <th className="py-3.5 px-4 font-semibold">Guest</th>
                      <th className="py-3.5 px-4 font-semibold">Sanctuary</th>
                      <th className="py-3.5 px-4 font-semibold">Room</th>
                      <th className="py-3.5 px-4 font-semibold">Dates of Stay</th>
                      <th className="py-3.5 px-4 font-semibold">Total</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3EFE6]">
                    {filteredReservations.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-[#78716C]">
                          No reservations match the specified query.
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map(res => (
                        <tr key={res.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-semibold text-[#1C1917]">
                            {res.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-[#1C1917]">{res.guestDetails.fullName}</div>
                            <div className="text-[11px] text-[#78716C]">{res.guestDetails.email}</div>
                          </td>
                          <td className="py-3.5 px-4 text-[#57534E]">
                            {res.suiteName}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-medium text-[#9C532B]">
                            {res.roomNumber}
                          </td>
                          <td className="py-3.5 px-4 text-[#57534E] font-mono tabular-nums">
                            {res.checkIn} → {res.checkOut} ({res.nights}n)
                          </td>
                          <td className="py-3.5 px-4 font-mono tabular-nums font-semibold text-[#1C1917]">
                            ${res.totalAmount.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4">
                            {getStatusBadge(res.status)}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Action Buttons */}
                              {res.status === 'confirmed' && (
                                <button
                                  onClick={() => updateReservationStatus(res.id, 'checked_in')}
                                  title="Check In Guest"
                                  className="px-2.5 py-1.5 bg-[#2E3D2E] text-white text-[11px] font-semibold rounded hover:bg-[#1E2B1E] transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  <LogIn className="w-3 h-3" />
                                  <span>Check In</span>
                                </button>
                              )}

                              {res.status === 'checked_in' && (
                                <button
                                  onClick={() => updateReservationStatus(res.id, 'checked_out')}
                                  title="Check Out Guest"
                                  className="px-2.5 py-1.5 bg-[#57534E] text-white text-[11px] font-semibold rounded hover:bg-[#44403C] transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  <LogOut className="w-3 h-3" />
                                  <span>Check Out</span>
                                </button>
                              )}

                              {res.status !== 'cancelled' && res.status !== 'checked_out' && (
                                <button
                                  onClick={() => {
                                    if (confirm(`Cancel reservation ${res.id} for ${res.guestDetails.fullName}?`)) {
                                      updateReservationStatus(res.id, 'cancelled');
                                    }
                                  }}
                                  title="Cancel Reservation"
                                  className="p-1.5 text-[#DC2626] hover:bg-red-50 rounded transition-colors cursor-pointer"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}

                              <button
                                onClick={() => setSelectedReservationForView(res)}
                                title="View Stay Details"
                                className="p-1.5 text-[#57534E] hover:text-[#1C1917] hover:bg-[#ECE6DC] rounded transition-colors cursor-pointer"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ROOM INVENTORY & HOUSEKEEPING */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-[#1C1917]">Sanctuary Rooms Matrix</h3>
                <p className="text-xs text-[#78716C]">
                  Live housekeeping conditions, occupant tracking, and turnover toggles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roomInventory.map(room => (
                <div
                  key={room.roomNumber}
                  className="bg-white border border-[#E7E1D8] rounded-xl p-5 space-y-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between border-b border-[#F3EFE6] pb-3">
                    <div>
                      <span className="font-mono text-xl font-bold text-[#1C1917]">
                        Room {room.roomNumber}
                      </span>
                      <div className="text-xs text-[#78716C]">{room.suiteName}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-[#78716C] block">Floor {room.floor}</span>
                      {getConditionBadge(room.condition)}
                    </div>
                  </div>

                  {/* Occupant Status */}
                  <div className="text-xs">
                    {room.currentReservationId ? (
                      <div className="p-3 bg-[#F4F1EA] rounded-lg space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#78716C]">Occupant</span>
                          <strong className="text-[#1C1917]">{room.currentGuestName}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#78716C]">Check-Out</span>
                          <span className="font-mono text-[#9C532B]">{room.currentCheckOut}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#78716C]">Booking</span>
                          <span className="font-mono text-[#57534E]">{room.currentReservationId}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg text-emerald-800 flex items-center justify-between">
                        <span>Vacant / Ready for Guest</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      </div>
                    )}
                  </div>

                  {/* Housekeeping Condition Selector */}
                  <div className="pt-2">
                    <label className="text-[11px] uppercase tracking-wider text-[#78716C] font-semibold block mb-1.5">
                      Update Housekeeping State
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['clean', 'turn_down', 'inspecting', 'maintenance'] as const).map(cond => (
                        <button
                          key={cond}
                          onClick={() => updateRoomCondition(room.roomNumber, cond)}
                          className={`px-2 py-1.5 text-[11px] rounded font-medium transition-colors text-left truncate cursor-pointer ${
                            room.condition === cond
                              ? 'bg-[#2E3D2E] text-white shadow-xs'
                              : 'bg-[#F3EFE6] text-[#57534E] hover:bg-[#E7E1D8]'
                          }`}
                        >
                          {cond === 'clean' && 'Clean'}
                          {cond === 'turn_down' && 'Turndown'}
                          {cond === 'inspecting' && 'Inspecting'}
                          {cond === 'maintenance' && 'Maintenance'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DETAIL MODAL FOR RESERVATION */}
      {selectedReservationForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E7E1D8] rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-[#F3EFE6] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#9C532B] font-semibold">Reservation File</span>
                <div className="font-mono text-2xl font-bold text-[#1C1917]">{selectedReservationForView.id}</div>
              </div>
              <button
                onClick={() => setSelectedReservationForView(null)}
                className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-full"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[#78716C] block">Guest Name</span>
                  <strong className="text-[#1C1917] text-sm">{selectedReservationForView.guestDetails.fullName}</strong>
                </div>
                <div>
                  <span className="text-[#78716C] block">Contact</span>
                  <span className="text-[#1C1917]">{selectedReservationForView.guestDetails.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-[#78716C] block">Email</span>
                <span className="text-[#1C1917]">{selectedReservationForView.guestDetails.email}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[#78716C] block">Sanctuary &amp; Room</span>
                  <strong className="text-[#1C1917]">{selectedReservationForView.suiteName} (Rm {selectedReservationForView.roomNumber})</strong>
                </div>
                <div>
                  <span className="text-[#78716C] block">Dates</span>
                  <span className="font-mono">{selectedReservationForView.checkIn} → {selectedReservationForView.checkOut}</span>
                </div>
              </div>

              <div>
                <span className="text-[#78716C] block">Pillow Preference</span>
                <span className="text-[#1C1917] font-medium">{selectedReservationForView.guestDetails.pillowPreference}</span>
              </div>

              {selectedReservationForView.guestDetails.specialRequests && (
                <div className="p-3 bg-[#FAF8F5] rounded-lg">
                  <span className="text-[#78716C] block font-semibold mb-1">Special Requests / Notes:</span>
                  <p className="text-[#44403C] leading-relaxed">{selectedReservationForView.guestDetails.specialRequests}</p>
                </div>
              )}

              {selectedReservationForView.addOns.length > 0 && (
                <div>
                  <span className="text-[#78716C] block font-semibold mb-1">Curated Experiences:</span>
                  <ul className="list-disc pl-4 space-y-1 text-[#57534E]">
                    {selectedReservationForView.addOns.map(a => (
                      <li key={a.id}>{a.name} (${a.calculatedPrice})</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-3 border-t border-[#F3EFE6] flex justify-between items-center text-sm">
                <span className="text-[#78716C]">Total Invoiced</span>
                <span className="font-mono font-bold text-lg text-[#1C1917]">
                  ${selectedReservationForView.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedReservationForView(null)}
                className="px-5 py-2 bg-[#2E3D2E] text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WALK-IN REGISTRATION MODAL */}
      {isWalkInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E7E1D8] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-start border-b border-[#F3EFE6] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#9C532B] font-semibold">Front-Desk Desk Check-in</span>
                <h3 className="font-serif text-xl text-[#1C1917]">New Walk-In Stay</h3>
              </div>
              <button
                onClick={() => setIsWalkInModalOpen(false)}
                className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-full"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWalkIn} className="space-y-4 text-xs">
              <div>
                <label className="text-[#1C1917] font-semibold block mb-1">Guest Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David & Claire Sterling"
                  value={walkInGuestName}
                  onChange={(e) => setWalkInGuestName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E1D8] rounded-lg focus:outline-none focus:border-[#9C532B]"
                />
              </div>

              <div>
                <label className="text-[#1C1917] font-semibold block mb-1">Guest Email *</label>
                <input
                  type="email"
                  required
                  placeholder="sterling@example.com"
                  value={walkInEmail}
                  onChange={(e) => setWalkInEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E1D8] rounded-lg focus:outline-none focus:border-[#9C532B]"
                />
              </div>

              <div>
                <label className="text-[#1C1917] font-semibold block mb-1">Assign Sanctuary</label>
                <select
                  value={walkInSuiteId}
                  onChange={(e) => setWalkInSuiteId(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E1D8] rounded-lg focus:outline-none focus:border-[#9C532B]"
                >
                  {suites.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} (${s.basePrice}/night)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[#1C1917] font-semibold block mb-1">Number of Nights</label>
                <select
                  value={walkInNights}
                  onChange={(e) => setWalkInNights(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-[#E7E1D8] rounded-lg focus:outline-none focus:border-[#9C532B]"
                >
                  {[1, 2, 3, 4, 5, 7, 10].map(n => (
                    <option key={n} value={n}>{n} Night{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#F3EFE6]">
                <button
                  type="button"
                  onClick={() => setIsWalkInModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2E3D2E] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1E2B1E]"
                >
                  Check In Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
