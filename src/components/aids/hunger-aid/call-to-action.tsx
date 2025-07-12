import { Gift, Heart, HandHeart } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
	return (
		<section className="bg-gradient-to-br from-orange-300 via-rose-300 to-yellow-200 py-10 px-3 sm:py-14 sm:px-6 lg:py-16 lg:px-8">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
				{/* LEFT COLUMN */}
				<div className="flex flex-col gap-4 text-center md:text-left">
					<div className="flex items-center justify-center md:justify-start gap-2">
						<Gift className="w-7 h-7 sm:w-8 sm:h-8 text-rose-800" />
						<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-rose-900">
							Special Giving
						</h2>
					</div>
					<p className="text-gray-600 text-base sm:text-lg drop-shadow-lg font-medium">
						Dedicate a donation in memory of someone you love, or to
						mark birthdays, anniversaries, or festivals — and turn
						your celebration into someone&apos;s nourishment.
					</p>
				</div>

				{/* RIGHT COLUMN */}
				<div className="flex flex-col gap-4 p-2 sm:p-4 text-center md:text-left">
					<div className="flex items-start justify-center md:justify-start gap-2">
						<Heart
							fill="rose-800"
							strokeWidth={0}
							className="w-6 h-6 sm:w-8 sm:h-8 text-rose-800 mt-1"
						/>
						<p className="text-lg sm:text-xl text-gray-600 drop-shadow-lg font-semibold italic">
							&quot;You may not feed the whole nation — but to the
							one person you help today, you are everything.&quot;
						</p>
					</div>
					<p className="text-base sm:text-lg text-gray-600 drop-shadow-lg font-semibold mt-2 px-2 sm:px-8 md:px-14">
						Join{" "}
						<span className="text-rose-800 font-bold">
							HungerAid
						</span>
						. Feed with compassion. Heal with love.
					</p>
				</div>
			</div>

			<div className="flex items-center justify-center mt-8 sm:mt-10">
				<Link
					href="/donate?program=hunger-aid"
					aria-label="Donate to HungerAid"
					className="flex items-center gap-2 px-6 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300
          bg-gradient-to-r from-rose-600 to-rose-800 text-white shadow-lg
          group hover:scale-105 hover:shadow-xl relative overflow-hidden"
				>
					<span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>

					<span className="relative z-10 group-hover:text-rose-600">
						Donate Now
					</span>

					<HandHeart className="w-5 h-6 text-white font-bold relative z-10 transition duration-300 group-hover:text-rose-600 group-hover:scale-110 animate-pulse" />
				</Link>
			</div>
		</section>
	);
}
