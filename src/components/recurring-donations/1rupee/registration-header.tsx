import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { Target, Gift, Lightbulb, BarChart3 } from "lucide-react";

const features = [
	{
		icon: <Target className="w-8 h-8 text-white" />,
		title: "7-Day Warrior",
		description: "One week of kindness",
		bgColor: "bg-blue-500",
	},
	{
		icon: <Gift className="w-8 h-8 text-white" />,
		title: "30-Day Hero",
		description: "One month of consistency",
		bgColor: "bg-[#FFD700]",
	},
	{
		icon: <Lightbulb className="w-8 h-8 text-white" />,
		title: "100-Day Champion",
		description: "100 days of impact",
		bgColor: "bg-blue-500",
	},
	{
		icon: <BarChart3 className="w-8 h-8 text-white" />,
		title: "365-Day Legend",
		description: "A full year of giving with heart",
		bgColor: "bg-[#FFD700]",
	},
];

const RegistrationHeader = () => {
	return (
		<>
			{/* Header */}
			<div className="text-center mb-16">
				<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
					<span className="text-blue-500">Levels, Streaks </span>
					<span className="text-[#FFD700]">and</span>
					<span className="text-blue-500"> Badges</span>
				</h2>
				<h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#FFD700] mt-6">
					Make giving a habit and earn recognition for your
					compassion.
				</h3>
			</div>

			{/* Features + Image */}
			<div className="grid lg:grid-cols-3 gap-12 items-start">
				{/* Features */}
				<div className="lg:col-span-2">
					<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
						{features.map((feature, index) => (
							<div
								key={index}
								className="flex items-start space-x-4"
							>
								<div
									className={`${feature.bgColor} rounded-full p-3 flex-shrink-0`}
								>
									{feature.icon}
								</div>
								<div>
									<h3 className="text-blue-500 font-bold text-lg mb-1">
										{feature.title}
									</h3>
									<p className="text-gray-600 text-md">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
					<h3 className="text-xl md:text-2xl font-semibold text-[#FFD700] text-center mt-12">
						Every streak shows your unwavering commitment to change.
					</h3>
				</div>

				<div className="w-full flex justify-center">
					<Image
						src={`${STATIC_IMAGE_HOST}donation/rewards.webp`}
						alt="user rewards"
						width={500}
						height={500}
						priority
						className="rounded-xl object-contain w-full max-w-sm"
					/>
				</div>
			</div>
		</>
	);
};

export default RegistrationHeader;
