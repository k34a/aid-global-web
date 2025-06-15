"use client";

import Image from "next/image";
import { FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import { SUPABASE_CAMPAIGN_BASE_URL } from "@/lib/db/config";

interface CampaignProduct {
  id: number;
  campaign_id: number;
  title: string;
  description: string;
  price_per_unit: number;
  image?: string;
  units_required: number;
  units_collected: number;
}

interface CampaignProductsProps {
  products: CampaignProduct[];
  slug: string;
}

export default function CampaignProducts({ products, slug }: CampaignProductsProps) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Items You Can Donate</h2>
        <p className="text-gray-600">No donation items available for this campaign yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Items You Can Donate</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {products.map((product) => {
          const imageUrl = product.image 
            ? `${SUPABASE_CAMPAIGN_BASE_URL}/${slug}/images/${product.image}`
            : null;

          const progressPercent = Math.min(100, (product.units_collected / product.units_required) * 100);
          const remainingUnits = product.units_required - product.units_collected;

          return (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            
              <div className="relative h-48 w-full">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      console.error("Product image failed to load:", imageUrl);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FaShoppingCart className="text-4xl text-gray-400" />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {product.description}
                </p>

          
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <FaRupeeSign className="text-teal-600" />
                      <span className="text-xl font-bold text-gray-800">
                        {product.price_per_unit.toLocaleString()}
                      </span>
                    </div>
                    
                    <span className="text-sm text-gray-500">
                      {remainingUnits} left
                    </span>
                  </div>

          
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center">
                    {product.units_collected} of {product.units_required} units collected
                  </div>
                </div>

            
                <div className="flex gap-2">
                  <button 
                    className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors text-sm font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={remainingUnits <= 0}
                  >
                    {remainingUnits > 0 ? 'Support Now' : 'Fully Funded'}
                  </button>
                  <button className="flex-1 border border-teal-600 text-teal-600 py-2 px-4 rounded-lg hover:bg-teal-50 transition-colors text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      
    </div>
  );
} 