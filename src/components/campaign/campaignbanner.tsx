"use client";

import ShareCampaignDropdown from "@/components/campaign/sharecampaigndropdown";
import Image from "next/image";
import { IndianRupee } from "lucide-react";
import {
	calculateProgressPercentage,
	formatProgressPercentage,
} from "@/lib/client-utils/progress";
import { getImageUrl } from "./utils";

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
	amount = 0,
}: CampaignBannerProps) {
	const imageUrl = getImageUrl(slug, bannerImage);
	const percent = calculateProgressPercentage(collection, amount);

	const handleScrollToProducts = () => {
		const section = document.getElementById("donation-section");
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="bg-white rounded-xl overflow-visible mb-8">
			<div className="flex flex-col lg:flex-row">
				<div className="lg:w-2/3 h-64 lg:h-96 relative">
					<Image
						src={imageUrl}
						alt={title}
						fill
						className="object-cover"
						priority
						onError={(e) => {
							console.error(
								"Banner image failed to load:",
								imageUrl,
							);
							e.currentTarget.style.display = "none";
						}}
					/>
				</div>

				<div className="lg:w-1/3 p-5 lg:p-6 flex flex-col gap-5 bg-gray-50 border-l border-gray-200">
					<div>
						<h2 className="text-lg font-semibold text-gray-800">
							{title}
						</h2>
						{description && (
							<p className="text-sm text-gray-700 line-clamp-3">
								{description}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<div className="flex justify-between text-xs text-gray-600 font-medium">
							<span>Progress</span>
							<span className="text-blue-600">
								{formatProgressPercentage(collection, amount)}%
							</span>
						</div>

						<div className="w-full bg-gray-300 rounded-full h-2">
							<div
								className="bg-blue-600 h-2 rounded-full transition-all duration-300"
								style={{ width: `${percent}%` }}
							/>
						</div>

						<div className="text-xs text-gray-700 font-medium flex justify-between">
							<span className="flex items-center gap-1">
								<IndianRupee
									size={10}
									className="text-gray-700"
								/>
								{collection} raised
							</span>
							<span className="flex items-center gap-1">
								of{" "}
								<IndianRupee
									size={10}
									className="text-gray-700"
								/>
								{amount}
							</span>
						</div>
					</div>

					<div className="mt-2 text-sm text-gray-700 space-y-4">
						<p className="text-gray-600 italic">
							Every contribution helps us reach our goal faster.
							Support this cause today!
						</p>

						<div className="flex flex-col gap-2">
							<button
								className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
								onClick={handleScrollToProducts}
							>
								Start Donating
							</button>

							<ShareCampaignDropdown />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
