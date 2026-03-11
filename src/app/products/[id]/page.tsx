"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useReviews } from '@/hooks/useReviews';
import { Product } from '@/hooks/useProducts';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  
  const { reviews, addReview } = useReviews(params.id as string);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const productDoc = await getDoc(doc(db, 'products', params.id as string));
      if (productDoc.exists()) {
        setProduct({ id: productDoc.id, ...productDoc.data() } as Product);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/account/login');
      return;
    }

    if (!product) return;

    await addToCart({
      productId: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      quantity,
      image: product.images[0],
      vendorId: product.vendorId || '', // Include vendorId from product
      product: {
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.images[0],
        category: product.category || 'General'
      }
    });

    alert('Added to cart!');
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/account/login');
      return;
    }

    try {
      await addReview(params.id as string, rating, reviewText);
      setShowReviewForm(false);
      setReviewText('');
      setRating(5);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <UtilityBar />
        <Header />
        <main className="grow flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <UtilityBar />
        <Header />
        <main className="grow flex items-center justify-center">
          <div className="text-center">Product not found</div>
        </main>
        <Footer />
      </div>
    );
  }

  const displayPrice = product.discountPrice || product.price;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UtilityBar />
      <Header />
      <main className="grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Images */}
              <div>
                <div className="mb-4">
                  <img 
                    src={product.images[selectedImage] || '/placeholder.jpg'} 
                    alt={product.name}
                    className="w-full h-96 object-cover rounded"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer ${selectedImage === idx ? 'border-2 border-[#d72323]' : ''}`}
                      onClick={() => setSelectedImage(idx)}
                    />
                  ))}
                </div>
              </div>

              {/* Details */}
              <div>
                <h1 className="text-3xl font-bold text-[#0b1726] mb-4">{product.name}</h1>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-[#d72323]">₹{displayPrice}</span>
                  {product.discountPrice && (
                    <span className="ml-3 text-xl text-gray-500 line-through">₹{product.price}</span>
                  )}
                </div>

                <div className="mb-4">
                  <span className={`px-3 py-1 rounded text-sm ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>

                <p className="text-gray-700 mb-6">{product.description}</p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 border border-gray-300 rounded"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 border border-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-[#d72323] text-white font-bold py-3 rounded hover:bg-[#b81e1e] transition-colors uppercase disabled:opacity-50"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 border-t pt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                {user && !showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-[#d72323] text-white px-4 py-2 rounded hover:bg-[#b81e1e]"
                  >
                    Write a Review
                  </button>
                )}
              </div>

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="mb-8 p-4 border rounded">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="border border-gray-300 rounded px-3 py-2"
                    >
                      {[5, 4, 3, 2, 1].map(r => (
                        <option key={r} value={r}>{r} Stars</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Review</label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-[#d72323] text-white px-4 py-2 rounded">
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="border border-gray-300 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{review.customerName || 'Customer'}</span>
                      <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                    </div>
                    <p className="text-gray-700">{review.review}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                {reviews.length === 0 && (
                  <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
