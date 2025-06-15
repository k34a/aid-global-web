"use client";

import Image from "next/image";
import { FaRupeeSign } from "react-icons/fa";
import { SUPABASE_CAMPAIGN_BASE_URL } from "@/lib/db/config";

interface CampaignBannerProps {
  slug: string;
  bannerImage: string;
  title: string;
  description?: string;
  collection?: number;
  amount?: number;
}

export default function CampaignBanner({ 
  slug, 
  bannerImage, 
  title, 
  description,
  collection = 0,
  amount = 0
}: CampaignBannerProps) {
  const imageUrl = `${SUPABASE_CAMPAIGN_BASE_URL}/${slug}/images/${bannerImage}`;
  const percent = Math.min(100, (collection / amount) * 100);

  return (
    <div className="bg-white rounded-xl overflow-hidden mb-8">
      <div className="flex flex-col lg:flex-row">
        
        
        <div className="lg:w-2/3 h-64 lg:h-96 relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              console.error("Banner image failed to load:", imageUrl);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

      
        <div className="lg:w-1/3 p-4 lg:p-5 flex flex-col gap-4 bg-gray-50 border-l border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            {description && (
              <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
            )}
          </div>

        
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600 font-medium">
              <span>Progress</span>
              <span className="text-teal-600">{percent.toFixed(1)}%</span>
            </div>

            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="text-xs text-gray-700 font-medium flex justify-between">
              <span className="flex items-center gap-1">
                <FaRupeeSign className="text-[10px]" />
                {collection} raised
              </span>
              <span className="flex items-center gap-1">
                of <FaRupeeSign className="text-[10px]" />
                {amount}
              </span>
            </div>
          </div>

     
          <div className="mt-6 text-sm text-gray-700 space-y-4">
            <p className="text-gray-600 italic">
              Every contribution helps us reach our goal faster. Support this cause today!
            </p>

            <div className="flex flex-col gap-2">
              <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold text-sm">
                Donate Now
              </button>

              <button
                className="w-full border border-teal-600 text-teal-600 py-2 px-4 rounded-lg hover:bg-teal-50 transition-colors text-sm font-semibold"
                onClick={() => {
                  const url = window.location.href;
                  navigator.clipboard.writeText(url).then(() => {
                    alert("Campaign link copied to clipboard!");
                  });
                }}
              >
                Share Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
