import { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchCampaignMarkdown } from "@/lib/db/fetchCampaignMarkdown";
import { getCampaignBySlug } from "@/lib/db/campaigns";


import CampaignBanner from "@/components/campaign/CampaignBanner";
import CampaignDescription from "@/components/campaign/CampaignDescription";
import CampaignSidebar from "@/components/campaign/CampaignSidebar";
import CampaignProducts from "@/components/campaign/CampaignProducts";

export const metadata: Metadata = {
  title: "Campaign Details",
  description: "View campaign details and donate to make a difference",
};

type PageProps = {
  params: { slug: string };
};

export default async function CampaignDetailPage({ params }: PageProps) {
  const { slug } = params;

  const campaign = await getCampaignBySlug(slug);
  if (!campaign) return notFound();

  const markdown = await fetchCampaignMarkdown(slug) || "No description available.";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
       
        <CampaignBanner 
          slug={slug}
          bannerImage={campaign.banner_image}
          title={campaign.title}
          description={campaign.description}
          collection={campaign.collection}
          amount={campaign.amount}
        />

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CampaignDescription markdown={markdown} />
          </div>

          <div>
            <CampaignSidebar backers={campaign.backers} />
          </div>
        </div>

      
        <CampaignProducts 
          products={campaign.campaign_products || []}
          slug={slug}
        />
      </div>
    </div>
  );
}
