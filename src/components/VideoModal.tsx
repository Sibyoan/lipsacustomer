"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Play, Pause } from 'lucide-react';
import { InfluencerVideo } from '@/hooks/useInfluencerVideos';

interface VideoModalProps {
  video: InfluencerVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen || !video) return null;

  const discountPercentage = Math.round(((video.originalPrice - video.price) / video.originalPrice) * 100);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Influencer Pick</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Video */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            className="w-full h-80 object-cover"
            controls
            poster={video.thumbnail}
            preload="metadata"
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {video.productName}
            </h4>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold text-[#d72323]">
                ₹{video.price}
              </span>
              {video.originalPrice > video.price && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{video.originalPrice}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="text-sm text-gray-600 mb-4">
              {video.views.toLocaleString()} views
            </div>
          </div>

          {/* Action Button */}
          <Link
            href={`/products/${video.productId}`}
            className="w-full bg-[#d72323] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#b91c1c] transition-colors text-center block"
            onClick={onClose}
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}