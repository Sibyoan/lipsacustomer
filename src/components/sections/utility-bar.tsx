"use client";
import React from 'react';

export default function UtilityBar() {
  return (
    <div className="w-full bg-white border-b border-gray-200 py-1.5 text-[12px]">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
        {/* Left: Contact info */}
        <div className="flex items-center gap-4 text-gray-600">
          <a href="tel:+919638666607" className="flex items-center gap-1.5 hover:text-[#d72323] transition-colors">
            <svg width="13" height="13" viewBox="0 0 512 512" fill="currentColor">
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
            </svg>
            +91 9638666607
          </a>
          <span className="text-gray-300">|</span>
          <a href="mailto:care@lipsa.com" className="flex items-center gap-1.5 hover:text-[#d72323] transition-colors">
            <svg width="13" height="13" viewBox="0 0 512 512" fill="currentColor">
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
            </svg>
            care@lipsa.com
          </a>
          <span className="hidden md:inline text-gray-300">|</span>
          <span className="hidden md:inline text-gray-600">9:00 AM to 7:00 PM</span>
        </div>

        {/* Right: App download buttons */}
        <div className="flex items-center gap-2">
          <a href="https://play.google.com/store/apps/details?id=com.lipsa.gallery" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 border border-gray-300 rounded px-2 py-0.5 hover:border-gray-500 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#34a853">
              <path d="M3.18 23.76c.29.17.63.18.93.04l12.36-7.14-2.89-2.89-10.4 9.99zm-1.67-20.1C1.18 4.04 1 4.54 1 5.1v13.8c0 .56.18 1.06.51 1.44l.07.07 7.73-7.73v-.18L1.58 3.59l-.07.07zm16.89 8.97l-2.62-1.52-3.22 3.22 3.22 3.22 2.65-1.53c.76-.44.76-1.95-.03-2.39zM4.11.24c-.3-.14-.64-.13-.93.04l10.42 10.42-2.89 2.89L4.11.24z"/>
            </svg>
            <span className="text-[11px] font-medium text-gray-700">Google Play</span>
          </a>
          <a href="https://apps.apple.com/us/app/lipsa/id1661765661" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 border border-gray-300 rounded px-2 py-0.5 hover:border-gray-500 transition-colors">
            <svg width="14" height="14" viewBox="0 0 814 1000" fill="currentColor">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.8-156.9-113.2C178.1 682 144.5 557 144.5 438.8c0-191.4 125.3-293.4 253.1-293.4 66.3 0 121.6 43.4 163.1 43.4 39.5 0 101.4-46.5 177.2-46.5zm-94.1-194.8c35.2-41.8 59.9-99.9 59.9-157.9 0-8.1-.6-16.3-2-23.4-56.5 2.1-123.6 37.8-163.8 84.3-31.6 36.7-61.2 95.7-61.2 154.4 0 9.1 1.5 18.2 2.3 21.2 3.8.6 10.1 1.5 16.3 1.5 51.2 0 113.1-34.4 148.5-80.1z"/>
            </svg>
            <span className="text-[11px] font-medium text-gray-700">App Store</span>
          </a>
        </div>
      </div>
    </div>
  );
}
