"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Link2, Check } from "lucide-react";
import Facebook from "@/components/icons/facebook";
import Twitter from "@/components/icons/twitter";
import Whatsapp from "@/components/icons/whatsapp";
import { copyToClipboard } from "@/lib/client-utils/copytoclipboard";

export default function ShareCampaignDropdown() {
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const url = typeof window !== "undefined" ? window.location.href : "";

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleCopyLink = () => {
		copyToClipboard(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleShareFacebook = () => {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
			"_blank",
		);
	};

	const handleShareWhatsApp = () => {
		window.open(
			`https://wa.me/?text=${encodeURIComponent(`Check out this campaign: ${url}`)}`,
			"_blank",
		);
	};

	const handleShareTwitter = () => {
		window.open(
			`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Support this amazing campaign!")}`,
			"_blank",
		);
	};

	return (
		<div className="w-full max-w-md" ref={dropdownRef}>
			<button
				onClick={() => setOpen(!open)}
				className="w-full border border-teal-600 text-teal-600 py-2 px-4 rounded-lg hover:bg-teal-50 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
			>
				<Share2 size={16} />
				Share Campaign
			</button>

			{open && (
				<div className="mt-3 w-full bg-white border border-gray-200 rounded-xl shadow p-4">
					<div className="grid grid-cols-2 gap-3">
						<button
							onClick={handleShareFacebook}
							className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
						>
							<Facebook className="w-4 h-4" />
							Facebook
						</button>

						<button
							onClick={handleShareWhatsApp}
							className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
						>
							<Whatsapp className="w-4 h-4" />
							WhatsApp
						</button>

						<button
							onClick={handleShareTwitter}
							className="flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
						>
							<Twitter className="w-4 h-4" />
							Twitter
						</button>

						<button
							onClick={handleCopyLink}
							className="flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
						>
							{copied ? (
								<>
									<Check className="w-4 h-4 text-green-300" />
									Link Copied!
								</>
							) : (
								<>
									<Link2 className="w-4 h-4" />
									Copy Link
								</>
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
