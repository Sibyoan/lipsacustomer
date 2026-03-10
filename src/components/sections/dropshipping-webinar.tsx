import React from 'react';

export default function PromotionalMarketingBlock() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Left: Dropshipping Webinar Banner */}
          <a
            href="/pages/dropshipping-webinar"
            className="block relative overflow-hidden rounded-xl group"
            style={{ minHeight: '220px' }}
          >
            <div
              className="w-full h-full min-h-[220px] flex items-center p-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0b1726 0%, #1a3a5c 50%, #0b1726 100%)' }}
            >
              {/* BG decorations */}
              <div className="absolute right-0 top-0 w-40 h-40 bg-[#d72323]/10 rounded-full translate-x-1/4 -translate-y-1/4" />
              <div className="absolute right-8 bottom-0 w-24 h-24 bg-blue-500/10 rounded-full translate-y-1/4" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-[#d72323] text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                  🎯 Free Webinar
                </div>
                <h3 className="text-white text-[20px] md:text-[22px] font-black leading-tight mb-3">
                  Join Our Free<br/>Dropshipping Webinar
                </h3>
                <ul className="space-y-1.5 mb-4">
                  {['Learn how to start dropshipping','Earn ₹1L+ monthly income','No prior experience needed','Live Q&A session'].map((pt, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/80 text-[12px]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#00a69c"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className="inline-block bg-[#d72323] text-white font-bold text-[12px] px-5 py-2 rounded uppercase tracking-wide group-hover:bg-[#b81e1e] transition-colors">
                  Register Today
                </span>
              </div>
            </div>
          </a>

          {/* Right: Wholesale Mall in Your City */}
          <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white flex flex-col md:flex-row">
            {/* Image grid */}
            <div className="grid grid-cols-3 grid-rows-4 gap-0.5 flex-shrink-0 w-full md:w-[55%] bg-gray-100">
              {[
                '🏪','🛍️','📦',
                '🏬','🛒','📫',
                '🏷️','📋','💳',
                '🚚','📱','🤝',
              ].map((emoji, i) => (
                <div key={i} className="bg-[#f0f0f0] flex items-center justify-center aspect-square text-2xl border border-white">
                  {emoji}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col justify-center p-5 flex-1">
              <div className="inline-flex items-center gap-1.5 bg-[#0b1726] text-white text-[9px] font-bold px-2.5 py-1 rounded-full mb-3 w-fit uppercase tracking-wider">
                🏪 Franchise Opportunity
              </div>
              <h3 className="text-[#0b1726] text-[16px] font-black leading-tight uppercase mb-3">
                Start DeoDap Wholesale Mall In Your City
              </h3>
              <ul className="space-y-1 mb-4">
                {['Low investment model','Strong brand support','High profit margins'].map((pt, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-gray-600 text-[11px]">
                    <span className="text-[#d72323] font-bold">✓</span> {pt}
                  </li>
                ))}
              </ul>
              <a
                href="/pages/franchise"
                className="inline-block w-fit bg-[#d72323] text-white text-[12px] font-bold px-5 py-2 rounded uppercase tracking-wide hover:bg-[#b81e1e] transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
