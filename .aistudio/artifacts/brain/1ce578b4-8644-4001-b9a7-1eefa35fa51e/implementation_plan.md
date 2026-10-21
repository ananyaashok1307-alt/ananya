# Solaria Haven - Luxury Boutique Resort & Reservation System

An editorial, high-touch reservation platform and front-desk management system designed for **Solaria Haven**, a secluded luxury coastal boutique resort. This system delivers an effortless guest booking journey—from suite discovery and customized stay add-ons to instant confirmation and digital itinerary access—paired with a staff operations dashboard for front-desk reception, housekeeping status, check-in/out workflows, and live occupancy telemetry.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Summary of Confirmed Choices from Phase 1 Clarification**:
> - **Property Archetype**: Luxury boutique resort with dedicated suites, villas, private pools, and curated guest amenities.
> - **Core Dual Role**: Comprehensive guest booking journey (date selection, guest count, suite filtering, amenity add-ons, guest checkout) + front-desk staff management console (reservation table, room inventory matrix, instant check-in/out actions, revenue metrics).
> - **Visual Identity**: Warm editorial luxury aesthetic with earthy tones (sand dune `#FBF9F5`, warm ecru `#F3EFE6`, deep espresso `#231F1E`, rich olive `#3D4336`, and warm amber-clay `#A0522D`), paired with Cormorant Garamond display serif typography and Plus Jakarta Sans body font.

---

## 1. Overview & Core Concept

- **What It Does**: 
  - **Guest Experience**: Guests explore curated suites (Oceanfront Villa, Garden Terrace Suite, Cliffside Pool Pavilion, Royal Penthouse), select check-in/check-out dates and party sizes, customize experiences (sunset yacht charter, private chef dining, bespoke spa rituals), review transparent itemized costs (nightly rates, resort fees, local taxes), and complete simulated instant bookings with confirmation codes.
  - **Staff Operations & Front-Desk**: Front-desk operators and resort managers switch effortlessly into the "Staff Operations Console" to monitor live occupancy rate, daily arrivals/departures, room maintenance/housekeeping status, search/filter active bookings, modify dates or cancel reservations, and perform one-click guest check-in and check-out.
  - **My Stays / Guest Portal**: Guests can look up their booking by reservation code or email to review their stay itinerary, add concierge requests, and download a printable stay voucher.

- **Target Audience / Persona**:
  - Discerning travelers seeking a serene, high-end sanctuary with tailored hospitality.
  - Front-desk concierge, room inventory controllers, and resort general managers.

- **Key Value**:
  - Frictionless booking with real-time room availability calculation and dynamic price computation based on stay duration.
  - Elimination of fragmented front-desk tasks through unified room status controls and booking lifecycle management.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Guest Discovery & Availability Search**:
   - Guest arrives on an atmospheric editorial hero section showcasing resort views and an integrated, single-row search bar (Check-in, Check-out, Guests, Suite Type filter).
   - Dynamic date-range calculator calculates exact nights and live availability across resort suites.

2. **Suite Showcase & Detailed Inspection**:
   - Curated suite collection featuring high-resolution architectural imagery, square footage, bed configuration, maximum guests, ocean/garden view orientation, and signature amenities (private plunge pool, outdoor rain shower, dedicated butler).
   - "Suite Details" modal or drawer providing high-resolution image galleries, architectural floorplan highlights, complimentary inclusions, and guest policies.

3. **Multi-Step Seamless Booking & Curated Add-ons**:
   - **Step 1: Dates & Guests**: Verify stay duration and guest numbers.
   - **Step 2: Curated Resort Experiences**: Optional add-ons with transparent per-stay/per-guest pricing (e.g., Champagne Sunset Cruise, In-Suite Spa Treatment, Farm-to-Table Tasting Menu, Private Airport Transfer).
   - **Step 3: Guest Details & Special Requests**: Name, email, phone, arrival notes, dietary restrictions, dietary/pillow preferences.
   - **Step 4: Instant Confirmation**: Zero-friction simulated payment, instant booking reference generation (e.g., `SLR-9842`), printable confirmation summary, and calendar invite trigger.

