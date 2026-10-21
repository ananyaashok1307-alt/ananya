export type SuiteTier = 'Suite' | 'Villa' | 'Pavilion' | 'Penthouse';

export interface Suite {
  id: string;
  name: string;
  tagline: string;
  tier: SuiteTier;
  basePrice: number; // USD per night
  sizeSqFt: number;
  maxGuests: number;
  bedType: string;
  view: string;
  amenities: string[];
  description: string;
  imageUrl: string;
  roomNumbers: string[];
  featured?: boolean;
}

export type PricingType = 'per_stay' | 'per_guest' | 'per_night';

export interface AddOnExperience {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  pricingType: PricingType;
  category: 'Wellness' | 'Culinary' | 'Adventure' | 'Concierge';
}

export type ReservationStatus = 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';

export interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  estimatedArrivalTime?: string;
  pillowPreference?: 'Organic Goose Down' | 'Ergonomic Memory Foam' | 'Lavender Infused' | 'Hypoallergenic Bamboo';
}

export interface SelectedAddOn {
  id: string;
  name: string;
  price: number;
  pricingType: PricingType;
  calculatedPrice: number;
}

export interface Reservation {
  id: string; // e.g. SLR-4821
  suiteId: string;
  suiteName: string;
  roomNumber: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  guests: {
    adults: number;
    children: number;
  };
  guestDetails: GuestDetails;
  addOns: SelectedAddOn[];
  roomRateTotal: number;
  addOnsTotal: number;
  resortFee: number;
  taxes: number;
  totalAmount: number;
  status: ReservationStatus;
  createdAt: string;
}

export type RoomCondition = 'clean' | 'turn_down' | 'inspecting' | 'maintenance';

export interface RoomInventoryItem {
  roomNumber: string;
  suiteId: string;
  suiteName: string;
  floor: number;
  condition: RoomCondition;
  currentReservationId?: string;
  currentGuestName?: string;
  currentCheckOut?: string;
}

export interface FilterState {
  checkIn: string;
  checkOut: string;
  guests: number;
  tier: string;
  searchQuery: string;
}
