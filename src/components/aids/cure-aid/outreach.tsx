import {
	Stethoscope,
	Syringe,
	HeartPulse,
	Users,
	AlertCircle,
	Hospital,
} from "lucide-react";

const cardData = [
	{
		icon: <Stethoscope className="w-6 h-6 text-[#D97706]" />,
		title: "Mobile Medical Vans",
		desc: "Delivering essential medical services to outreach areas with trained professionals and stocked equipment.",
		color: "from-yellow-50 to-yellow-100",
		textColor: "text-yellow-500",
	},
	{
		icon: <Syringe className="w-6 h-6 text-[#0891B2]" />,
		title: "Health Camps & Drives",
		desc: "Organizing regular health check-ups and blood donation drives across urban and rural zones.",
		color: "from-sky-50 to-sky-100",
		textColor: "text-sky-500",
	},
	{
		icon: <HeartPulse className="w-6 h-6 text-[#BE185D]" />,
		title: "Free Medical Services",
		desc: "Offering consultations, screenings, vaccinations, and basic treatments at no cost.",
		color: "from-pink-50 to-pink-100",
		textColor: "text-pink-500",
	},
	{
		icon: <Users className="w-6 h-6 text-[#7C3AED]" />,
		title: "Special Outreach",
		desc: "Focused care for elderly, chronic illness, and maternal-child health in remote regions.",
		color: "from-purple-50 to-purple-100",
		textColor: "text-purple-500",
	},
	{
		icon: <AlertCircle className="w-6 h-6 text-[#F97316]" />,
		title: "Advanced Care Support",
		desc: "Integrated referral systems and follow-up support for patients needing advanced treatments.",
		color: "from-orange-50 to-orange-100",
		textColor: "text-orange-500",
	},
	{
		icon: <Hospital className="w-6 h-6 text-[#16A34A]" />,
		title: "Digital Health Tracking",
		desc: "Implementing real-time reporting systems for transparency and measurable impact.",
		color: "from-green-50 to-green-100",
		textColor: "text-green-500",
	},
];

export default function HealthcareOutreachSection() {
	return (
		<section className="w-full px-6 py-16">
			<h2 className="text-3xl font-bold text-center text-[#1A1A1D] mb-10">
				Primary Healthcare Outreach
			</h2>
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
				{cardData.map((card, idx) => (
					<div
						key={idx}
						className={`flex items-start gap-5 rounded-xl p-5 bg-gradient-to-br ${card.color} shadow-sm hover:shadow-md transition-all`}
					>
						<div className="shrink-0">
							<div className="w-12 h-12 mt-2 rotate-45 bg-white shadow-inner flex items-center justify-center">
								<div className="-rotate-45">{card.icon}</div>
							</div>
						</div>
						<div className="flex flex-col justify-center">
							<h3
								className={`text-lg font-semibold ${card.textColor}`}
							>
								{card.title}
							</h3>
							<p className="text-sm text-[#333] mt-1 leading-relaxed">
								{card.desc}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
