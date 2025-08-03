"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {faqs} from "@/config/faq"
import { DonationDetails } from "@/config/donation";


const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-200 min-h-screen py-16 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10">FAQs</h1>

      <div className="w-full max-w-2xl bg-white rounded-md shadow-md">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-black text-md">
        In case you have more queries, please write to us at{" "}
        <span className="text-[#2563eb] font-medium">{DonationDetails.email}</span>
      </p>
    </div>
  );
};

export default FaqSection;
