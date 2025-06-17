"use client";
import React from "react";
import Image from "next/image";
import { DonationCardType } from "@/components/homepage/categories/types";
import { Share2 } from "lucide-react";

interface DonationCardProps {
	card: DonationCardType;
}

const DonationCard: React.FC<DonationCardProps> = ({ card }) => {
	const percent = Math.min(100, (card.raised / card.required) * 100);

	return (
		<div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 w-full sm:w-72 md:w-80 m-1 sm:m-2 flex flex-col">
			<div className="relative w-full h-32 sm:h-36 md:h-40 rounded-lg overflow-hidden">
				<Image
					src={card.image}
					alt={card.title}
					fill
					sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
					className="object-cover"
				/>
				{card.tag && (
					<span className="absolute top-2 right-2 bg-yellow-300 text-xs px-2 py-1 rounded">
						{card.tag}
					</span>
				)}
			</div>
			<div className="mt-2 sm:mt-3">
				<div className="font-bold text-base sm:text-lg">
					{card.title}
				</div>
				<div className="text-xs text-gray-500 mt-1 mb-2">
					By {card.org}
				</div>
				<div className="flex justify-between text-xs sm:text-sm mb-1">
					<span className="font-semibold text-gray-700">
						₹{card.raised.toLocaleString()}
					</span>
					<span className="text-gray-500">
						₹{card.required.toLocaleString()}
					</span>
				</div>
				<div className="w-full bg-blue-100 h-2 rounded">
					<div
						className="bg-blue-500 h-2 rounded"
						style={{ width: `${percent}%` }}
					/>
				</div>
				<div className="text-xs text-gray-500 mt-1">
					{card.backers} Backers
				</div>
				<div className="flex justify-between mt-2 sm:mt-3 gap-2">
					<button className="flex items-center px-2 sm:px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 text-xs sm:text-sm">
						<span className="mr-1">
							<Share2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 font-bold" />
						</span>{" "}
						Share
					</button>
					<button className="bg-blue-500 text-white px-3 sm:px-4 py-1 rounded hover:bg-pink-600 text-xs sm:text-sm">
						Donate Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default DonationCard;
