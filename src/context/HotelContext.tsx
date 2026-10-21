import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Suite,
  Reservation,
  RoomInventoryItem,
  FilterState,
  ReservationStatus,
  RoomCondition,
  GuestDetails,
  SelectedAddOn
} from '../types/hotel';
import {
  INITIAL_SUITES,
  INITIAL_RESERVATIONS,
  INITIAL_ROOM_INVENTORY
} from '../data/mockHotelData';

interface BookingPayload {
  suiteId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: { adults: number; children: number };
  guestDetails: GuestDetails;
  addOns: SelectedAddOn[];
  roomRateTotal: number;
  addOnsTotal: number;
  resortFee: number;
  taxes: number;
  totalAmount: number;
}

interface HotelContextType {
  suites: Suite[];
  reservations: Reservation[];
  roomInventory: RoomInventoryItem[];
  activeView: 'guest' | 'staff';
  setActiveView: (view: 'guest' | 'staff') => void;
  selectedSuiteForBooking: Suite | null;
  setSelectedSuiteForBooking: (suite: Suite | null) => void;
  selectedSuiteForDetail: Suite | null;
  setSelectedSuiteForDetail: (suite: Suite | null) => void;
  isLookupModalOpen: boolean;
  setIsLookupModalOpen: (open: boolean) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  createReservation: (payload: BookingPayload) => Reservation;
  updateReservationStatus: (reservationId: string, status: ReservationStatus) => void;
  updateRoomCondition: (roomNumber: string, condition: RoomCondition) => void;
  lookupReservation: (query: string) => Reservation[];
  resetToDemoData: () => void;
  isRoomAvailableForDates: (suiteId: string, checkIn: string, checkOut: string) => boolean;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

const STORAGE_RESERVATIONS_KEY = 'solaria_resort_reservations_v2';
const STORAGE_ROOMS_KEY = 'solaria_resort_rooms_v2';

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [suites] = useState<Suite[]>(INITIAL_SUITES);
  
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_RESERVATIONS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to mock
    }
    return INITIAL_RESERVATIONS;
  });

  const [roomInventory, setRoomInventory] = useState<RoomInventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ROOMS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to mock
    }
    return INITIAL_ROOM_INVENTORY;
  });

  const [activeView, setActiveView] = useState<'guest' | 'staff'>('guest');
  const [selectedSuiteForBooking, setSelectedSuiteForBooking] = useState<Suite | null>(null);
  const [selectedSuiteForDetail, setSelectedSuiteForDetail] = useState<Suite | null>(null);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState<boolean>(false);

  // Default filters: 3 nights starting today
  const today = new Date();
  const defaultCheckIn = today.toISOString().split('T')[0];
  const inThreeDays = new Date(today);
  inThreeDays.setDate(inThreeDays.getDate() + 3);
  const defaultCheckOut = inThreeDays.toISOString().split('T')[0];

  const [filterState, setFilterState] = useState<FilterState>({
    checkIn: defaultCheckIn,
    checkOut: defaultCheckOut,
    guests: 2,
    tier: 'All',
    searchQuery: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_RESERVATIONS_KEY, JSON.stringify(reservations));
    } catch {
      // ignore
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ROOMS_KEY, JSON.stringify(roomInventory));
    } catch {
      // ignore
    }
  }, [roomInventory]);

  // Check if any room of this suite is available for the given dates
  const isRoomAvailableForDates = (suiteId: string, checkIn: string, checkOut: string): boolean => {
    const targetSuite = suites.find(s => s.id === suiteId);
    if (!targetSuite) return false;

    const allRoomNumbers = targetSuite.roomNumbers;
    // Find active conflicting reservations for this suite
    const reqStart = new Date(checkIn).getTime();
    const reqEnd = new Date(checkOut).getTime();

    const occupiedRoomNumbers = new Set<string>();

    reservations.forEach(res => {
      if (res.suiteId === suiteId && res.status !== 'cancelled') {
        const resStart = new Date(res.checkIn).getTime();
        const resEnd = new Date(res.checkOut).getTime();
        // Overlap condition
        if (reqStart < resEnd && reqEnd > resStart) {
          occupiedRoomNumbers.add(res.roomNumber);
        }
      }
    });

    return occupiedRoomNumbers.size < allRoomNumbers.length;
  };

  const createReservation = (payload: BookingPayload): Reservation => {
    const targetSuite = suites.find(s => s.id === payload.suiteId);
    const suiteName = targetSuite ? targetSuite.name : 'Luxury Suite';

    // Pick an available room number
    const allRooms = targetSuite ? targetSuite.roomNumbers : ['V-101'];
    const activeRoomsTaken = reservations
      .filter(r => r.suiteId === payload.suiteId && r.status !== 'cancelled')
      .map(r => r.roomNumber);
    const availableRoom = allRooms.find(rm => !activeRoomsTaken.includes(rm)) || allRooms[0];

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `SLR-${randomSuffix}`;

    const newReservation: Reservation = {
      id: newId,
      suiteId: payload.suiteId,
      suiteName,
      roomNumber: availableRoom,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      nights: payload.nights,
      guests: payload.guests,
      guestDetails: payload.guestDetails,
      addOns: payload.addOns,
      roomRateTotal: payload.roomRateTotal,
      addOnsTotal: payload.addOnsTotal,
      resortFee: payload.resortFee,
      taxes: payload.taxes,
      totalAmount: payload.totalAmount,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setReservations(prev => [newReservation, ...prev]);

    // Update room inventory
    setRoomInventory(prev => prev.map(item => {
      if (item.roomNumber === availableRoom) {
        return {
          ...item,
          currentReservationId: newId,
          currentGuestName: payload.guestDetails.fullName,
          currentCheckOut: payload.checkOut,
          condition: 'clean'
        };
      }
      return item;
    }));

    return newReservation;
  };

  const updateReservationStatus = (reservationId: string, status: ReservationStatus) => {
    setReservations(prev => prev.map(res => {
      if (res.id === reservationId) {
        return { ...res, status };
      }
      return res;
    }));

    // Update room inventory condition accordingly
    const target = reservations.find(r => r.id === reservationId);
    if (!target) return;

    setRoomInventory(prev => prev.map(room => {
      if (room.roomNumber === target.roomNumber) {
        if (status === 'checked_in') {
          return {
            ...room,
            currentReservationId: target.id,
            currentGuestName: target.guestDetails.fullName,
            currentCheckOut: target.checkOut,
            condition: 'clean'
          };
        }
        if (status === 'checked_out') {
          return {
            ...room,
            currentReservationId: undefined,
            currentGuestName: undefined,
            currentCheckOut: undefined,
            condition: 'turn_down'
          };
        }
        if (status === 'cancelled') {
          return {
            ...room,
            currentReservationId: undefined,
            currentGuestName: undefined,
            currentCheckOut: undefined
          };
        }
      }
      return room;
    }));
  };

  const updateRoomCondition = (roomNumber: string, condition: RoomCondition) => {
    setRoomInventory(prev => prev.map(room => {
      if (room.roomNumber === roomNumber) {
        return { ...room, condition };
      }
      return room;
    }));
  };

  const lookupReservation = (query: string): Reservation[] => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return reservations.filter(r => 
      r.id.toLowerCase().includes(q) ||
      r.guestDetails.email.toLowerCase().includes(q) ||
      r.guestDetails.fullName.toLowerCase().includes(q) ||
      r.roomNumber.toLowerCase().includes(q)
    );
  };

  const resetToDemoData = () => {
    setReservations(INITIAL_RESERVATIONS);
    setRoomInventory(INITIAL_ROOM_INVENTORY);
    localStorage.removeItem(STORAGE_RESERVATIONS_KEY);
    localStorage.removeItem(STORAGE_ROOMS_KEY);
  };

  return (
    <HotelContext.Provider
      value={{
        suites,
        reservations,
        roomInventory,
        activeView,
        setActiveView,
        selectedSuiteForBooking,
        setSelectedSuiteForBooking,
        selectedSuiteForDetail,
        setSelectedSuiteForDetail,
        isLookupModalOpen,
        setIsLookupModalOpen,
        filterState,
        setFilterState,
        createReservation,
        updateReservationStatus,
        updateRoomCondition,
        lookupReservation,
        resetToDemoData,
        isRoomAvailableForDates,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
