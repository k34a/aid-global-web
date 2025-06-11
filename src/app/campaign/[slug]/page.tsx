import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { supabaseAdmin } from "@/lib/db/supabase";
import { getCampaignBySlug } from "@/lib/db/campaigns";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaUserFriends, FaCalendarAlt, FaMapMarkerAlt, FaHeart } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Campaign Details",
  description: "View campaign details and donate to make a difference",
};

const SUPABASE_IMAGE_URL =
  "https://whewzwebzozrrgxceubm.supabase.co/storage/v1/object/public/content/images";

type PageProps = {
  params: { slug: string };
};

async function fetchMarkdown(slug: string): Promise<string> {
  const { data, error } = await supabaseAdmin
    .storage
    .from("content")
    .download(`campaigns/${slug}.md`);

  if (error || !data) {
    console.error("Error fetching markdown:", error?.message);
    return "No description available.";
  }

  const text = await data.text();
  return text;
}
export default async function CampaignDetailPage(props: PageProps) {
  const { slug } = props.params;

  
  // Fetch campaign data from database
  const campaign = await getCampaignBySlug(slug);
  
  if (!campaign) {
    notFound();
  }

  const markdown = await fetchMarkdown(slug);
  const progressPercentage = Math.min(100, (campaign.collection / campaign.amount) * 100);
  const remainingAmount = campaign.amount - campaign.collection;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Banner */}
      <div className="relative h-96 md:h-[500px] w-full">
        {campaign.banner_image ? (
          <Image
            src={`${SUPABASE_IMAGE_URL}/${campaign.banner_image}`}
            alt={campaign.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center">
            <FaHeart className="text-white text-6xl opacity-50" />
          </div>
        )}
        
        
        
        {/* Content on Banner */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-4 py-12 w-full">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {campaign.title}
              </h1>
              <p className="text-xl md:text-2xl mb-6 opacity-90 max-w-3xl">
                {campaign.description}
              </p>
              
              {/* Campaign Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <FaUserFriends className="text-2xl" />
                  <span className="text-lg font-semibold">{campaign.backers} Backers</span>
                </div>
                {campaign.by && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        
                      </span>
                    </div>
                    <span className="text-lg">by {campaign.by}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Campaign Progress</h2>
                <span className="text-3xl font-bold text-teal-600">{progressPercentage.toFixed(1)}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">₹{campaign.collection.toLocaleString()}</div>
                  <div className="text-gray-600">Raised</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">₹{campaign.amount.toLocaleString()}</div>
                  <div className="text-gray-600">Goal</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">₹{remainingAmount.toLocaleString()}</div>
                  <div className="text-gray-600">Remaining</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Campaign</h2>
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Donate Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Support This Cause</h3>
              <p className="text-gray-600 mb-6">
                Your donation can make a real difference. Every contribution helps us get closer to our goal.
              </p>
              
              <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-teal-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg mb-4">
                Donate Now
              </button>
              
              <button className="w-full border-2 border-teal-500 text-teal-600 font-semibold py-3 px-6 rounded-xl hover:bg-teal-50 transition-all duration-200">
                Share Campaign
              </button>
            </div>

            {/* Campaign Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Campaign Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaUserFriends className="text-teal-600 text-lg" />
                  <div>
                    <div className="font-semibold">{campaign.backers}</div>
                    <div className="text-sm text-gray-600">Total Backers</div>
                  </div>
                </div>
                
                {campaign.by && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-600 font-semibold">
                       
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{campaign.by}</div>
                      <div className="text-sm text-gray-600">Campaign Organizer</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        {campaign.campaign_products && campaign.campaign_products.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Items You Can Donate</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaign.campaign_products.map((product: any) => (
                  <div
                    key={product.id}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-100"
                  >
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      {product.image ? (
                        <Image
                          src={`${SUPABASE_IMAGE_URL}/${product.image}`}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-500">No image</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                    <p className="text-2xl font-bold text-teal-600 mb-2">
                      ₹{product.price_per_unit}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">per unit</p>
                    
                    {/* Product Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">
                          {product.units_collected}/{product.units_required}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-500 h-2 rounded-full"
                          style={{ 
                            width: `${Math.min(100, (product.units_collected / product.units_required) * 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
                      Donate This Item
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
