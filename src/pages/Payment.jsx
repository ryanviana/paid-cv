import React from "react";
import HeroSection from "../components/payment/HeroSection";
import FreePreviewSection from "../components/payment/FreePreviewSection";
import OfferSection from "../components/payment/OfferSection";
import WhatYouGetSection from "../components/payment/WhatYouGetSection";
import TestimonialsSection from "../components/payment/TestimonialsSection";
import AboutUsSection from "../components/payment/AboutUsSection";
import FooterSection from "../components/payment/FooterSection";

function Payment() {
  const originalPrice = 38.9;
  const discountedPrice = 9.9;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeroSection />
      <FreePreviewSection />
      <WhatYouGetSection />
      <OfferSection
        originalPrice={originalPrice}
        discountedPrice={discountedPrice}
      />
      <TestimonialsSection />
      <AboutUsSection />
      <FooterSection />
    </div>
  );
}

export default Payment;
