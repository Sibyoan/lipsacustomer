import React from 'react';

export default function GSTBillingBanner() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div
          className="relative overflow-hidden rounded-xl py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: 'linear-gradient(135deg, #003087 0%, #0047AB 40%, #1565C0 100%)' }}
        >
          {/* Left decorative circle */}
          <div className="absolute left-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 mb-3">
              <span className="text-yellow-300 text-[13px]">⭐</span>
              <span className="text-white text-[12px] font-semibold">Business Friendly Platform</span>
            </div>
            <h2 className="text-white text-[26px] md:text-[34px] font-black leading-tight m-0 text-left">
              GST Billing for All Orders!
            </h2>
            <p className="text-white/80 text-[14px] md:text-[16px] mt-2">
              Claim your GST invoice & save more on business purchases
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3">
            <a
              href="/pages/gst-billing"
              className="bg-white text-[#003087] font-bold text-[13px] px-6 py-2.5 rounded hover:bg-gray-100 transition-colors uppercase tracking-wide text-center"
            >
              Learn More
            </a>
            <a
              href="/account/register"
              className="bg-[#d72323] text-white font-bold text-[13px] px-6 py-2.5 rounded hover:bg-[#b81e1e] transition-colors uppercase tracking-wide text-center"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
