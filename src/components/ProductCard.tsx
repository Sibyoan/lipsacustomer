import Link from 'next/link';
import { Product } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
        <div className="relative">
          <img
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {hasDiscount && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
              {Math.round(((product.price - product.discountPrice!) / product.price) * 100)}% OFF
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-[#d72323]">₹{displayPrice}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="text-xs text-gray-500">{product.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
