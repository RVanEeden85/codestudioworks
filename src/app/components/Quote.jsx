'use client'

import { useState } from "react";
import QuoteContainer from "./quoteSystem/QuoteContainer";


const InstantQuote = () => {
  const [selectedParents, setSelectedParents] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [price, setPrice] = useState(0);
  const [timeline, setTimeline] = useState(0);

  // Toggle parent category selection
  const toggleParent = (category) => {
    setSelectedParents(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <section id="instant-quote" className="min-h-screen min-w-full flex flex-col items-center justify-center bg-[#4F7966] relative p-10">

      {/* Hero/Intro */}
      <div className="mb-10 text-center max-w-4xl">
        <h2 className="text-white font-bold text-5xl mb-4">Get An Instant Project Estimate</h2>
        <p className="text-white/70 text-lg">
          Select the services you need and get a rough project estimate instantly.
        </p>
      </div>

      <QuoteContainer />

      {/* Price & Timeline */}
      <div className="flex flex-col justify-end items-end w-full max-w-5xl text-right">
        <span className="font-extrabold text-white/50 text-[60px]">${price}</span>
        <span className="font-extrabold text-white/50 text-[30px]">{timeline} days timeline</span>
      </div>
    </section>
  );
};

export default InstantQuote;
