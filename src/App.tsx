import React from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { Navbar } from './components/Navbar';
import { GuestHero } from './components/GuestHero';
import { SuiteCatalog } from './components/SuiteCatalog';
import { ExperiencesSection } from './components/ExperiencesSection';
import { StaffDashboard } from './components/StaffDashboard';
import { SuiteDetailModal } from './components/SuiteDetailModal';
import { BookingFlowModal } from './components/BookingFlowModal';
import { MyStayLookupModal } from './components/MyStayLookupModal';
import { Footer } from './components/Footer';

const MainLayout: React.FC = () => {
  const { activeView } = useHotel();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      <Navbar />

      <main className="flex-1">
        {activeView === 'guest' ? (
          <>
            <GuestHero />
            <SuiteCatalog />
            <ExperiencesSection />
            <Footer />
          </>
        ) : (
          <StaffDashboard />
        )}
      </main>

      {/* Global Modals */}
      <SuiteDetailModal />
      <BookingFlowModal />
      <MyStayLookupModal />
    </div>
  );
};

export default function App() {
  return (
    <HotelProvider>
      <MainLayout />
    </HotelProvider>
  );
}
