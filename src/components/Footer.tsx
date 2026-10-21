import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 px-6 border-t border-[#3D3A37]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-white/10">
          <div>
            <div className="font-serif text-2xl tracking-[0.2em] font-normal uppercase">
              Solaria Haven
            </div>
            <div className="text-xs tracking-[0.25em] text-[#A8A29E] uppercase mt-1 font-sans">
              Boutique Ocean Sanctuary &amp; Coastal Reserve
            </div>
            <p className="text-xs text-[#A8A29E] max-w-sm mt-3 leading-relaxed">
              Carretera Costera Km 54, Costa Careyes, Jalisco, Mexico. Accessible by private helipad and luxury chauffeur transfer.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-xs text-[#D6CEC5]">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#9C532B] font-semibold mb-2">Concierge &amp; Inquiries</div>
              <div className="font-mono text-white">+52 315 351 0200</div>
              <div className="text-[#A8A29E] mt-0.5">concierge@solariahaven.com</div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#9C532B] font-semibold mb-2">Arrival &amp; Departure</div>
              <div>Check-in: 15:00 onwards</div>
              <div>Check-out: 12:00 noon</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8A29E] gap-4">
          <div>
            &copy; {new Date().getFullYear()} Solaria Haven Hospitality Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Marine Ecological Sanctuary Certified</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span>Zero-Single-Use Plastics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
