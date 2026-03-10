import React from 'react';
import Image from 'next/image';

const TrustSignals = () => {
  const socialSignals = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.523 15.341c.445 0 .81-.365.81-.81a.81.81 0 0 0-.81-.81c-.445 0-.81.365-.81.81s.365.81.81.81Z" fill="#34A853"/>
          <path d="M14.075 18.068a.81.81 0 0 0 .81-.81.81.81 0 0 0-.81-.81.81.81 0 0 0-.81.81c0 .445.365.81.81.81Z" fill="#FBBC05"/>
          <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="black" strokeWidth="1.5"/>
          <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill="#4285F4"/>
          <path d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" fill="white"/>
        </svg>
      ),
      count: '90,00,000+',
      label: 'Downloads',
      bgColor: 'bg-[#F2F2F2]',
      borderColor: 'border-[#121212]'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/>
        </svg>
      ),
      count: '1,56,000+',
      label: 'Subscribers',
      bgColor: 'bg-[#FFF0F0]',
      borderColor: 'border-[#FF0000]'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#EAB308" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 14H9v-2h2v2Zm0-4H9V7h2v5Z"/>
        </svg>
      ),
      count: '1,09,000',
      label: 'Followers',
      bgColor: 'bg-[#FEFCE8]',
      borderColor: 'border-[#EAB308]'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z"/>
        </svg>
      ),
      count: '105,000',
      label: 'Followers',
      bgColor: 'bg-[#EBF5FF]',
      borderColor: 'border-[#1877F2]'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#24A1DE" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.944 0C5.346 0 0 5.347 0 11.946c0 6.598 5.346 11.945 11.944 11.945s11.945-5.347 11.945-11.945C23.889 5.347 18.542 0 11.944 0Zm5.448 8.169-1.85 8.728c-.14.629-.512.785-.838.597l-2.82-2.078-1.359 1.307c-.15.15-.276.276-.566.276l.202-2.868 5.219-4.717c.227-.202-.05-.314-.352-.112l-6.45 4.06-2.778-.868c-.604-.19-.616-.604.126-.893l10.85-4.183c.503-.19.943.113.716.749Z"/>
        </svg>
      ),
      count: '20,000+',
      label: 'Followers',
      bgColor: 'bg-[#F0FAFF]',
      borderColor: 'border-[#24A1DE]'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.302-.15-1.787-.882-2.057-.981-.271-.1-.468-.149-.665.15-.198.298-.765.981-.937 1.18-.173.199-.347.224-.649.074-.301-.15-1.274-.469-2.426-1.493-.896-.799-1.5-1.786-1.676-2.086-.176-.3-.019-.462.13-.61.135-.134.301-.351.451-.527.15-.174.199-.297.299-.496.1-.199.05-.373-.025-.522-.075-.149-.665-1.605-.911-2.197-.24-.576-.484-.497-.665-.506-.171-.008-.368-.01-.564-.01a1.077 1.077 0 0 0-.78.364c-.267.298-1.02 1.002-1.02 2.445 0 1.443 1.05 2.84 1.196 3.039.146.199 2.067 3.155 5.005 4.425.699.302 1.244.483 1.67.619.702.223 1.341.192 1.845.117.562-.083 1.787-.732 2.04-1.442.253-.71.253-1.317.177-1.442-.075-.125-.275-.199-.577-.349Z" fill="white"/>
          <path d="M12.001 0a12.003 12.003 0 0 0-10.29 18.172L0 24l5.968-1.564A11.96 11.96 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0Zm0 21.843a9.81 9.81 0 0 1-5.006-1.366l-.358-.214-3.722.975.992-3.628-.235-.374a9.817 9.817 0 1 1 8.329 4.607Z"/>
        </svg>
      ),
      count: '30,000+',
      label: 'Followers',
      bgColor: 'bg-[#F0FFF4]',
      borderColor: 'border-[#25D366]'
    }
  ];

  const marketplaceLogos = [
    { name: 'Amazon', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/svgs/amazon_logo.svg', width: 86, height: 28 },
    { name: 'Flipkart', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/svgs/flipkart_1-10.svg', width: 88, height: 24 },
    { name: 'Meesho', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/svgs/meesho_logo.svg', width: 88, height: 24 },
    { name: 'TradeIndia', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/svgs/tradeindia_logo.svg', width: 88, height: 24 },
    { name: 'IndiaMart', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/svgs/indiamart_logo.svg', width: 88, height: 24 },
    { name: 'JustDial', src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/svgs/justdial-seeklogo_1-13.svg', width: 88, height: 24 }
  ];

  return (
    <section className="py-[40px] bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">
          
          {/* Find us on Column */}
          <div className="flex-1">
            <h3 className="text-center text-[16px] font-bold text-[#121212] mb-[20px] font-display">
              Find us on
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 px-2">
              {socialSignals.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center gap-3 p-3 rounded-[40px] border-2 ${item.borderColor} ${item.bgColor} shadow-sm transition-transform hover:scale-105 duration-200 cursor-pointer`}
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#121212] leading-tight">
                      {item.count}
                    </span>
                    <span className="text-[10px] text-[#707070] uppercase font-medium tracking-wide">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block w-[1px] bg-gray-200 mx-12"></div>

          {/* Also Available On Column */}
          <div className="flex-1">
            <h3 className="text-center text-[16px] font-bold text-[#121212] mb-[20px] font-display">
              Also Available On
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 px-2">
              {marketplaceLogos.map((brand, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center p-3 rounded-[8px] border border-gray-300 bg-white h-[60px] shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img 
                      src={brand.src} 
                      alt={brand.name}
                      className="max-h-[80%] max-w-[90%] object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSignals;