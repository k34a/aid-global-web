import { Heart, Gift, Crown, IndianRupee } from "lucide-react";

export const formatTimeAgo = (date: Date | string): string => {
	const dateObj = typeof date === "string" ? new Date(date) : date;
	const now = new Date();
	const diffInHours = Math.floor(
		(now.getTime() - dateObj.getTime()) / (1000 * 60 * 60),
	);
	if (diffInHours < 1) return "Just now";
	if (diffInHours < 24) return `${diffInHours}h ago`;
	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7) return `${diffInDays}d ago`;
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	const day = String(dateObj.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};

export const getInitials = (name: string): string => {
	return name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
};

export const getDonorTier = (amount: number) => {
	const base = { amountBadgeIcon: IndianRupee };

	if (amount >= 10000)
		return {
			...base,
			tier: "platinum",
			icon: Crown,
			color: "bg-purple-500",
			badgeClass: "bg-purple-500 text-white",
		};
	if (amount >= 5000)
		return {
			...base,
			tier: "gold",
			icon: Gift,
			color: "bg-yellow-500",
			badgeClass: "bg-yellow-500 text-white",
		};
	if (amount >= 1000)
		return {
			...base,
			tier: "silver",
			icon: Heart,
			color: "bg-sky-500",
			badgeClass: "bg-sky-500 text-white",
		};

	return {
		...base,
		tier: "bronze",
		icon: Heart,
		color: "bg-teal-500",
		badgeClass: "bg-teal-100 text-teal-700",
	};
};
