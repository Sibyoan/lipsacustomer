"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

const pageContent: Record<string, { title: string; content: string }> = {
  'about-us': {
    title: 'About Us',
    content: 'Lipsa is your trusted wholesale marketplace offering quality products at unbeatable prices. We connect businesses with authentic suppliers across India.'
  },
  'contact-us': {
    title: 'Contact Us',
    content: 'Get in touch with our support team. Email: support@lipsa.com | Phone: +91-XXXXXXXXXX'
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    content: 'Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.'
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions',
    content: 'By using Lipsa services, you agree to these terms and conditions. Please read them carefully.'
  },
  'shipping-policy': {
    title: 'Shipping Policy',
    content: 'We offer fast and reliable shipping across India. Orders are typically processed within 24-48 hours.'
  },
  'return-and-refund-policy': {
    title: 'Return and Refund Policy',
    content: 'We accept returns within 7 days of delivery. Products must be unused and in original packaging.'
  },
  'dropshipping-webinar': {
    title: 'Free Dropshipping Webinar',
    content: 'Join our free webinar to learn how to start your dropshipping business and earn ₹1L+ monthly income. No prior experience needed!'
  },
  'gst-billing': {
    title: 'GST Billing',
    content: 'Get GST invoices for all your orders. Perfect for businesses looking to claim input tax credit.'
  },
  'franchise': {
    title: 'Franchise Opportunities',
    content: 'Partner with Lipsa and start your own wholesale business. Contact us to learn more about franchise opportunities.'
  }
};

export default function PageContent() {
  const params = useParams();
  const slug = params.slug as string;
  const page = pageContent[slug] || {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    content: 'This page is under construction. Please check back soon for updates.'
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UtilityBar />
      <Header />
      <main className="flex-grow">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#d72323]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{page.title}</span>
          </nav>
          
          <h1 className="text-[36px] font-bold text-[#0b1726] mb-6">{page.title}</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 text-[16px] leading-relaxed">{page.content}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
