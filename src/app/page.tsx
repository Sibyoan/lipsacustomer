"use client";

import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import HeroSlider from '@/components/sections/hero-slider';
import TopCategories from '@/components/sections/top-categories';
import InfluencerVideos from '@/components/home/InfluencerVideosDemo';
import PriceRangeExplore from '@/components/sections/price-range-explore';
import KitchenAccessories from '@/components/sections/kitchen-accessories';
import HomeEssentials from '@/components/sections/home-essentials';
import SellingOutFast from '@/components/sections/selling-out-fast';
import Electronics from '@/components/sections/electronics';
import BabyEssentials from '@/components/sections/baby-essentials';
import PriceRangeBanner from '@/components/sections/price-range-banner';
import GSTBillingBanner from '@/components/sections/gst-billing-banner';
import PromotionalMarketingBlock from '@/components/sections/dropshipping-webinar';
import TrustMediaLinks from '@/components/sections/trust-media-links';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UtilityBar />
      <Header />
      <main className="grow">
        <HeroSlider />
        <TopCategories />
        <InfluencerVideos />
        <PriceRangeExplore />
        <KitchenAccessories />
        <HomeEssentials />
        <SellingOutFast />
        <Electronics />
        <BabyEssentials />
        <PriceRangeBanner />
        <GSTBillingBanner />
        <PromotionalMarketingBlock />
        <TrustMediaLinks />
      </main>
      <Footer />
    </div>
  );
}
