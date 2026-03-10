"use client";

import { useState } from 'react';
import { Play, Eye } from 'lucide-react';
import VideoModal from '@/components/VideoModal';

// Local videos from public/assests/video
const sampleVideos = [
  {
    id: "1",
    productId: "1LabI4WDzwiykj0tTHjl",
    productName: "5 Fold Manual Open Umbrella",
    videoUrl: "/assests/video/first.mp4",
    thumbnail: "https://images.unsplash.com/photo-1541919329513-35f7af297129?w=400&h=600&fit=crop",
    views: 3000,
    price: 222,
    originalPrice: 499,
    discount: 55,
    createdAt: new Date()
  },
  {
    id: "2",
    productId: "4WxuGd4m36S7eZ3KhpkO",
    productName: "Acrylic Jewellery Container",
    videoUrl: "/assests/video/second.mp4",
    thumbnail: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop",
    views: 4000,
    price: 220,
    originalPrice: 699,
    discount: 69,
    createdAt: new Date()
  },
  {
    id: "3",
    productId: "4Xw8ukxe25dOOKAn9xLE",
    productName: "Pink Piano Usb Mini",
    videoUrl: "/assests/video/third.mp4",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
    views: 1000,
    price: 453,
    originalPrice: 699,
    discount: 35,
    createdAt: new Date()
  },
  {
    id: "4",
    productId: "F4KVYiElxiHMfqkU1JEt",
    productName: "Double-headed Silicone Makeup Brush",
    videoUrl: "/assests/video/fourth.mp4",
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop",
    views: 15000,
    price: 117,
    originalPrice: 199,
    discount: 41,
    createdAt: new Date()
  },
  {
    id: "5",
    productId: "8p7C8Kden7Rdotav3Jn8",
    productName: "Star Crystal Diamond Touch Lamp",
    videoUrl: "/assests/video/fifth.mp4",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    views: 42000,
    price: 219,
    originalPrice: 999,
    discount: 78,
    createdAt: new Date()
  },
  {
    id: "6",
    productId: "1LabI4WDzwiykj0tTHjl",
    productName: "Door Stopper Mini Anti-collision",
    videoUrl: "/assests/video/sixth.mp4",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
    views: 25000,
    price: 54,
    originalPrice: 99,
    discount: 45,
    createdAt: new Date()
  }
];

// Format view count (3500 -> 3.5K)
const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

export default function InfluencerVideosDemo() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <>
      <section className="py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-semibold text-black">Top Pick By Influencers</h2>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {sampleVideos.map((video) => {
              const discountPercentage = Math.round(((video.originalPrice - video.price) / video.originalPrice) * 100);
              
              return (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-[180px] cursor-pointer group"
                  onClick={() => handleVideoClick(video)}
                  onMouseEnter={(e) => {
                    // Show video and hide thumbnail on hover
                    const container = e.currentTarget;
                    const thumbnail = container.querySelector('img') as HTMLImageElement;
                    const video = container.querySelector('video') as HTMLVideoElement;
                    
                    if (thumbnail && video) {
                      thumbnail.style.display = 'none';
                      video.style.display = 'block';
                      video.currentTime = 0;
                      const playPromise = video.play();
                      if (playPromise !== undefined) {
                        playPromise.catch(() => {
                          console.log('Video autoplay prevented');
                        });
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    // Hide video and show thumbnail when not hovering
                    const container = e.currentTarget;
                    const thumbnail = container.querySelector('img') as HTMLImageElement;
                    const video = container.querySelector('video') as HTMLVideoElement;
                    
                    if (thumbnail && video) {
                      video.pause();
                      video.style.display = 'none';
                      thumbnail.style.display = 'block';
                    }
                  }}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-200">
                    {/* Video Thumbnail */}
                    <div className="relative h-[320px] bg-gray-100">
                      {/* Thumbnail Image - Always visible initially */}
                      <img
                        src={video.thumbnail}
                        alt={video.productName}
                        className="w-full h-full object-cover absolute inset-0 z-10"
                        style={{ display: 'block' }}
                        onError={(e) => {
                          // Fallback to gradient if thumbnail fails
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                            const fallbackDiv = document.createElement('div');
                            fallbackDiv.className = 'flex items-center justify-center h-full text-white font-semibold absolute inset-0 z-10';
                            fallbackDiv.textContent = `Video ${video.id}`;
                            parent.appendChild(fallbackDiv);
                          }
                        }}
                      />
                      
                      {/* Video Element - Hidden initially, shown on hover */}
                      <video
                        src={video.videoUrl}
                        className="w-full h-full object-cover absolute inset-0 z-20"
                        style={{ display: 'none' }}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onLoadedData={(e) => {
                          // Set initial frame
                          e.currentTarget.currentTime = 1;
                        }}
                        onError={(e) => {
                          // If video fails, keep thumbnail visible
                          e.currentTarget.style.display = 'none';
                          const thumbnail = e.currentTarget.parentElement?.querySelector('img');
                          if (thumbnail) thumbnail.style.display = 'block';
                        }}
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