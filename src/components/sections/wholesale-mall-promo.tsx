import React from 'react';
import Image from 'next/image';

/**
 * WholesaleMallPromo Component
 * 
 * A dual-column promotional section:
 * Left: Free Dropshipping Webinar registration card.
 * Right: Collage of physical store locations with "Start Lipsa Wholesale Mall" CTA.
 * 
 * Values derived from <computed_styles> and <high_level_design>.
 */
const WholesaleMallPromo: React.FC = () => {
  return (
    <section className="bg-white py-[40px] md:py-[60px]">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Webinar Registration Card */}
          <div className="relative rounded-[12px] overflow-hidden shadow-card h-full">
            <a 
              href="#" 
              className="block relative w-full h-full transition-transform duration-300 hover:scale-[1.01]"
              aria-label="Join our Free Dropshipping Webinar"
            >
              {/* Note: Asset URLs would normally come from the <assets> tag. 
                  Since none were provided for this specific section, we use placeholders 
                  replicating the visual description in screenshots. */}
              <div className="relative w-full aspect-[16/9] md:aspect-auto md:h-full bg-[#f8fafc]">
                 <img 
                    src="https://cdn.shopify.com/s/files/1/0782/3284/6646/files/Join_Our_Free_Dropshipping_Webinar.png?v=1716447856" 
                    alt="Join our Free Dropshipping Webinar. Join the webinar and gain the wisdom about online business from experts. 10,000+ products."
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/d92323/ffffff?text=Dropshipping+Webinar';
                    }}
                 />
              </div>
            </a>
          </div>

          {/* Wholesale Mall / Store Collage Card */}
          <div className="flex flex-col md:flex-row bg-[#ffffff] rounded-[12px] overflow-hidden shadow-card border border-[#e5e7eb] h-full">
            {/* Collage of store images */}
            <div className="w-full md:w-[60%] grid grid-cols-3 grid-rows-3 gap-1 bg-[#f1f5f9] p-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="relative aspect-square overflow-hidden bg-gray-200">
                  <img 
                    src={`https://cdn.shopify.com/s/files/1/0782/3284/6646/files/store_${i+1}.jpg?v=1716447856`}
                    alt={`Lipsa Store Location ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/150x150/0f172a/ffffff?text=Store+${i+1}`;
                    }}
                  />
                </div>
              ))}
            </div>

            {/* CTA Content Side */}
            <div className="w-full md:w-[40%] p-6 flex flex-col justify-center items-start">
              <h2 className="text-[20px] md:text-[24px] font-bold leading-[1.2] text-[#121212] mb-4 uppercase tracking-tight">
                START LIPSA <br />
                WHOLESALE <br />
                MALL IN <br />
                YOUR CITY
              </h2>
              <a 
                href="/pages/franchise" 
                className="inline-block bg-[#d92323] text-white px-6 py-2.5 rounded-[8px] font-semibold text-[14px] uppercase transition-all duration-200 hover:bg-[#b01c1c] hover:shadow-lg active:scale-95"
              >
                Learn More
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Badges / Platforms Section (Optional Context integration) */}
      <div className="container mx-auto px-4 max-w-[1280px] mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#e5e7eb] pt-8">
          {/* Find us on row */}
          <div>
            <h3 className="text-center text-[18px] font-bold text-[#121212] mb-6">Find us on</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <SocialBadge 
                img="https://cdn.shopify.com/s/files/1/0782/3284/6646/files/Group_1000004245.svg?v=1716447856" 
                count="90,00,000+" 
                label="Downloads" 
              />
              <SocialBadge 
                img="https://cdn.shopify.com/s/files/1/0782/3284/6646/files/Group_1000004246.svg?v=1716447856" 
                count="1,56,000+" 
                label="Subscribers" 
              />
              <SocialBadge 
                img="https://cdn.shopify.com/s/files/1/0782/3284/6646/files/Group_1000004247.svg?v=1716447856" 
                count="1,09,000" 
                label="Followers" 
              />
            </div>
          </div>

          {/* Also Available On row */}
          <div>
            <h3 className="text-center text-[18px] font-bold text-[#121212] mb-6">Also Available On</h3>
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <PlatformLogo src="https://cdn.shopify.com/s/files/1/0782/3284/6646/files/Vector_2.svg?v=1716447856" alt="Amazon" />
              <PlatformLogo src="https://cdn.shopify.com/s/files/1/0782/3284/6646/files/Flipkart_logo.svg?v=1716447856" alt="Flipkart" />
              <PlatformLogo src="https://cdn.shopify.com/s/files/1/0782/3284/6646/files/meesho_logo.svg?v=1716447856" alt="Meesho" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper Components for the bottom part of the promo area
const SocialBadge = ({ img, count, label }: { img: string, count: string, label: string }) => (
  <div className="flex items-center bg-white border border-[#e5e7eb] rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-8 h-8 mr-3 flex items-center justify-center">
      <img src={img} alt={label} className="w-full h-full object-contain" />
    </div>
    <div className="flex flex-col">
      <span className="text-[14px] font-bold text-[#121212] leading-tight">{count}</span>
      <span className="text-[10px] text-[#707070] leading-tight">{label}</span>
    </div>
  </div>
);

const PlatformLogo = ({ src, alt }: { src: string, alt: string }) => (
  <div className="h-[40px] px-4 py-2 border border-[#e5e7eb] rounded-[8px] flex items-center justify-center bg-white hover:border-[#d92323] transition-colors">
    <img 
      src={src} 
      alt={alt} 
      className="max-h-full max-w-[80px] object-contain"
      onError={(e) => {
        (e.target as HTMLImageElement).parentElement!.innerText = alt;
      }}
    />
  </div>
);

export default WholesaleMallPromo;