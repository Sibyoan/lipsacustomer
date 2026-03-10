import React from 'react';

const priceData1 = [
  { price: '9', color1: '#0b1726', color2: '#1a2d45', products: ['🪣','🧴','🪢'] },
  { price: '29', color1: '#1a4a2e', color2: '#2d7a4f', products: ['🧹','🪥','🧽'] },
  { price: '49', color1: '#4a1a0b', color2: '#7a2d1a', products: ['🍳','🥄','🫙'] },
  { price: '149', color1: '#0b1a4a', color2: '#1a2d7a', products: ['📱','🔌','🎧'] },
  { price: '249', color1: '#2a0b4a', color2: '#4a1a7a', products: ['🎮','📷','⌚'] },
];

function PriceCard({ price, label, color1, color2, products }: { price: string; label?: string; color1: string; color2: string; products: string[] }) {
  return (
    <a
      href={`/collections/${label === 'Above' ? 'above-1000' : `under-${price}`}`}
      className="block relative overflow-hidden rounded-lg cursor-pointer hover:shadow-lg transition-shadow group"
      style={{ background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)` }}
    >
      {/* Snow / ice wave top */}
      <div className="absolute top-0 left-0 right-0 h-4 z-10 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 400 20" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 L0,8 Q25,18 50,8 T100,8 T150,8 T200,8 T250,8 T300,8 T350,8 T400,8 L400,0 Z" fill="white" opacity="0.9"/>
        </svg>
      </div>

      <div className="relative pt-5 pb-3 px-3 flex items-end justify-between min-h-[100px]">
        {/* Text */}
        <div className="text-white z-20">
          <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80">{label ?? 'Under'}</p>
          <div className="flex items-start leading-none mt-0.5">
            <span className="text-[13px] font-bold mt-0.5">₹</span>
            <span className="text-[32px] font-black leading-none ml-0.5">{price}</span>
          </div>
        </div>

        {/* Product previews */}
        <div className="flex flex-col gap-1 items-end z-20">
          {products.slice(0, 2).map((emoji, i) => (
            <div key={i} className="bg-white/15 rounded p-1 text-[18px] leading-none group-hover:bg-white/25 transition-colors">
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function PriceRangeExplore() {
  return (
    <section className="py-8 bg-[#f5f5f5]">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-[20px] font-semibold text-center text-black mb-5">Explore Our Range</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {priceData1.map((item, i) => (
            <PriceCard key={i} price={item.price} color1={item.color1} color2={item.color2} products={item.products} />
          ))}
        </div>
      </div>
    </section>
  );
}
