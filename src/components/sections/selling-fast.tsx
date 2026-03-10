import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  mrp: number;
  discount: string;
  rating: number;
  reviews: number;
  image: string;
  isBestSeller?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Antique 3D Eiffel Tower Statue - Metal Paris...',
    price: 47,
    mrp: 99,
    discount: '53% off',
    rating: 5,
    reviews: 46,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/images/Ellipse_1_5-5.webp',
    isBestSeller: true,
  },
  {
    id: 2,
    title: 'Classic Tic Tac Toe Board Game (1 Set...',
    price: 39,
    mrp: 199,
    discount: '80% off',
    rating: 4.5,
    reviews: 19,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/images/Ellipse_1_5-5.webp', // Placeholder matching assets pattern if direct not found
    isBestSeller: true,
  },
  {
    id: 3,
    title: '3 Meter Anti-Slip Clothesline Rope - Nylon, Hooks,...',
    price: 24,
    mrp: 99,
    discount: '76% off',
    rating: 4,
    reviews: 45,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/images/Ellipse_1_5-5.webp',
    isBestSeller: true,
  },
  {
    id: 4,
    title: 'Self Adhesive No Hole Wall Mount, Reusable, Non...',
    price: 20,
    mrp: 149,
    discount: '87% off',
    rating: 4.5,
    reviews: 54,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/images/Ellipse_1_5-5.webp',
    isBestSeller: true,
  },
  {
    id: 5,
    title: 'Anti Crack silicone Gel Foot Protector Moisturising Socks',
    price: 67,
    mrp: 199,
    discount: '66% off',
    rating: 4,
    reviews: 453,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/images/Ellipse_1_5-5.webp',
    isBestSeller: true,
  },
  {
    id: 6,
    title: 'Elegant Nude Glossy Artificial Nail Tips fake nails...',
    price: 13,
    mrp: 99,
    discount: '87% off',
    rating: 5,
    reviews: 300,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/images/Ellipse_1_5-5.webp',
    isBestSeller: true,
  },
  {
    id: 7,
    title: 'Chair-Shaped Mobile Stand – Stylish Phone Holder for...',
    price: 17,
    mrp: 29,
    discount: '41% off',
    rating: 4.5,
    reviews: 52,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/images/Ellipse_1_5-5.webp',
    isBestSeller: true,
  },
  {
    id: 8,
    title: 'Microfiber Car Wash Glove Mitt For Car,Bike,Home &...',
    price: 38,
    mrp: 99,
    discount: '62% off',
    rating: 4.5,
    reviews: 33,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/images/Ellipse_1_5-5.webp',
    isBestSeller: true,
  },
  {
    id: 9,
    title: 'LED Light & Spinning Slap Kids Cartoon Bracelet...',
    price: 57,
    mrp: 199,
    discount: '71% off',
    rating: 4,
    reviews: 83,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/images/Ellipse_1_5-5.webp',
    isBestSeller: true,
  },
  {
    id: 10,
    title: 'Shinchan Character Sitting Figurine (1 Pc / Mix...',
    price: 70,
    mrp: 189,
    discount: '63% off',
    rating: 4.5,
    reviews: 68,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ad25a274-b170-471c-8f10-3e1fdc8ca29e-deodap-in/assets/images/Ellipse_1_5-5.webp',
    isBestSeller: true,
  },
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < Math.floor(rating) ? "#f1c40f" : "#e5e7eb"}
          color={i < Math.floor(rating) ? "#f1c40f" : "#e5e7eb"}
        />
      ))}
    </div>
  );
};

export default function SellingFast() {
  return (
    <section className="py-[60px] bg-white">
      <div className="container px-4 sm:px-0">
        <div className="flex justify-between items-end mb-8">
          <div className="relative">
            <h2 className="text-[24px] font-[700] text-[#121212] flex flex-col items-start">
              Selling out fast
              <span className="h-[2px] w-[90%] bg-[#d92323] mt-1"></span>
            </h2>
          </div>
          <a
            href="/collections/best-selling-products"
            className="bg-[#d92323] text-white px-6 py-2 rounded-[8px] text-[14px] font-[600] uppercase hover:bg-[#b21c1c] transition-colors"
          >
            View all
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-[20px]">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white border border-[#e5e7eb] rounded-[12px] overflow-hidden hover:shadow-card transition-all hover-lift"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full bg-[#f8fafc] overflow-hidden p-2">
                {product.isBestSeller && (
                  <div className="absolute top-2 left-0 z-10">
                    <div className="bg-[#00acc1] text-white text-[10px] font-bold px-3 py-1 rounded-r-full shadow-sm">
                      Best Seller
                    </div>
                  </div>
                )}
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-[15px] flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#d92323] font-[600] text-[16px]">
                    Rs. {product.price.toFixed(2)}
                  </span>
                  <span className="text-[#707070] line-through text-[12px]">
                    MRP Rs. {product.mrp.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <RatingStars rating={product.rating} />
                  <span className="text-[#707070] text-[12px]">
                    ({product.reviews})
                  </span>
                </div>

                <h3 className="text-[14px] font-[500] text-[#121212] line-clamp-2 h-[40px] leading-tight">
                  {product.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="default"
            className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-10 h-[44px] rounded-[8px] text-[14px] font-[600] transition-colors"
          >
            Load More
          </Button>
        </div>
      </div>
    </section>
  );
}