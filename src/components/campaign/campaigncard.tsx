"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, Share2, IndianRupee } from "lucide-react";
import { copyToClipboard } from "@/lib/client-utils/copytoclipboard";
import { calculateProgressPercentage } from "@/lib/client-utils/progress";
import { getImageUrl } from "./utils";

export default function CampaignCard({ campaign }: { campaign: any }) {
	const percent = calculateProgressPercentage(
		campaign.collection,
		campaign.amount,
	);

	const imageUrl = getImageUrl(campaign.slug, campaign.banner_image);

	return (
		<div className="flex flex-col w-full max-w-sm mx-auto">
			<Link href={`/campaign/${campaign.slug}`}>
				<h2 className="text-base sm:text-lg font-bold mb-3 hover:text-sky-700 transition line-clamp-1">
					{campaign.title}
				</h2>
			</Link>

			<div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col w-full transform hover:-translate-y-1 h-full">
				<Link
					href={`/campaign/${campaign.slug}`}
					className="block relative h-48 w-full"
				>
					{campaign.banner_image ? (
						<Image
							src={imageUrl}
							alt={campaign.title}
							fill
							className="object-cover rounded-t-xl"
							onError={(e) => {
								console.error(
									"Image failed to load:",
									imageUrl,
								);
								e.currentTarget.style.display = "none";
							}}
						/>
					) : (
						<div className="w-full h-full bg-gray-200 rounded-t-xl flex items-center justify-center">
							<span className="text-gray-500 text-sm">
								No image available
							</span>
						</div>
					)}
				</Link>

				<div className="p-5 flex flex-col flex-1">
					<p className="font-semibold text-sm sm:text-base mb-3 line-clamp-2 leading-relaxed">
						{campaign.description}
					</p>

					<div className="flex items-center justify-between text-xs text-gray-800 mb-2">
						<span className="flex items-center gap-1 text-sky-600 font-bold text-sm sm:text-base">
							<IndianRupee className="w-4 h-4" />
							<strong>{campaign.collection}</strong> Raised
						</span>
						<span className="flex items-center gap-1">
							<Users className="w-4 h-4" /> {campaign.backers}{" "}
							Backers
						</span>
					</div>

					<div className="w-full bg-gray-200 rounded-full h-2 mb-3">
						<div
							className="bg-sky-600 h-2 rounded-full"
							style={{ width: `${percent}%` }}
						></div>
					</div>

					<div className="flex gap-2 mt-auto">
						<Link
							href={`/campaign/${campaign.slug}`}
							className="flex-1 hover:bg-sky-600 border-2 border-sky-500 text-sky-500 hover:text-white text-center font-semibold py-2 rounded hover:bg-sky-700 transition text-sm"
						>
							Donate Now
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
