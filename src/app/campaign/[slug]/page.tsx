import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { fetchCampaignMarkdown } from "@/lib/fetchCampaignMarkdown";
import { supabaseAdmin } from "@/lib/db/supabase";

export const metadata: Metadata = {
  title: "Donation Status",
  description: "View the status of your donation and download the receipt",
};

type PageProps = {
  params: { slug: string };
};

export default async function DonationStatusPage({ params }: PageProps) {
  const markdown = await fetchCampaignMarkdown(params.slug);

  // Replace this with actual API fetch if you have it connected
  const data = {
    id: "81263c39-4c04-460d-af9c-585937104b6f",
    title: "Camp1",
    description: "sdssd.sadsa sads sad as da",
    slug: "asa",
    amount: 10000000,
    created_at: "2025-06-08T06:14:20.545093+00:00",
    ended_at: null,
    collection: 105,
    backers: 2,
    bannerImage: "p1.jpg",
    campaign_products: [
      {
        id: "71246dba-94fd-4d13-8fb9-4ffc733acfbd",
        image: "p1.jpg",
        title: "p1",
        price_per_unit: 10,
        units_required: 5000,
        units_collected: 5,
      },
      {
        id: "3f506987-646a-4544-8653-d3a90dd1a07b",
        image: "p2.jpg",
        title: "p2",
        price_per_unit: 25,
        units_required: 5000,
        units_collected: 2,
      },
    ],
  };

  const bannerUrl = supabaseAdmin.storage
    .from("content")
    .getPublicUrl(`images/${data.bannerImage}`).data.publicUrl;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Banner */}
      <div className="rounded-xl overflow-hidden shadow-lg">
        <img
          src={bannerUrl}
          alt={data.title}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Campaign Info */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="text-gray-600">{data.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <p><strong>{data.backers}</strong> Backers</p>
          <p><strong>₹{data.collection.toLocaleString()}</strong> Raised</p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-teal-600 h-2 rounded-full"
            style={{ width: `${(data.collection / data.amount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Products Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">What You Can Donate</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.campaign_products.map((product, i) => {
            const imageUrl = supabaseAdmin.storage
              .from("content")
              .getPublicUrl(`images/${product.image}`).data.publicUrl;

            const percentage = (product.units_collected / product.units_required) * 100;

            return (
              <div
                key={product.id}
                className="border rounded-xl shadow-sm p-4 flex flex-col justify-between"
              >
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  ₹{product.price_per_unit} per unit
                </p>
                <p className="text-sm text-gray-500">
                  {product.units_collected} of {product.units_required} units funded
                </p>
                <div className="w-full bg-gray-200 h-2 rounded mt-2 mb-4">
                  <div
                    className="bg-emerald-500 h-2 rounded"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <button className="mt-auto bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-teal-700 transition">
                  Donate Now
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Markdown Description */}
      <section className="prose max-w-none mt-10">
        {markdown ? <ReactMarkdown>{markdown}</ReactMarkdown> : <p>No campaign details found.</p>}
      </section>
    </main>
  );
}
