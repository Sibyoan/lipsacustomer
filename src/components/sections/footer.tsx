import React from 'react';

const quickLinks = [
  'What Is Drop Shipping','DropShipping','Franchise','Become Vendor',
  'Create a Ticket','Wholesale Login','Wholesale Signup','VIP Customers',
];
const policies = [
  'About Us','Contact Us','Terms & Conditions','Shipping Policy',
  'Return and Refund Policy','Payment & Security','Privacy Policy',
  'Order Cancellation Policy','Grievance Redressal Policy','Notification',
];
const otherLinks = [
  'Influencer Form','Blogs','DMCA','Affiliate',
  'FAQs','Customer Testimonials','Career','Shipment Tracking','Store Locator',
];
const dropLinks = [
  'Lipsa Drop Shipping','All Website Plan','Shopify Website',
  'Self Serve Plan','B2B Drop Shipping','Reseller Plan',
];

const toHref = (s: string) => '/pages/' + s.toLowerCase().replace(/\s+&\s+/g,' and ').replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');

export default function Footer() {
  return (
    <footer className="bg-[#0b1726] text-white pt-12 pb-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-[28px] font-black text-[#d72323]">Lipsa</span>
                <span className="text-[9px] bg-white text-[#0b1726] px-1.5 py-0.5 rounded font-black uppercase mb-1">Wholesale</span>
              </div>
              <p className="text-[12px] text-gray-400 italic">Spend Less, Get Best</p>
            </div>

            {/* App buttons */}
            <div className="flex flex-col gap-2">
              <a href="https://play.google.com/store/apps/details?id=com.lipsa.gallery" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black border border-gray-700 rounded-md px-3 py-1.5 hover:border-gray-500 transition-colors w-fit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#34a853"><path d="M3.18 23.76c.29.17.63.18.93.04l12.36-7.14-2.89-2.89-10.4 9.99zm-1.67-20.1C1.18 4.04 1 4.54 1 5.1v13.8c0 .56.18 1.06.51 1.44l.07.07 7.73-7.73v-.18L1.58 3.59l-.07.07zm16.89 8.97l-2.62-1.52-3.22 3.22 3.22 3.22 2.65-1.53c.76-.44.76-1.95-.03-2.39zM4.11.24c-.3-.14-.64-.13-.93.04l10.42 10.42-2.89 2.89L4.11.24z"/></svg>
                <div>
                  <p className="text-[8px] text-gray-400 leading-none">GET IT ON</p>
                  <p className="text-[12px] font-bold text-white leading-tight">Google Play</p>
                </div>
              </a>
              <a href="https://apps.apple.com/us/app/lipsa/id1661765661" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black border border-gray-700 rounded-md px-3 py-1.5 hover:border-gray-500 transition-colors w-fit">
                <svg width="16" height="16" viewBox="0 0 814 1000" fill="white"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.8-156.9-113.2C178.1 682 144.5 557 144.5 438.8c0-191.4 125.3-293.4 253.1-293.4 66.3 0 121.6 43.4 163.1 43.4 39.5 0 101.4-46.5 177.2-46.5zm-94.1-194.8c35.2-41.8 59.9-99.9 59.9-157.9 0-8.1-.6-16.3-2-23.4-56.5 2.1-123.6 37.8-163.8 84.3-31.6 36.7-61.2 95.7-61.2 154.4 0 9.1 1.5 18.2 2.3 21.2 3.8.6 10.1 1.5 16.3 1.5 51.2 0 113.1-34.4 148.5-80.1z"/></svg>
                <div>
                  <p className="text-[8px] text-gray-400 leading-none">DOWNLOAD ON THE</p>
                  <p className="text-[12px] font-bold text-white leading-tight">App Store</p>
                </div>
              </a>
            </div>

            {/* Social icons */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Follow Us</p>
              <div className="flex gap-2">
                {[
                  { bg:'#1877F2', label:'f', href:'https://facebook.com/lipsa' },
                  { bg:'#E1306C', label:'in', href:'https://instagram.com/lipsa' },
                  { bg:'#FF0000', label:'▶', href:'https://youtube.com/@lipsa' },
                  { bg:'#0077B5', label:'Li', href:'https://linkedin.com/company/lipsa' },
                  { bg:'#0088CC', label:'✈', href:'https://t.me/lipsa' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-black hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: s.bg }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Payment icons */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">We Accept</p>
              <div className="flex flex-wrap gap-1.5">
                {['UPI','Visa','MC','Net','COD','EMI'].map(m => (
                  <span key={m} className="text-[9px] font-bold bg-white/10 border border-white/20 px-1.5 py-0.5 rounded text-white/70">{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[12px] font-bold uppercase text-[#d72323] mb-4 pb-1 border-b border-gray-700">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(l => <li key={l}><a href={toHref(l)} className="text-[12px] text-gray-400 hover:text-white transition-colors">{l}</a></li>)}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-[12px] font-bold uppercase text-[#d72323] mb-4 pb-1 border-b border-gray-700">Policies</h4>
            <ul className="space-y-2">
              {policies.map(l => <li key={l}><a href={toHref(l)} className="text-[12px] text-gray-400 hover:text-white transition-colors">{l}</a></li>)}
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h4 className="text-[12px] font-bold uppercase text-[#d72323] mb-4 pb-1 border-b border-gray-700">Other Links</h4>
            <ul className="space-y-2">
              {otherLinks.map(l => <li key={l}><a href={toHref(l)} className="text-[12px] text-gray-400 hover:text-white transition-colors">{l}</a></li>)}
            </ul>
          </div>

          {/* Dropshipping */}
          <div>
            <h4 className="text-[12px] font-bold uppercase text-[#d72323] mb-4 pb-1 border-b border-gray-700">Drop Shipping</h4>
            <ul className="space-y-2">
              {dropLinks.map(l => <li key={l}><a href={toHref(l)} className="text-[12px] text-gray-400 hover:text-white transition-colors">{l}</a></li>)}
            </ul>
          </div>
        </div>

        {/* Company info */}
        <div className="bg-[#1a2634] border border-gray-800 rounded-lg p-4 mb-6">
          <p className="text-[12px] text-[#d72323] font-bold mb-1.5">Dabster International Private Limited</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <p className="text-[11px] text-gray-400"><span className="font-bold text-gray-300">GST:</span> 24AAHCD5265C1ZX</p>
            <p className="text-[11px] text-gray-400"><span className="font-bold text-gray-300">CIN:</span> U51909GJ2019PTC110919</p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="border-t border-gray-800 pt-6 mb-5">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* IndiaMart */}
            <div className="flex flex-col items-center gap-1">
              <div className="bg-[#fbdb14] w-14 h-14 rounded-full border-4 border-white flex flex-col items-center justify-center text-black">
                <p className="text-[8px] font-black leading-none">TRUST</p>
                <p className="text-[10px] font-black leading-none">SEAL</p>
              </div>
              <span className="text-[#2B3A90] bg-white px-2 py-0.5 rounded text-[9px] font-black">indiamart</span>
            </div>

            {/* Trusted Seller */}
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 100 100" className="w-12 h-12 fill-green-500">
                <path d="M50 5 L85 20 L85 45 C85 70 50 95 50 95 C50 95 15 70 15 45 L15 20 L50 5 Z" stroke="white" strokeWidth="2"/>
                <path d="M35 50 L45 60 L65 40" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p className="text-[14px] font-black tracking-wider">TRUSTED</p>
                <p className="text-[14px] font-light tracking-[0.2em]">SELLER</p>
              </div>
            </div>

            {/* Google */}
            <div className="flex flex-col items-center">
              <span className="text-[16px] font-black">Google</span>
              <div className="flex">{'★★★★★'.split('').map((s, i) => <span key={i} className="text-[#fbbc05]">{s}</span>)}</div>
            </div>

            {/* MouthShut */}
            <div className="flex flex-col items-center">
              <span className="text-[#007cc3] font-black italic text-[15px]">MouthShut<span className="text-white text-[10px] font-normal">.com</span></span>
              <div className="flex">{[1,2,3,4,5].map(i => <span key={i} className={`text-[15px] ${i===5 ? 'text-gray-600' : 'text-[#f6891f]'}`}>★</span>)}</div>
            </div>

            {/* Amazon */}
            <div className="flex flex-col items-center">
              <span className="text-[16px] font-black text-[#FF9900]">amazon</span>
              <div className="flex">{[1,2,3,4,5].map(i => <span key={i} className={`text-[15px] ${i===5 ? 'text-gray-600' : 'text-[#FF9900]'}`}>★</span>)}</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[11px] text-gray-500">© 2024 Lipsa. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/pages/privacy-policy" className="text-[11px] text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/pages/terms-conditions" className="text-[11px] text-gray-500 hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
