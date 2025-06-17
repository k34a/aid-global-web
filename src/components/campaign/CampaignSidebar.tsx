"use client";

import {
  FaUserFriends,
  FaCalendarAlt,
  FaLink,
  FaCheckCircle,
} from "react-icons/fa";

import Facebook from "@/components/icons/facebook";
import Twitter from "@/components/icons/twitter";
import Whatsapp from "@/components/icons/whatsapp";

interface CampaignSidebarProps {
  backers: number;
}

export default function CampaignSidebar({ backers }: CampaignSidebarProps) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("Campaign link copied to clipboard!");
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Campaign Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaUserFriends className="text-teal-600 text-xl" />
              <span className="text-gray-700">Backers</span>
            </div>
            <span className="font-bold text-gray-800">{backers}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-teal-600 text-xl" />
              <span className="text-gray-700">Days Left</span>
            </div>
            <span className="font-bold text-gray-800">30</span>
          </div>
        </div>
      </div>

      {/* Share Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Spread The Word</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
            }
            className="bg-[#3b5998] text-white p-3 rounded-full hover:scale-105 transition"
          >
            <Facebook className="w-4 h-4" />
          </button>

          <button
            onClick={() =>
              window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, "_blank")
            }
            className="bg-[#1da1f2] text-white p-3 rounded-full hover:scale-105 transition"
          >
            <Twitter className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopyLink}
            className="bg-gray-500 text-white p-3 rounded-full hover:scale-105 transition"
          >
            <FaLink />
          </button>

          <button
            onClick={() =>
              window.open(`https://wa.me/?text=${encodeURIComponent("Check this out: " + url)}`, "_blank")
            }
            className="bg-[#25d366] text-white p-3 rounded-full hover:scale-105 transition"
          >
            <Whatsapp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Campaign Milestones</h3>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            Launched successfully
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            50+ backers contributed
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-gray-400" />
            ₹10,000 goal in sight
          </li>
        </ul>
      </div>
    </div>
  );
}