4. **Staff Operations & Inventory Console**:
   - Top-bar role switcher ("Guest Experience" vs. "Staff Management").
   - **Overview KPIs**: Occupancy Rate (%), Today's Check-ins, Today's Check-outs, Total Revenue booked.
   - **Interactive Reservation Roster**: Searchable by guest name, suite, or booking code. Filter by status: *Confirmed*, *Checked In*, *Checked Out*, *Cancelled*.
   - **Direct Actions**: Front-desk staff can toggle "Check In", "Check Out", cancel reservations, or update room housekeeping state (*Clean & Ready*, *Occupied*, *Turn-down in Progress*, *Deep Cleaning*).
   - **Add Walk-In / Manual Reservation**: Fast modal allowing front-desk agents to book walk-in guests directly into available suites.

### Visual Identity & Theme

- **Aesthetic Direction**: Warm Editorial Luxury (reminiscent of Aman, Six Senses, and Architectural Digest).
- **Color Palette & Discipline (60-30-10 Rule)**:
  - *Dominant Neutral Canvas (60%)*: Warm textured off-white / parchment (`#FAF8F5` background, `#FFFFFF` clean structural cards).
  - *Structural Surfaces & Borders (30%)*: Muted taupe/linen borders (`#E7E1D8`), soft stone accents (`#ECE6DC`), rich espresso typography (`#1C1917` and `#44403C`).
  - *Accent Budget (10%)*: Deep forest moss (`#2E3D2E`) and warm terra-amber (`#9C532B`) for primary CTAs, active filters, and subtle focus states.
- **Typography & Scale**:
  - *Display / Headlines*: `Cormorant Garamond` (Google Font serif) for editorial warmth, dignity, and calm luxury.
  - *Body Prose & UI*: `Plus Jakarta Sans` for ultra-clean legibility, clear line heights (1.5–1.6), and accessible contrast.
  - *Data & Financial Figures*: `font-mono tabular-nums` for dates, room numbers, prices, and reservation IDs to eliminate visual jitter.
- **Zero-Pill Restraint**:
  - Metadata (e.g., `450 sq ft · King Bed · Ocean View · Up to 3 Guests`) rendered cleanly with typographic interpuncts (`·`), never enclosed in garish pill tags.
  - Status indicators display clean typography with accessible text labels and subtle dot markers, never neon badges.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual-Role Switcher (Guest Mode vs. Staff Console)**:
  - *Chosen Approach*: A discreet, intentional header switch allowing testers and users to experience both the customer booking journey and the back-office hotel management system seamlessly.
  - *Why*: Provides comprehensive end-to-end hotel operations without needing separate siloed portals or authentication friction.
  - *Alternatives Considered*: Creating only a guest-facing site would leave room management unaddressed; creating only an admin portal misses the high-aesthetic luxury booking experience.

- **Decision 2: Persistent State Architecture via LocalStorage + Realistic Initial Seed**:
  - *Chosen Approach*: Reactive TypeScript state management backed by `localStorage` persistence, pre-seeded with realistic current-week reservations, suites, and occupancy.
  - *Why*: Instant reactivity, fast zero-latency updates, zero external server dependencies, and user edits (new bookings, check-in status toggles, cancellations) persist across page refreshes.

- **Decision 3: Image Asset Strategy**:
  - *Chosen Approach*: Use AI Studio's `generate_image` tool to create authentic high-resolution luxury resort visuals (villa pool pavilion, oceanfront suite, garden terrace, spa retreat) combined with resilient CSS fallbacks.
  - *Why*: Eliminates fragile external image URLs (`unsplash.com`, `picsum`) that break in evaluation environments, guaranteeing 100% visual integrity.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Solaria Haven Web App                           │
