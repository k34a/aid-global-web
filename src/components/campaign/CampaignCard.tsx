"use client";

import Link from "next/link";
import Image from "next/image";
import { FaUserFriends, FaShareAlt } from "react-icons/fa";

const SUPABASE_IMAGE_URL =
  "https://whewzwebzozrrgxceubm.supabase.co/storage/v1/object/public/content/images";

export default function CampaignCard({ campaign }: { campaign: any }) {
  const percent = Math.min(100, (campaign.collection / campaign.amount) * 100);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col w-full max-w-sm mx-auto">
      {/* Title */}
      <Link href={`/campaign/${campaign.slug}`}>
        <h2 className="text-xl font-bold mb-3 hover:text-teal-700 transition line-clamp-2">
          {campaign.title}
        </h2>
      </Link>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col w-full transform hover:-translate-y-1">
        <Link href={`/campaign/${campaign.slug}`} className="block relative h-48 w-full">
          {campaign.banner_image ? (
            <Image
              src={`${SUPABASE_IMAGE_URL}/${campaign.banner_image}`}
              alt={campaign.title}
              fill
              className="object-cover rounded-t-xl"
              onError={(e) => {
                console.error("Image failed to load:", campaign.banner_image);
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-t-xl flex items-center justify-center">
              <span className="text-gray-500 text-sm">No image available</span>
            </div>
          )}

          {/* Tax Benefit Badge */}
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Tax Benefit
          </span>
        </Link>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Author */}
          {campaign.by && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {getInitials(campaign.by)}
              </div>
              <span className="text-gray-700 font-medium text-sm">
                {campaign.by}
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-700 font-bold text-base mb-3 line-clamp-2 leading-relaxed">
            {campaign.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>
              <strong>₹{campaign.collection.toLocaleString()}</strong> Raised
            </span>
            <span className="flex items-center gap-1">
              <FaUserFriends /> {campaign.backers} Backers
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div
              className="bg-teal-600 h-2 rounded-full"
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-auto">
            <button
              className="flex-1 flex items-center justify-center gap-1 border border-teal-600 text-teal-600 font-semibold py-2 rounded hover:bg-teal-50 transition text-sm"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                // TODO: Add share logic
              }}
            >
              <FaShareAlt /> Share
            </button>
            <Link
              href={`/campaign/${campaign.slug}`}
              className="flex-1 bg-teal-600 text-white text-center font-semibold py-2 rounded hover:bg-teal-700 transition text-sm"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
