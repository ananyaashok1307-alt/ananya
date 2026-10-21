import { Suite, AddOnExperience, Reservation, RoomInventoryItem } from '../types/hotel';

// Generated authentic high-resolution imagery
export const HERO_IMAGE = '/src/assets/images/solaria_hero_pavilion_1792559608870.jpg';
export const OCEANFRONT_VILLA_IMAGE = '/src/assets/images/suite_oceanfront_villa_1792559609048.jpg';
export const GARDEN_TERRACE_IMAGE = '/src/assets/images/suite_garden_terrace_1792559609022.jpg';
export const CLIFFSIDE_POOL_IMAGE = '/src/assets/images/suite_cliffside_pool_1792559609732.jpg';

export const INITIAL_SUITES: Suite[] = [
  {
    id: 'oceanfront-sanctuary-villa',
    name: 'Oceanfront Sanctuary Villa',
    tagline: 'Private infinity plunge pool cantilevered over crystal azure waters',
    tier: 'Villa',
    basePrice: 1450,
    sizeSqFt: 1850,
    maxGuests: 3,
    bedType: 'Custom California King',
    view: 'Unobstructed Panoramic Ocean',
    amenities: [
      'Private 30ft Infinity Plunge Pool',
      'Outdoor Teak Rain Shower',
      'Dedicated 24/7 Butler Service',
      'Dyson Supersonic Care Suite',
      'Complimentary Wine Cellar Selection',
      'Custom Diptyque Bath Amenities'
    ],
    description: 'Carved seamlessly into the sun-drenched limestone bluff, the Oceanfront Sanctuary Villa pairs minimalist travertine finishes with sweeping floor-to-ceiling glass sliding panels that frame continuous horizon views. Featuring private sunbathing decks and bespoke linen daybeds.',
    imageUrl: OCEANFRONT_VILLA_IMAGE,
    roomNumbers: ['V-101', 'V-102', 'V-103'],
    featured: true,
  },
  {
    id: 'cliffside-pool-pavilion',
    name: 'Cliffside Pool Pavilion',
    tagline: 'Dramatic elevated perches with shaded linen cabanas and sea breezes',
    tier: 'Pavilion',
    basePrice: 1280,
    sizeSqFt: 1600,
    maxGuests: 2,
    bedType: 'King Four-Poster Bed',
    view: 'High-Altitude Coastal & Cove',
    amenities: [
      'Perched Heated Saltwater Pool',
      'Shaded Linen Cabana Lounge',
      'Integrated Bang & Olufsen Acoustics',
      'Handcrafted Stone Soaking Bath',
      'In-Pavilion Daily Breakfast Service',
      'Private Yoga Deck'
    ],
    description: 'An architectural testament to quiet luxury, Pavilion Nine towers above the tranquil cove. Natural timber columns blend with woven rattan textures, offering guests total acoustic seclusion and a floating perspective above the tides.',
    imageUrl: CLIFFSIDE_POOL_IMAGE,
    roomNumbers: ['P-201', 'P-202'],
    featured: true,
  },
  {
    id: 'botanical-garden-terrace',
    name: 'Botanical Garden Terrace Suite',
    tagline: 'A private frangipani sanctuary with monolithic hand-carved stone bath',
    tier: 'Suite',
    basePrice: 890,
    sizeSqFt: 1250,
    maxGuests: 2,
    bedType: 'Grand King Plush Bed',
    view: 'Lush Tropical Palm Reserve',
    amenities: [
      'Hand-Carved Riverstone Outdoor Tub',
      'Private Courtyard with Lanterns',
      'Organic Herbal Tea Apothecary',
      'Double Travertine Vanity',
      'Complimentary Evening Turn-down Elixirs',
      'Direct Private Path to Spa'
    ],
    description: 'Enveloped by century-old tropical palms, native bougainvillea, and blooming white frangipani, this secluded terrace suite is tailored for deep restoration. Natural slate flagstones, warm teak joinery, and an open-air bathing sanctum.',
    imageUrl: GARDEN_TERRACE_IMAGE,
    roomNumbers: ['S-301', 'S-302', 'S-303'],
    featured: false,
  },
  {
    id: 'solaria-royal-penthouse',
    name: 'The Solaria Royal Penthouse',
    tagline: 'The pinnacle of coastal majesty spanning the entire upper promontory',
    tier: 'Penthouse',
    basePrice: 2800,
    sizeSqFt: 3200,
    maxGuests: 6,
    bedType: 'Two Grand King Suites + Twin Salon',
    view: '360° Coastal Promontory & Sunsets',
    amenities: [
      'Expansive Rooftop Reflection Terrace',
      'Private Chef Demonstration Kitchen',
      'Chilled Plunge & Hot Hydrotherapy Spas',
      'Private Dedicated Chauffeur Service',
      'Bespoke Mixology Station',
      'Priority Yacht & Dining Reservations'
    ],
    description: 'Commanding the highest elevation of the Solaria headland, the Royal Penthouse represents the resort’s crowning architectural achievement. Vaulted limewash ceilings, rare marble fireplaces, and expansive open-air living pavilions framed by sunset horizons.',
    imageUrl: HERO_IMAGE,
    roomNumbers: ['PH-01'],
    featured: true,
  },
  {
    id: 'azure-terrace-suite',
    name: 'Azure Terrace Suite',
    tagline: 'Effortless beachfront proximity with quiet shaded reading verandas',
    tier: 'Suite',
    basePrice: 950,
    sizeSqFt: 1350,
    maxGuests: 3,
    bedType: 'King Bed + Daybed Nook',
    view: 'Direct Sandy Cove & Breakers',
    amenities: [
      'Direct Boardwalk Beach Access',
      'Private Shaded Reading Veranda',
      'Custom Bar with Artisanal Botanicals',
      'Walk-In Dressing Room',
      'Twice-Daily Housekeeping',
      'Complimentary Snorkel & Paddleboard Gear'
    ],
    description: 'Just footsteps from the gentle surf of Solaria Cove, the Azure Terrace Suite lets you wake to the rhythm of ocean waves. Earthy limewash walls, brushed bronze hardware, and wide outdoor verandas draped in sheer linen.',
    imageUrl: OCEANFRONT_VILLA_IMAGE,
    roomNumbers: ['S-104', 'S-105'],
    featured: false,
  },
  {
    id: 'cove-pool-residence',
    name: 'Cove Cliffside Villa',
    tagline: 'Two-tier private residence with heated plunge and alfresco dining terrace',
    tier: 'Villa',
    basePrice: 1750,
    sizeSqFt: 2100,
    maxGuests: 4,
    bedType: 'Two Master King Suites',
    view: 'Direct Marine Reserve & Sea Arches',
    amenities: [
      'Two-Tier Private Waterfall Pool',
      'Alfresco 8-Person Dining Pergola',
      'Private Sommelier Wine Fridge',
      'Outdoor Firepit with Ocean Seating',
      'Personal Resort Buggy Included',
      'Subtle In-Villa Sound Environment'
    ],
    description: 'Designed for families or paired couples who value undisturbed privacy. Features dual master pavilions connected by a breezy open-air living breezeway and cantilevered sun decks overlooking the marine reserve.',
    imageUrl: CLIFFSIDE_POOL_IMAGE,
    roomNumbers: ['V-106'],
    featured: false,
  }
];

