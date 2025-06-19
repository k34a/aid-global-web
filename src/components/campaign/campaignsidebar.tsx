"use client";

import { Users, CalendarDays, Link2, CheckCircle } from "lucide-react";

import Facebook from "@/components/icons/facebook";
import Twitter from "@/components/icons/twitter";
import Whatsapp from "@/components/icons/whatsapp";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { copyToClipboard } from "@/lib/utils/copytoclipboard";

interface CampaignSidebarProps {
	backers: number;
}

export default function CampaignSidebar({ backers }: CampaignSidebarProps) {
	const [url, setUrl] = useState("");

	useEffect(() => {
		setUrl(window.location.href);
	}, []);

	const handleCopyLink = async () => {
		const success = await copyToClipboard(url);
		if (success) {
			toast.success("Campaign link copied to clipboard!");
		} else {
			toast.error("Failed to copy link.");
		}
	};

	return (
		<div className="space-y-6">
			<div className="bg-white rounded-xl shadow-lg p-6">
				<h3 className="text-lg font-bold text-gray-800 mb-4">
					Campaign Stats
				</h3>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Users className="text-teal-600 h-5 w-5" />
							<span className="text-gray-700">Backers</span>
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
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-lg p-6">
				<h3 className="text-lg font-bold text-gray-800 mb-4">
					Spread The Word
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
						className="bg-gray-500 text-white p-3 rounded-full hover:scale-105 transition"
					>
						<Link2 className="w-4 h-4" />
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
				<h3 className="text-lg font-bold text-gray-800 mb-4">
					Campaign Milestones
				</h3>
				<ul className="space-y-3 text-sm text-gray-700">
					<li className="flex items-center gap-2">
						<CheckCircle className="text-green-500 w-4 h-4" />
						Launched successfully
					</li>
					<li className="flex items-center gap-2">
						<CheckCircle className="text-green-500 w-4 h-4" />
						50+ backers contributed
					</li>
					<li className="flex items-center gap-2">
						<CheckCircle className="text-gray-400 w-4 h-4" />
						₹10,000 goal in sight
					</li>
				</ul>
			</div>
		</div>
	);
}
