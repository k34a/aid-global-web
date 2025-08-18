"use client";

import {
	Heart,
	Users,
	Target,
	Shield,
	Clock,
	Check,
	ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { STATIC_IMAGE_HOST } from "@/config/config";
import Image from "@/components/image";

interface ClubShowcaseProps {
	frequency: "monthly" | "daily";
}

export default function ClubShowcase({ frequency }: ClubShowcaseProps) {
	const router = useRouter();
	const isMonthly = frequency === "monthly";
	const amount = isMonthly ? 100 : 1;
	const period = isMonthly ? "month" : "day";
	const costPerDay = isMonthly ? "\u20B9 3.33/day" : "\u20B9 1/day";

	return (
		<div className="bg-white py-2">
			{/* Header */}
			<div className="flex flex-col items-center gap-4 mb-8">
				<div className="flex items-center gap-2">
					<Heart size={20} color="#ef4444" />
					<p className="text-sm font-medium text-gray-500">
						Join The Movement
					</p>
				</div>

				<h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 my-2 sm:my-4">
					The{" "}
					<span className="text-blue-600">
						{"\u20B9"}
						{amount}
					</span>{" "}
					Club
				</h1>

				<p className="text-lg text-center text-gray-500 max-w-xl">
					Big hearts, bigger impact. Join thousands of everyday heroes
					who donate just
					<span className="font-semibold text-blue-600">
						{" "}
						{"\u20B9"}
						{amount} per {period}
					</span>{" "}
					to create sustainable change.
				</p>
			</div>

			{/* Why Join Section */}
			<div className="flex flex-col gap-8 mb-8">
				<h2 className="text-3xl text-center text-gray-900 font-bold">
					Why Join The {"\u20B9"}
					{amount} Club?
				</h2>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					{/* Image Section */}
					<div className="relative">
						<div className="bg-slate-100 rounded-lg overflow-hidden">
							<Image
								src={`${STATIC_IMAGE_HOST}home-page/aids/shiksha.webp`}
								alt="Children studying together"
								width={1200}
								height={256}
								className="w-full h-64 object-cover"
							/>
						</div>

						{/* Amount Badge */}
						<div className="absolute bottom-[-10px] right-[-10px] bg-white p-4 rounded-lg shadow-lg">
							<div className="flex flex-col items-center gap-1 ">
								<p className="text-xl font-bold text-blue-600">
									{"\u20B9"}
									{amount}
								</p>
								<p className="text-xs text-gray-500">
									per {period}
								</p>
							</div>
						</div>
					</div>

					{/* Content Section */}
					<div className="flex flex-col gap-4 text-center sm:text-left">
						<p className="text-gray-500">
							For less than the cost of{" "}
							{isMonthly ? "a daily coffee" : "a small snack"},
							you can become part of a movement that transforms
							lives. Your {"\u20B9"}
							{amount} {period} contribution creates ripples of
							positive change across communities.
						</p>

						{/* Three Pillars */}
						<div className="flex gap-7 sm:justify-around justify-center">
							<div className="flex flex-col items-center text-center  gap-3">
								<div className="w-12 h-12  bg-blue-100 rounded-full flex items-center justify-center mx-auto">
									<Heart size={24} color="#2563eb" />
								</div>
								<p className="font-semibold text-sm">
									Small Amount
								</p>
								<p className="text-xs text-gray-500">
									Just {costPerDay}
								</p>
							</div>

							<div className="flex flex-col items-center text-center  gap-3">
								<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
									<Target size={24} color="#16a34a" />
								</div>
								<p className="font-semibold text-sm">
									Big Impact
								</p>
								<p className="text-xs text-gray-500">
									{isMonthly
										? "10,000+ lives changed"
										: "1,000+ meals provided"}
								</p>
							</div>

							<div className="flex flex-col items-center text-center gap-3">
								<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
									<Users size={24} color="#9333ea" />
								</div>
								<p className="font-semibold text-sm">
									Community
								</p>
								<p className="text-xs text-gray-500">
									{isMonthly
										? "1,000+ members"
										: "500+ daily heroes"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Statistics */}
			<div className="flex items-center gap-8 mb-8 justify-center">
				<div className="w-52 bg-green-50 border border-green-200 text-center p-8 rounded-lg">
					<p className="text-2xl font-bold text-green-600">
						{isMonthly ? "5,000+" : "2,000+"}
					</p>
					<p className="text-sm text-gray-500">Active Members</p>
				</div>
			</div>

			{/* CTA Section */}
			<div className="flex flex-col items-center gap-8">
				<button
					onClick={() => router.push(`${amount}rupee`)}
					className="bg-orange-500 text-white text-lg font-semibold rounded-xl px-8 py-4 flex items-center gap-2 hover:bg-orange-600"
				>
					Join with {"\u20B9"}
					{amount}/{amount === 100 ? "month" : "day"}
					<ArrowRight size={20} />
				</button>

				<div className="flex flex-wrap justify-center gap-8">
					<div className="flex items-center gap-2">
						<Shield size={16} color="#16a34a" />
						<p className="text-sm text-gray-500">
							Tax benefits under 80G
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Clock size={16} color="#2563eb" />
						<p className="text-sm text-gray-500">Cancel anytime</p>
					</div>
					<div className="flex items-center gap-2">
						<Check size={16} color="#9333ea" />
						<p className="text-sm text-gray-500">
							Secure donations
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