export const RESORT_ADDONS: AddOnExperience[] = [
  {
    id: 'sunset-catamaran',
    name: 'Private Sunset Catamaran Charter',
    tagline: '3-hour private coastal sail with vintage champagne and fresh oysters',
    description: 'Board Solaria’s 48-foot luxury catamaran for a bespoke cruise around the hidden rocky grottoes. Includes chilled Krug champagne, line-caught sashimi, and private skipper.',
    price: 650,
    pricingType: 'per_stay',
    category: 'Adventure'
  },
  {
    id: 'sacred-stone-spa',
    name: 'Sacred Stone Holistic Massage (90 min)',
    tagline: 'Heated volcanic stones and wild coastal botanicals in open-air cabana',
    description: 'A deeply restorative signature massage utilizing warm basal stones, organic rosemary oil, and ancient acoustic sound bowls overlooking the sea.',
    price: 240,
    pricingType: 'per_guest',
    category: 'Wellness'
  },
  {
    id: 'chef-cliffside-tasting',
    name: 'Seven-Course Cliffside Tasting Dinner',
    tagline: 'Private candlelit cliff edge table prepared by Executive Chef Julian Vance',
    description: 'An intimate culinary journey featuring fresh catch, foraged sea greens, and rare vintage pairings, served at our private cliff lantern table for two.',
    price: 320,
    pricingType: 'per_guest',
    category: 'Culinary'
  },
  {
    id: 'helicopter-transfer',
    name: 'Helicopter Sanctuary Transfer',
    tagline: '18-minute scenic aerial transit from international airport to resort helipad',
    description: 'Bypass all road travel with private executive helicopter arrival, scenic coastline approach, and seamless golf-buggy luggage escort direct to your suite.',
    price: 850,
    pricingType: 'per_stay',
    category: 'Concierge'
  },
  {
    id: 'cellar-sommelier-tasting',
    name: 'Private Cellar Rare Vintage Journey',
    tagline: 'Guided tasting of reserve Old World vintages with artisanal raw milk cheeses',
    description: 'Explore Solaria’s subterranean limestone cellar guided by Head Sommelier Élodie Martin. Taste six library vintages paired with cured delicacies.',
    price: 190,
    pricingType: 'per_guest',
    category: 'Culinary'
  }
];

