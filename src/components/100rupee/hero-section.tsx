"use client";

import { Heart, Users, TrendingUp, Star } from "lucide-react";

export default function HeroSection() {
	const scrollToSubscriptionForm = () => {
		const subscriptionForm = document.getElementById("subscription-form");
		if (subscriptionForm) {
			subscriptionForm.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#f0f9ff] text-gray-800">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-10 left-10 w-20 h-20 bg-[#1e40af] rounded-full"></div>
				<div className="absolute top-32 right-20 w-16 h-16 bg-[#3b82f6] rounded-full"></div>
				<div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[#60a5fa] rounded-full"></div>
				<div className="absolute bottom-32 right-1/3 w-24 h-24 bg-[#1e3a8a] rounded-full"></div>
			</div>

			<div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
				<div className="text-center space-y-8">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-[#1e40af]/30 shadow-lg">
						<Star className="w-5 h-5 text-[#3b82f6]" />
						<span className="text-sm font-semibold text-[#1e40af]">
							The Rs. 100 Club
						</span>
					</div>

					{/* Main Heading */}
					<div className="space-y-4">
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
							<span className="block text-[#1A1A1D]">
								Big Hearts.
							</span>
							<span className="block text-[#1e40af]">
								Bigger Impact.
							</span>
						</h1>
						<p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
							Join a movement of everyday heroes who believe in{" "}
							<span className="font-semibold text-[#10408d]">
								the power of collective action
							</span>
						</p>
					</div>

					{/* Value Proposition */}
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border border-[#1e40af]/20 shadow-lg">
						<p className="text-lg sm:text-xl font-medium mb-4 text-gray-800">
							For just{" "}
							<span className="text-2xl font-bold text-[#1e40af]">
								100/month
							</span>
						</p>
						<p className="text-gray-600 text-sm sm:text-base">
							- less than 3.5 a day - you become a force for
							sustainable change in someone&apos;s life.
						</p>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#1e40af]/20 shadow-lg">
							<Heart className="w-8 h-8 text-[#ef4444] mx-auto mb-3" />
							<div className="text-2xl font-bold text-[#1A1A1D]">
								1000+
							</div>
							<div className="text-sm text-gray-600">Members</div>
						</div>
						<div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#1e40af]/20 shadow-lg">
							<Users className="w-8 h-8 text-[#3b82f6] mx-auto mb-3" />
							<div className="text-2xl font-bold text-[#1A1A1D]">
								50,000+
							</div>
							<div className="text-sm text-gray-600">
								Lives Impacted
							</div>
						</div>
						<div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#1e40af]/20 shadow-lg">
							<TrendingUp className="w-8 h-8 text-[#60a5fa] mx-auto mb-3" />
							<div className="text-2xl font-bold text-[#1A1A1D]">
								10L+
							</div>
							<div className="text-sm text-gray-600">
								Monthly Impact
							</div>
						</div>
					</div>

					{/* CTA */}
					<div className="pt-8">
						<p className="text-lg font-semibold text-[#1e40af] mb-4">
							Small monthly giving. Massive monthly impact.
						</p>
						<button
							onClick={scrollToSubscriptionForm}
							className="bg-[#1e40af] hover:bg-[#3b82f6] text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
						>
							Join The 100 Club Today
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