├───────────────────────────────────┬────────────────────────────────────┤
│           Guest View              │       Staff Operations Console     │
│  - Resort Hero & Story            │  - Live Occupancy & KPIs           │
│  - Real-time Date & Guest Picker  │  - Reservation Roster & Search     │
│  - Suite Catalog & Filter Bar     │  - Room Inventory & Clean Status   │
│  - Suite Detail Modal & Gallery   │  - 1-Click Check-In / Check-Out    │
│  - Multi-Step Booking Flow        │  - Walk-in Reservation Creator     │
│  - Curated Add-on Experiences     │                                    │
│  - Instant Confirmation Receipt   │                                    │
├───────────────────────────────────┴────────────────────────────────────┤
│                     Hotel State & Storage Layer                        │
│  - Suites Inventory (Rooms, Specs, Pricing, Amenities, Images)         │
│  - Reservations Store (Guest info, Dates, Suite, Add-ons, Status)      │
│  - LocalStorage Synchronization & Date Availability Engine             │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Entities & Schema

1. **Suite**:
   - `id`: string (`"ocean-villa"`, `"garden-suite"`, etc.)
   - `name`: string
   - `tagline`: string
   - `tier`: `"Suite"` | `"Villa"` | `"Pavilion"` | `"Penthouse"`
   - `basePrice`: number (USD per night)
   - `sizeSqFt`: number
   - `maxGuests`: number
   - `bedType`: string
   - `view`: string
   - `amenities`: string[]
   - `description`: string
   - `imageUrl`: string
   - `roomNumbers`: string[]

2. **Reservation**:
   - `id`: string (`"SLR-XXXX"`)
   - `suiteId`: string
   - `suiteName`: string
   - `roomNumber`: string
   - `checkIn`: string (ISO date `YYYY-MM-DD`)
   - `checkOut`: string (ISO date `YYYY-MM-DD`)
   - `nights`: number
   - `guests`: { adults: number; children: number }
   - `guestDetails`: { fullName: string; email: string; phone: string; specialRequests?: string }
   - `addOns`: { id: string; name: string; price: number }[]
   - `totalAmount`: number
   - `status`: `"confirmed"` | `"checked_in"` | `"checked_out"` | `"cancelled"`
   - `createdAt`: string

3. **RoomStatus**:
   - `roomNumber`: string
   - `suiteId`: string
   - `floor`: number
   - `condition`: `"clean"` | `"turn_down"` | `"inspecting"` | `"maintenance"`
   - `currentReservationId`?: string

### Step-by-Step Execution Plan

1. **Visual Asset Generation**:
   - Generate 4 high-fidelity architectural images using `generate_image` (Hero Oceanfront Pavilion, Garden Terrace Suite, Private Plunge Pool Villa, Royal Sunset Penthouse).
2. **Design Tokens & Fonts**:
   - Load Cormorant Garamond and Plus Jakarta Sans in `index.html`.
   - Configure Tailwind with warm earthy luxury color palette.
3. **Core State & Mock Seed Engine**:
   - Implement persistent data models with pre-populated luxury suites and realistic upcoming reservations.
4. **Guest Experience Components**:
   - Navigation bar complying with Top Bar Contract (Wordmark, 4 links, View Mode CTA).
   - Date range selector and live guest search bar.
   - Suite listing cards with transparent pricing, specifications, and quick details.
   - Comprehensive multi-step booking modal with experience add-ons and voucher generation.
5. **Staff Operations Dashboard**:
   - Occupancy metrics, daily turnover counters, and revenue stats.
   - Real-time reservation table with instant status mutations (Check-in, Check-out, Cancel).
   - Room inventory status board with housekeeping condition toggles.
6. **Polishing & Verification**:
   - Full keyboard accessibility, error boundaries, empty states, and compilation verification via `compile_applet`.