export const INITIAL_ROOM_INVENTORY: RoomInventoryItem[] = [
  { roomNumber: 'V-101', suiteId: 'oceanfront-sanctuary-villa', suiteName: 'Oceanfront Sanctuary Villa', floor: 1, condition: 'clean', currentReservationId: 'SLR-1094', currentGuestName: 'Elena Rostova', currentCheckOut: '2026-10-24' },
  { roomNumber: 'V-102', suiteId: 'oceanfront-sanctuary-villa', suiteName: 'Oceanfront Sanctuary Villa', floor: 1, condition: 'turn_down', currentReservationId: 'SLR-1102', currentGuestName: 'Marcus Sterling', currentCheckOut: '2026-10-23' },
  { roomNumber: 'V-103', suiteId: 'oceanfront-sanctuary-villa', suiteName: 'Oceanfront Sanctuary Villa', floor: 1, condition: 'clean' },
  { roomNumber: 'P-201', suiteId: 'cliffside-pool-pavilion', suiteName: 'Cliffside Pool Pavilion', floor: 2, condition: 'clean', currentReservationId: 'SLR-1088', currentGuestName: 'Sophia & Liam Vance', currentCheckOut: '2026-10-25' },
  { roomNumber: 'P-202', suiteId: 'cliffside-pool-pavilion', suiteName: 'Cliffside Pool Pavilion', floor: 2, condition: 'inspecting' },
  { roomNumber: 'S-301', suiteId: 'botanical-garden-terrace', suiteName: 'Botanical Garden Terrace Suite', floor: 3, condition: 'clean', currentReservationId: 'SLR-1115', currentGuestName: 'Julian Chen', currentCheckOut: '2026-10-22' },
  { roomNumber: 'S-302', suiteId: 'botanical-garden-terrace', suiteName: 'Botanical Garden Terrace Suite', floor: 3, condition: 'clean' },
  { roomNumber: 'S-303', suiteId: 'botanical-garden-terrace', suiteName: 'Botanical Garden Terrace Suite', floor: 3, condition: 'maintenance' },
  { roomNumber: 'PH-01', suiteId: 'solaria-royal-penthouse', suiteName: 'The Solaria Royal Penthouse', floor: 4, condition: 'clean', currentReservationId: 'SLR-1070', currentGuestName: 'Lord Alistair Davenport', currentCheckOut: '2026-10-27' },
  { roomNumber: 'S-104', suiteId: 'azure-terrace-suite', suiteName: 'Azure Terrace Suite', floor: 1, condition: 'clean' },
  { roomNumber: 'S-105', suiteId: 'azure-terrace-suite', suiteName: 'Azure Terrace Suite', floor: 1, condition: 'turn_down' },
  { roomNumber: 'V-106', suiteId: 'cove-pool-residence', suiteName: 'Cove Cliffside Villa', floor: 2, condition: 'clean', currentReservationId: 'SLR-1120', currentGuestName: 'Isabella & Mateo Cruz', currentCheckOut: '2026-10-26' }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'SLR-1094',
    suiteId: 'oceanfront-sanctuary-villa',
    suiteName: 'Oceanfront Sanctuary Villa',
    roomNumber: 'V-101',
    checkIn: '2026-10-20',
    checkOut: '2026-10-24',
    nights: 4,
    guests: { adults: 2, children: 0 },
    guestDetails: {
      fullName: 'Elena Rostova',
      email: 'elena.rostova@luxurytravel.ch',
      phone: '+41 79 482 1920',
      specialRequests: 'Prefers quiet morning turndown after 11am. Chilled sparkling water upon arrival.',
      estimatedArrivalTime: '14:00',
      pillowPreference: 'Lavender Infused'
    },
    addOns: [
      { id: 'sunset-catamaran', name: 'Private Sunset Catamaran Charter', price: 650, pricingType: 'per_stay', calculatedPrice: 650 },
      { id: 'sacred-stone-spa', name: 'Sacred Stone Holistic Massage (90 min)', price: 240, pricingType: 'per_guest', calculatedPrice: 480 }
    ],
    roomRateTotal: 5800,
    addOnsTotal: 1130,
    resortFee: 831.6, // 12%
    taxes: 554.4, // 8%
    totalAmount: 8316,
    status: 'checked_in',
    createdAt: '2026-10-04T14:32:00Z'
  },
  {
    id: 'SLR-1102',
    suiteId: 'oceanfront-sanctuary-villa',
    suiteName: 'Oceanfront Sanctuary Villa',
    roomNumber: 'V-102',
    checkIn: '2026-10-20',
    checkOut: '2026-10-23',
    nights: 3,
    guests: { adults: 2, children: 1 },
    guestDetails: {
      fullName: 'Marcus Sterling',
      email: 'm.sterling@capitalpartners.co.uk',
      phone: '+44 20 7946 0912',
      specialRequests: 'High chair and extra organic cot pillows requested.',
      estimatedArrivalTime: '16:30',
      pillowPreference: 'Organic Goose Down'
    },
    addOns: [
      { id: 'helicopter-transfer', name: 'Helicopter Sanctuary Transfer', price: 850, pricingType: 'per_stay', calculatedPrice: 850 }
    ],
    roomRateTotal: 4350,
    addOnsTotal: 850,
    resortFee: 624,
    taxes: 416,
    totalAmount: 6240,
    status: 'checked_in',
    createdAt: '2026-10-08T09:15:00Z'
  },
  {
    id: 'SLR-1088',
    suiteId: 'cliffside-pool-pavilion',
    suiteName: 'Cliffside Pool Pavilion',
    roomNumber: 'P-201',
    checkIn: '2026-10-21',
    checkOut: '2026-10-25',
    nights: 4,
    guests: { adults: 2, children: 0 },
    guestDetails: {
      fullName: 'Sophia & Liam Vance',
      email: 'sophia.vance@studioarch.com',
      phone: '+1 415 889 2201',
      specialRequests: 'Celebrating 10th anniversary. Bottle of blanc de blancs chilled please.',
      estimatedArrivalTime: '15:00',
      pillowPreference: 'Hypoallergenic Bamboo'
    },
    addOns: [
      { id: 'chef-cliffside-tasting', name: 'Seven-Course Cliffside Tasting Dinner', price: 320, pricingType: 'per_guest', calculatedPrice: 640 }
    ],
    roomRateTotal: 5120,
    addOnsTotal: 640,
    resortFee: 691.2,
    taxes: 460.8,
    totalAmount: 6912,
    status: 'confirmed',
    createdAt: '2026-10-10T11:45:00Z'
  },
  {
    id: 'SLR-1115',
    suiteId: 'botanical-garden-terrace',
    suiteName: 'Botanical Garden Terrace Suite',
    roomNumber: 'S-301',
    checkIn: '2026-10-18',
    checkOut: '2026-10-22',
    nights: 4,
    guests: { adults: 1, children: 0 },
    guestDetails: {
      fullName: 'Julian Chen',
      email: 'j.chen@apexsound.org',
      phone: '+1 212 901 4432',
      specialRequests: 'Artist writing residency, requested daily jasmine blossom tea refills.',
      estimatedArrivalTime: '13:00',
      pillowPreference: 'Ergonomic Memory Foam'
    },
    addOns: [
      { id: 'sacred-stone-spa', name: 'Sacred Stone Holistic Massage (90 min)', price: 240, pricingType: 'per_guest', calculatedPrice: 240 }
    ],
    roomRateTotal: 3560,
    addOnsTotal: 240,
    resortFee: 456,
    taxes: 304,
    totalAmount: 4560,
    status: 'checked_in',
    createdAt: '2026-10-01T18:20:00Z'
  },
  {
    id: 'SLR-1070',
    suiteId: 'solaria-royal-penthouse',
    suiteName: 'The Solaria Royal Penthouse',
    roomNumber: 'PH-01',
    checkIn: '2026-10-22',
    checkOut: '2026-10-27',
    nights: 5,
    guests: { adults: 4, children: 0 },
    guestDetails: {
      fullName: 'Lord Alistair Davenport',
      email: 'adavenport@estates-davenport.uk',
      phone: '+44 131 496 0888',
      specialRequests: 'Private chef briefing required at 17:00 on arrival day. All seafood locally wild caught.',
      estimatedArrivalTime: '17:00',
      pillowPreference: 'Organic Goose Down'
    },
    addOns: [
      { id: 'helicopter-transfer', name: 'Helicopter Sanctuary Transfer', price: 850, pricingType: 'per_stay', calculatedPrice: 850 },
      { id: 'cellar-sommelier-tasting', name: 'Private Cellar Rare Vintage Journey', price: 190, pricingType: 'per_guest', calculatedPrice: 760 }
    ],
    roomRateTotal: 14000,
    addOnsTotal: 1610,
    resortFee: 1873.2,
    taxes: 1248.8,
    totalAmount: 18732,
    status: 'confirmed',
    createdAt: '2026-09-28T16:00:00Z'
  },
  {
    id: 'SLR-1120',
    suiteId: 'cove-pool-residence',
    suiteName: 'Cove Cliffside Villa',
    roomNumber: 'V-106',
    checkIn: '2026-10-21',
    checkOut: '2026-10-26',
    nights: 5,
    guests: { adults: 2, children: 2 },
    guestDetails: {
      fullName: 'Isabella & Mateo Cruz',
      email: 'isabella.cruz@madridgroup.es',
      phone: '+34 91 582 3341',
      specialRequests: 'Two child life-vests and snorkeling gear fitted in advance.',
      estimatedArrivalTime: '14:30',
      pillowPreference: 'Lavender Infused'
    },
    addOns: [
      { id: 'sunset-catamaran', name: 'Private Sunset Catamaran Charter', price: 650, pricingType: 'per_stay', calculatedPrice: 650 }
    ],
    roomRateTotal: 8750,
    addOnsTotal: 650,
    resortFee: 1128,
    taxes: 752,
    totalAmount: 11280,
    status: 'confirmed',
    createdAt: '2026-10-12T10:05:00Z'
  }
];
