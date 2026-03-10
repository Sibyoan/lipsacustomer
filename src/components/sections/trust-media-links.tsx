import React from 'react';

const socialStats = [
  { platform: 'App Downloads', count: '90,00,000+', icon: '📱', color: '#000000', borderColor: '#333333' },
  { platform: 'YouTube Subscribers', count: '1,56,000+', icon: '▶️', color: '#FF0000', borderColor: '#FF0000' },
  { platform: 'Instagram Followers', count: '1,09,000+', icon: '📷', color: '#E1306C', borderColor: '#f09433' },
  { platform: 'Facebook Followers', count: '1,05,000', icon: '👍', color: '#1877F2', borderColor: '#1877F2' },
  { platform: 'Telegram Followers', count: '20,000+', icon: '✈️', color: '#0088CC', borderColor: '#0088CC' },
  { platform: 'WhatsApp Followers', count: '30,000+', icon: '💬', color: '#25D366', borderColor: '#25D366' },
];

const marketplaces = [
  { name: 'Amazon', bg: '#FF9900', text: 'amazon', textColor: '#000' },
  { name: 'Flipkart', bg: '#2874F0', text: 'flipkart', textColor: '#fff' },
  { name: 'Meesho', bg: '#9B2D8E', text: 'meesho', textColor: '#fff' },
  { name: 'Trade India', bg: '#0077C8', text: 'tradeindia', textColor: '#fff' },
  { name: 'IndiaMart', bg: '#2B3A90', text: 'indiamart', textColor: '#fff' },
  { name: 'JustDial', bg: '#E5003B', text: 'justdial', textColor: '#fff' },
];

export default function TrustMediaLinks() {
  return (
    <section className="bg-white py-8 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Find us on */}
          <div className="flex-1">
            <h2 className="text-[18px] font-bold text-black text-center mb-5">Find Us On</h2>
            <div className="grid grid-cols-2 gap-3">
              {socialStats.map((s, i) => (
                <div key={i} className="flex items-center gap-3 border-2 rounded-full px-3 py-2" style={{ borderColor: s.borderColor }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 bg-gray-50 border border-gray-100">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-[14px] font-black text-black leading-tight">{s.count}</p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wide leading-tight">{s.platform}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-gray-200" />

          {/* Also Available On */}
          <div className="flex-1">
            <h2 className="text-[18px] font-bold text-black text-center mb-5">Also Available On</h2>
            <div className="grid grid-cols-3 gap-3">
              {marketplaces.map((m, i) => (
                <div key={i} className="flex items-center justify-center border border-gray-200 rounded-lg p-3 h-14 hover:shadow-sm transition-shadow">
                  <span className="font-black text-[13px]" style={{ color: m.bg }}>
                    {m.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
