"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBanners } from "@/hooks/useBanners";

// Fallback designed banners if real URLs fail
const fallbackSlides = [
  {
    bg: "linear-gradient(135deg, #0b1726 0%, #1a2d45 50%, #d72323 100%)",
    label: "CLEARANCE SALE",
    heading: "Get Up To",
    highlight: "70% OFF",
    sub: "On All Products | Shop Now",
    badge: "🔥 Limited Time",
    cta: "Shop Now",
    ctaLink: "/collections/clearance-sale",
  },
  {
    bg: "linear-gradient(135deg, #d72323 0%, #ff6b35 100%)",
    label: "JUST ARRIVED",
    heading: "New Collection",
    highlight: "2024",
    sub: "Fresh Products Every Week",
    badge: "✨ New",
    cta: "Explore Now",
    ctaLink: "/collections/just-arrived",
  },
  {
    bg: "linear-gradient(135deg, #005c97 0%, #363795 100%)",
    label: "FREE SHIPPING",
    heading: "No Shipping",
    highlight: "Charges",
    sub: "On Orders Above ₹499",
    badge: "🚚 Free",
    cta: "Shop Now",
    ctaLink: "/collections/all",
  },
];

export default function HeroSlider() {
  const { banners, loading } = useBanners();
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Use Firestore banners if available, filter out invalid ones
  const slides = banners.length > 0 
    ? banners
        .filter(banner => banner.image && banner.image.trim() !== '') // Only include banners with valid images
        .map(banner => ({
          id: banner.id,
          desktop: banner.image,
          mobile: banner.mobileImage && banner.mobileImage.trim() !== '' 
            ? banner.mobileImage 
            : banner.image, // Use mobileImage if valid, otherwise use desktop image
          alt: banner.title || 'Banner',
          link: banner.link || '/',
        }))
    : [];

  const next = useCallback(() => {
    if (slides.length > 0) {
      setCurrent(c => (c + 1) % slides.length);
    }
  }, [slides.length]);
  
  const prev = useCallback(() => {
    if (slides.length > 0) {
      setCurrent(c => (c - 1 + slides.length) % slides.length);
    }
  }, [slides.length]);

  useEffect(() => {
    if (slides.length > 0) {
      const t = setInterval(next, 4500);
      return () => clearInterval(t);
    }
  }, [next, slides.length]);

  // Show loading state
  if (loading) {
    return (
      <section className="relative bg-gray-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-3 pt-3 pb-2">
          <div className="relative overflow-hidden rounded-lg bg-gray-200 animate-pulse" style={{ aspectRatio: '16/5', minHeight: '200px', maxHeight: '420px' }}>
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Loading banners...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show message if no banners
  if (slides.length === 0) {
    return (
      <section className="relative bg-gray-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-3 pt-3 pb-2">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600" style={{ aspectRatio: '16/5', minHeight: '200px', maxHeight: '420px' }}>
            <div className="flex items-center justify-center h-full text-white">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Welcome to Our Store</h2>
                <p className="text-lg">No banners available at the moment</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gray-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-3 pt-3 pb-2">
        <div className="relative overflow-hidden rounded-lg group">
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => {
              const fallback = fallbackSlides[i % fallbackSlides.length];
              return (
                <a key={slide.id} href={slide.link} className="w-full shrink-0 block relative">
                  {!imageErrors[i] && slide.desktop && slide.mobile ? (
                    <>
                      {/* Desktop */}
                      <img
                        src={slide.desktop}
                        alt={slide.alt}
                        className="w-full h-auto object-cover hidden md:block"
                        style={{ aspectRatio: '1920/650', maxHeight: '480px' }}
                        onError={() => setImageErrors(e => ({ ...e, [i]: true }))}
                        loading="eager"
                      />
                      {/* Mobile */}
                      <img
                        src={slide.mobile}
                        alt={slide.alt}
                        className="w-full h-auto object-cover md:hidden"
                        style={{ aspectRatio: '2/1' }}
                        onError={() => setImageErrors(e => ({ ...e, [i]: true }))}
                        loading="eager"
                      />
                    </>
                  ) : (
                    // Fallback banner
                    <div
                      className="w-full flex items-center justify-between px-8 md:px-16"
                      style={{ background: fallback.bg, aspectRatio: '16/5', minHeight: '200px', maxHeight: '420px' }}
                    >
                      <div className="text-white max-w-xl">
                        <div className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                          {fallback.badge}
                        </div>
                        <p className="text-[12px] md:text-[14px] font-semibold uppercase tracking-widest opacity-80 mb-1">
                          {fallback.label}
                        </p>
                        <h2 className="text-[28px] md:text-[48px] font-black leading-none mb-1 text-left m-0">
                          {fallback.heading}
                        </h2>
                        <h2 className="text-[36px] md:text-[64px] font-black leading-none text-yellow-400 mb-3 text-left m-0">
                          {fallback.highlight}
                        </h2>
                        <p className="text-[13px] md:text-[16px] opacity-80 mb-4">{fallback.sub}</p>
                        <span className="inline-block bg-[#d72323] text-white font-bold px-6 py-2 rounded text-[13px] hover:bg-[#b81e1e] transition-colors">
                          {fallback.cta}
                        </span>
                      </div>
                      <div className="hidden md:flex items-center justify-center w-48 h-48 bg-white/10 rounded-full border-4 border-white/20">
                        <span className="text-white text-[60px] font-black">%</span>
                      </div>
                    </div>
                  )}
                </a>
              );
            })}
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-[#d72323]' : 'w-2 bg-white/60 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>

        {/* Mini Promo Banners */}
        <div className="mt-2.5 hidden md:grid grid-cols-3 gap-2.5">
          {[
            { bg: '#FEF3CD', text: '🚀 Free Shipping on orders above ₹499', href: '#' },
            { bg: '#D1ECF1', text: '✅ 100% Authentic Products', href: '#' },
            { bg: '#D4EDDA', text: '↩️ Easy Returns & Refunds', href: '#' },
          ].map((item, i) => (
            <a key={i} href={item.href} className="text-center text-[11px] font-semibold py-2 px-3 rounded" style={{ backgroundColor: item.bg }}>
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
