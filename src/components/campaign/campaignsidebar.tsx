"use client";

import { Users, CalendarDays, Link2, CheckCircle, Target } from "lucide-react";

import Facebook from "@/components/icons/facebook";
import Twitter from "@/components/icons/twitter";
import Whatsapp from "@/components/icons/whatsapp";
import { useEffect, useState } from "react";
import { copyToClipboard } from "@/lib/utils/copytoclipboard";
import { getCampaignMilestones, Milestone } from "@/data/campaignmilestones";

interface CampaignSidebarProps {
	backers: number;
	goal?: number;
	currentAmount?: number;
}

export default function CampaignSidebar({
	backers,
	goal = 10000,
	currentAmount = 0,
}: CampaignSidebarProps) {
	const [url, setUrl] = useState("");
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		setUrl(window.location.href);
	}, []);

	const handleCopyLink = async () => {
		await copyToClipboard(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Get milestones from external data file
	const milestones = getCampaignMilestones(goal);

	const isMilestoneAchieved = (milestone: Milestone) => {
		return milestone.condition({ backers, currentAmount, goal });
	};

	const achievedCount = milestones.filter(isMilestoneAchieved).length;
	const progressPercentage = (achievedCount / milestones.length) * 100;

	return (
		<div className="space-y-6">
			<div className="bg-white rounded-xl shadow-lg p-6">
				<h3 className="text-lg font-bold text-gray-800 mb-4">
					Aid Campaign Progress
				</h3>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Users className="text-teal-600 h-5 w-5" />
							<span className="text-gray-700">Donors</span>
						</div>
						<span className="font-bold text-gray-800">
							{backers}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<CalendarDays className="text-teal-600 h-5 w-5" />
							<span className="text-gray-700">Days Left</span>
						</div>
						<span className="font-bold text-gray-800">30</span>
					</div>
					{goal && (
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Target className="text-teal-600 h-5 w-5" />
								<span className="text-gray-700">
									Funds Raised
								</span>
							</div>
							<span className="font-bold text-gray-800">
								₹{currentAmount.toLocaleString()} / ₹
								{goal.toLocaleString()}
							</span>
						</div>
					)}
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-lg p-6">
				<h3 className="text-lg font-bold text-gray-800 mb-4">
					Share Our Mission
				</h3>
				<div className="flex items-center gap-3">
					<button
						onClick={() =>
							window.open(
								`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
								"_blank",
							)
						}
						className="bg-[#3b5998] text-white p-3 rounded-full hover:scale-105 transition"
					>
						<Facebook className="w-4 h-4" />
					</button>

					<button
						onClick={() =>
							window.open(
								`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
								"_blank",
							)
						}
						className="bg-[#1da1f2] text-white p-3 rounded-full hover:scale-105 transition"
					>
						<Twitter className="w-4 h-4" />
					</button>

					<button
						onClick={handleCopyLink}
						className={`${copied ? "bg-green-500" : "bg-gray-500"} text-white p-3 rounded-full hover:scale-105 transition relative`}
					>
						<Link2 className="w-4 h-4" />
						{copied && (
							<span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
								Copied!
							</span>
						)}
					</button>

					<button
						onClick={() =>
							window.open(
								`https://wa.me/?text=${encodeURIComponent("Check this out: " + url)}`,
								"_blank",
							)
						}
						className="bg-[#25d366] text-white p-3 rounded-full hover:scale-105 transition"
					>
						<Whatsapp className="w-4 h-4" />
					</button>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-lg p-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-bold text-gray-800">
						Impact Milestones
					</h3>
					<span className="text-sm text-gray-500">
						{achievedCount}/{milestones.length} achieved
					</span>
				</div>

				{/* Progress bar */}
				<div className="mb-4">
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div
							className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full transition-all duration-500"
							style={{ width: `${progressPercentage}%` }}
						></div>
					</div>
				</div>

				<ul className="space-y-3">
					{milestones.map((milestone) => {
						const isAchieved = isMilestoneAchieved(milestone);
						return (
							<li
								key={milestone.id}
								className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
									isAchieved
										? "bg-green-50 border border-green-200"
										: "bg-gray-50 border border-gray-200"
								}`}
							>
								<div
									className={`flex-shrink-0 ${
										isAchieved
											? "text-green-500"
											: "text-gray-400"
									}`}
								>
									{milestone.icon}
								</div>
								<div className="flex-1">
									<div
										className={`font-medium text-sm ${
											isAchieved
												? "text-green-800"
												: "text-gray-600"
										}`}
									>
										{milestone.title}
									</div>
									<div
										className={`text-xs ${
											isAchieved
												? "text-green-600"
												: "text-gray-500"
										}`}
									>
										{milestone.description}
									</div>
								</div>
								{isAchieved && (
									<CheckCircle className="text-green-500 w-4 h-4 flex-shrink-0" />
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
