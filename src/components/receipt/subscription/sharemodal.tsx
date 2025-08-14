"use client";

import { useEffect, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import Whatsapp from "@/components/icons/whatsapp";
export default function ShareModal() {
	const [showModal, setShowModal] = useState(false);
	const [shareUrl, setShareUrl] = useState("");

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get("share")) {
			const fullUrl = window.location.href.split("?")[0];
			setShareUrl(fullUrl);
			setShowModal(true);
		}
	}, []);

	const copyLink = () => {
		navigator.clipboard.writeText(shareUrl);
		alert("Link copied!");
	};

	if (!showModal) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full relative">
				{/* Close Icon */}
				<button
					onClick={() => setShowModal(false)}
					className="absolute top-4 right-4 text-red-500 hover:text-gray-700"
				>
					<X size={22} />
				</button>

				{/* Headings */}
				<h2 className="text-3xl font-extrabold text-yellow-500 text-center">
					Thanks!
				</h2>
				<p className="text-lg font-semibold text-sky-500 text-center mb-4">
					Your donation is making a difference!
				</p>

				{/* Description */}
				<p className="text-center text-gray-700 mb-2">
					Tell your friends about the <strong>Donation</strong> and
					help us reach our target of 1 million donors.
				</p>
				<p className="text-center text-gray-700 mb-6">
					Use your unique link to invite friends and multiply your
					impact.
				</p>

				{/* Input & Copy */}
				<div className="flex gap-2 mb-5">
					<input
						value={shareUrl}
						readOnly
						className="border border-gray-300 rounded-lg px-3 py-2 flex-grow text-gray-700 bg-gray-100"
					/>
					<button
						onClick={copyLink}
						className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg"
					>
						Copy
					</button>
				</div>

				{/* WhatsApp Button */}
				<a
					href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
				>
					<Whatsapp />
					Share on WhatsApp
				</a>
			</div>
		</div>
	);
}
