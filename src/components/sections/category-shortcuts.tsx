import React from 'react';

/**
 * CategoryShortcuts component
 * Closes the category shortcut banners for 'Kitchen Accessories', 'Home Essentials', and 'Electronics'.
 * Features: Product images, price tags (top-left), and clear black labels with "snow drop" decoration.
 */

interface ShortcutItem {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
}

interface CategoryShortcutSectionProps {
  categoryTitle: string;
  items: ShortcutItem[];
}

const CategoryShortcutSection: React.FC<CategoryShortcutSectionProps> = ({ categoryTitle, items }) => {
  return (
    <div className="py-[30px] w-full bg-white">
      <div className="container mx-auto px-4 lg:px-[15px]">
        <h2 className="text-[20px] lg:text-[24px] font-bold text-center text-[#121212] mb-[25px] font-display">
          {categoryTitle}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[10px] lg:gap-[20px]">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="relative group cursor-pointer hover-lift overflow-hidden rounded-[12px] bg-[#F3F4F6]"
            >
              {/* Product Image */}
              <div className="aspect-square w-full relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Price Tag (Top Left) */}
                <div className="absolute top-0 left-0 bg-[#0F172A] text-white pt-[2px] pb-[1px] px-[8px] rounded-br-[8px] z-10 flex flex-col items-center">
                   <span className="text-[8px] leading-tight uppercase font-medium opacity-80">From</span>
                   <span className="text-[12px] font-bold leading-tight">₹{item.price}</span>
                </div>
              </div>

              {/* Bottom Label with Snow Effect */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#0F172A] text-white py-[8px] px-[4px] text-center z-20">
                {/* Visual Snow Drip Overlay */}
                <div 
                  className="absolute top-[-10px] left-0 right-0 h-[12px] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 v50 q50,50 100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 V0 Z' fill='%230F172A'/%3E%3C/svg%3E")`,
                    backgroundSize: '100% 100%',
                    transform: 'rotate(180deg)'
                  }}
                />
                <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-wide">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryShortcuts: React.FC = () => {
  const kitchenItems: ShortcutItem[] = [
    { id: 'k1', title: 'Kitchen Tools', price: '367', imageUrl: 'https://deodap.in/cdn/shop/files/8802.jpg?v=1716462446' },
    { id: 'k2', title: 'Kitchen Storage', price: '33', imageUrl: 'https://deodap.in/cdn/shop/files/8803.jpg?v=1716462446' },
    { id: 'k3', title: 'Kitchen Appliances', price: '27', imageUrl: 'https://deodap.in/cdn/shop/files/8804.jpg?v=1716462446' },
    { id: 'k4', title: 'Water Bottles', price: '32', imageUrl: 'https://deodap.in/cdn/shop/files/8805.jpg?v=1716462446' },
    { id: 'k5', title: 'Choppers & Slicers', price: '12', imageUrl: 'https://deodap.in/cdn/shop/files/8806.jpg?v=1716462446' },
    { id: 'k6', title: 'Lunch Box & Tiffin', price: '39', imageUrl: 'https://deodap.in/cdn/shop/files/8807.jpg?v=1716462446' },
  ];

  const homeItems: ShortcutItem[] = [
    { id: 'h1', title: 'Home Decor Items', price: '31', imageUrl: 'https://deodap.in/cdn/shop/files/8814.jpg?v=1716462529' },
    { id: 'h2', title: 'Cleaning Supplies', price: '21', imageUrl: 'https://deodap.in/cdn/shop/files/8815.jpg?v=1716462529' },
    { id: 'h3', title: 'Clock', price: '52', imageUrl: 'https://deodap.in/cdn/shop/files/8816.jpg?v=1716462529' },
    { id: 'h4', title: 'Home Storage', price: '24', imageUrl: 'https://deodap.in/cdn/shop/files/8817.jpg?v=1716462529' },
    { id: 'h5', title: 'Multi Purpose Hooks', price: '15', imageUrl: 'https://deodap.in/cdn/shop/files/8818.jpg?v=1716462529' },
    { id: 'h6', title: 'Indoor Lighting', price: '9', imageUrl: 'https://deodap.in/cdn/shop/files/8819.jpg?v=1716462529' },
  ];

  const electronicsItems: ShortcutItem[] = [
    { id: 'e1', title: 'Wearable Devices', price: '119', imageUrl: 'https://deodap.in/cdn/shop/files/8844_771804f5-5154-4cae-9080-877f00bf5c5d.jpg?v=1716463283' },
    { id: 'e2', title: 'Computer Accessories', price: '55', imageUrl: 'https://deodap.in/cdn/shop/files/8845_ca6a20d2-df5d-4f11-9f94-1a20a453303b.jpg?v=1716463283' },
    { id: 'e3', title: 'Mobile Accessories', price: '39', imageUrl: 'https://deodap.in/cdn/shop/files/8846_df06c07b-ecdf-4334-a69c-0917631da762.jpg?v=1716463283' },
    { id: 'e4', title: 'Viral Gadgets', price: '106', imageUrl: 'https://deodap.in/cdn/shop/files/8847_98553648-5c4d-450f-aac0-819934372957.jpg?v=1716463283' },
    { id: 'e5', title: 'Mobile Holder & Stand', price: '47', imageUrl: 'https://deodap.in/cdn/shop/files/8848_a2489e80-7a08-4eac-9a6d-8b01a1dbd836.jpg?v=1716463283' },
    { id: 'e6', title: 'Speakers', price: '150', imageUrl: 'https://deodap.in/cdn/shop/files/8849_42ff10cc-581d-4f96-b072-4687799042b5.jpg?v=1716463283' },
  ];

  return (
    <div className="flex flex-col">
      <CategoryShortcutSection 
        categoryTitle="Kitchen Accessories" 
        items={kitchenItems} 
      />
      <CategoryShortcutSection 
        categoryTitle="Home Essentials" 
        items={homeItems} 
      />
      <div className="mt-8">
        <CategoryShortcutSection 
          categoryTitle="Electronics" 
          items={electronicsItems} 
        />
      </div>
    </div>
  );
};

export default CategoryShortcuts;