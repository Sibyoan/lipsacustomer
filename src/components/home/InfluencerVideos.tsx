"use client";

import { useState } from 'react';
import { Play, Eye } from 'lucide-react';
import { useInfluencerVideos, InfluencerVideo } from '@/hooks/useInfluencerVideos';
import VideoModal from '@/components/VideoModal';

export default function InfluencerVideos() {
  const { videos, loading, error, formatViews } = useInfluencerVideos(10);
  const [selectedVideo, setSelectedVideo] = useState<InfluencerVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = (video: InfluencerVideo) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-semibold text-black">Top Pick By Influencers</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[180px]">
                <div className="bg-gray-100 rounded-xl overflow-hidden animate-pulse">
                  <div className="h-[320px] bg-gray-200"></div>
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-semibold text-black">Top Pick By Influencers</h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p>Unable to load videos. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-semibold text-black">Top Pick By Influencers</h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p>No influencer videos available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-semibold text-black">Top Pick By Influencers</h2>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {videos.map((video) => {
              const discountPercentage = Math.round(((video.originalPrice - video.price) / video.originalPrice) * 100);
              
              return (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-[180px] cursor-pointer group"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-200">
                    {/* Video Thumbnail */}
                    <div className="relative h-[320px] bg-gray-100">
                      <img
                        src={video.thumbnail}
                        alt={video.productName}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Views Badge */}
                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatViews(video.views)}
                      </div>
                      
                      {/* Discount Badge */}
                      {video.originalPrice > video.price && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {discountPercentage}% OFF
                        </div>
                      )}
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all">
                        <div className="bg-white bg-opacity-90 rounded-full p-3 group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-gray-800 ml-1" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                        {video.productName}
                      </h3>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#d72323]">
                          ₹{video.price}
                        </span>
                        {video.originalPrice > video.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{video.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}