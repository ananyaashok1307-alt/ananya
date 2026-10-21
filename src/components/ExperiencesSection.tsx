import React from 'react';
import { RESORT_ADDONS } from '../data/mockHotelData';
import { Sparkles, Compass, Utensils, HeartHandshake, Shield } from 'lucide-react';

export const ExperiencesSection: React.FC = () => {
  return (
    <div className="space-y-24">
      {/* Curated Experiences Showcase */}
      <section id="experiences" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E7E1D8]">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#9C532B] uppercase mb-2">
            Tailored Itineraries
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] tracking-tight">
            Curated Resort Add-Ons &amp; Bespoke Moments
          </h2>
          <p className="mt-3 text-sm text-[#78716C]">
            Available as tailored additions to any suite reservation. Our private concierges ensure seamless execution from sea to table.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESORT_ADDONS.map(addon => (
            <div
              key={addon.id}
              className="bg-white border border-[#E7E1D8] rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#9C532B] uppercase tracking-wider font-semibold mb-2">
                  <span>{addon.category}</span>
                  <span className="text-[#78716C] font-mono text-[11px] font-normal">
                    {addon.pricingType === 'per_guest' ? 'Per Guest' : 'Per Stay'}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#1C1917] font-normal leading-snug mb-2">
                  {addon.name}
                </h3>
                <p className="text-xs text-[#78716C] font-light italic mb-4">
                  &ldquo;{addon.tagline}&rdquo;
                </p>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {addon.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F3EFE6] flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-[#78716C]">Inclusion Rate</span>
                <div className="font-serif text-2xl text-[#1C1917] tabular-nums">
                  ${addon.price.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Estate / Philosophy Narrative */}
      <section id="sanctuary" className="bg-[#F4F1EA] py-24 px-6 border-y border-[#E7E1D8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] text-[#9C532B] uppercase mb-2">
              The Estate &amp; Heritage
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] tracking-tight leading-tight mb-6">
              A private coastal promontory shaped by wind, stone, and silence.
            </h2>
            <div className="space-y-4 text-sm text-[#57534E] leading-relaxed">
              <p>
                Founded upon thirty pristine hectares of preserved marine sanctuary, Solaria Haven was conceived not as a standard hotel, but as a low-density architectural retreat where buildings yield entirely to the raw landscape.
              </p>
              <p>
                Every dwelling is built from hand-chiseled local travertine, reclaimed teak timbers, and limewash plaster. With a strict cap of twelve residences across the estate, your stay is defined by absolute discretion and unhurried coastal rhythm.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-[#DDD5C9]">
              <div>
                <div className="font-serif text-3xl text-[#1C1917] font-normal">30 Ha</div>
                <div className="text-xs text-[#78716C] uppercase tracking-wider mt-1">Marine Reserve</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-[#1C1917] font-normal">12 Only</div>
                <div className="text-xs text-[#78716C] uppercase tracking-wider mt-1">Private Sanctuaries</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-[#1C1917] font-normal">1:1</div>
                <div className="text-xs text-[#78716C] uppercase tracking-wider mt-1">Dedicated Butler Ratio</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="border border-[#DDD5C9] bg-white p-4 rounded-2xl shadow-xl">
              <img
                src="/src/assets/images/suite_garden_terrace_1792559609022.jpg"
                alt="Botanical outdoor sanctuary garden patio"
                className="w-full h-[400px] object-cover rounded-xl"
              />
              <div className="pt-4 px-2 flex justify-between items-center text-xs text-[#78716C]">
                <span>Botanical Terrace &amp; Stone Soaking Sanctuary</span>
                <span className="font-mono text-[#9C532B]">Careyes Promontory</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
