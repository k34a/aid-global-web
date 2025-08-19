"use client";

import { useState } from "react";
import { Heart, Shield, Star } from "lucide-react";
import ClubShowcase from "@/components/donate/club-showcase";

export default function OneHundredClubs() {
	const [selectedFrequency, setSelectedFrequency] = useState<
		"monthly" | "daily"
	>("monthly");

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
			{/* Header */}
			<div className="shadow-sm border-b border-gray-200 bg-white">
				<div className="max-w-6xl mx-auto py-4 px-6">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-y-2 sm:gap-y-0 px-4">
						<div className="flex items-center gap-2 sm:ml-4">
							<Heart size={24} color="#ef4444" />
							<p className="font-semibold text-lg">
								Join The Movement
							</p>
						</div>

						<span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm sm:mr-4">
							<Shield size={12} />
							Secure & Trusted
						</span>
					</div>
				</div>
			</div>

			<div className="max-w-6xl mx-auto py-12 px-3 sm:px-6">
				{/* Hero Section */}
				<div className="flex flex-col items-center gap-8 mb-12 text-center">
					<span className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-base">
						<Star size={16} />
						5,000+ Active Members
					</span>

					<h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900">
						Choose Your Impact Level
					</h1>

					<p className="text-xl text-gray-600 max-w-3xl">
						From {"\u20B9"}1 to {"\u20B9"}100 - every contribution
						creates ripples of positive change. Start where
						you&apos;re comfortable and grow your impact over time.
					</p>
				</div>

				{/* Frequency Toggle */}
				<div className="flex justify-center mb-12">
					<div className="w-full max-w-sm">
						<div className="flex border rounded-lg overflow-hidden">
							<button
								onClick={() => setSelectedFrequency("monthly")}
								className={`flex-1 py-2 text-center ${
									selectedFrequency === "monthly"
										? "bg-sky-500 text-white"
										: "bg-gray-100 text-gray-700"
								}`}
							>
								Monthly
							</button>
							<button
								onClick={() => setSelectedFrequency("daily")}
								className={`flex-1 py-2 text-center ${
									selectedFrequency === "daily"
										? "bg-sky-500 text-white"
										: "bg-gray-100 text-gray-700"
								}`}
							>
								Daily
							</button>
						</div>
					</div>
				</div>

				{/* Dynamic Club Showcase */}
				<div className="shadow-sm rounded-2xl px-2 sm:p-5 mb-12 bg-white">
					<ClubShowcase frequency={selectedFrequency} />
				</div>
			</div>
		</div>
	);
}
