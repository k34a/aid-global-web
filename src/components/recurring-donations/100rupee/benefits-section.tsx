import {
	Award,
	Eye,
	Users,
	Calendar,
	Badge,
	Target,
	BadgeCheck,
	IndianRupee,
} from "lucide-react";
import { STATIC_IMAGE_HOST } from "@/config/config";
import Image from "@/components/image";

const memberBenefits = [
	{
		icon: Award,
		title: "Quarterly Impact Reports",
		description:
			"Real stories and photos showing how your contribution is making a difference.",
		color: "text-sky-600",
	},
	{
		icon: Eye,
		title: "Behind-the-Scenes Updates",
		description:
			"Exclusive access to on-ground efforts and program developments.",
		color: "text-green-600",
	},
	{
		icon: Calendar,
		title: "Live Sessions & Webinars",
		description:
			"Invitations to exclusive events, field visits, and interactive sessions.",
		color: "text-purple-600",
	},
	{
		icon: Badge,
		title: "Digital Badge",
		description:
			"A special badge to showcase your commitment to social impact.",
		color: "text-orange-600",
	},
	{
		icon: Target,
		title: "Priority Access",
		description:
			"First access to volunteering opportunities and fundraising campaigns.",
		color: "text-red-600",
	},
];

const whoCanJoin = [
	"College students with a heart for service",
	"Working professionals who care about giving back",
	"Homemakers nurturing change in society",
	"Senior citizens and retirees with wisdom and purpose",
	"Youth groups, NGOs, and corporates who want to make CSR personal",
];

export default function BenefitsSection() {
	return (
		<section className="py-8 bg-gray-50">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 inline-flex items-center justify-center gap-2">
						<BadgeCheck className="w-7 h-7 text-[#1e40af]" />
						Member Benefits
					</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						Because givers deserve recognition. Your support is
						visible. Your kindness is honored.
					</p>
				</div>
				{/* Benefits Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
					{memberBenefits.map((benefit, index) => (
						<div
							key={index}
							className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
						>
							<div className={`${benefit.color} mb-4`}>
								<benefit.icon className="w-8 h-8" />
							</div>
							<h3 className="font-bold text-lg text-gray-900 mb-2">
								{benefit.title}
							</h3>
							<p className="text-gray-600 text-sm leading-relaxed">
								{benefit.description}
							</p>
						</div>
					))}
				</div>

				{/* Who Can Join Section */}
				<div className="bg-gradient-to-br from-sky-50 via-white to-green-50 rounded-3xl p-10 shadow-lg border border-sky-100">
					<div className="text-center mb-12">
						<div className="inline-flex items-center px-6 py-3 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
							<Users className="w-5 h-5 mr-2" />
							Who Can Join the{" "}
							<IndianRupee className="w-3 h-3 text-sky-600" />
							100 Club?
						</div>
						<h3 className="text-3xl font-bold text-gray-900 mb-4">
							The 100 Club is for anyone who wants to be part of{" "}
							<span className="text-sky-600">real change</span>
						</h3>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							From students to seniors, professionals to parents -
							everyone has a place in our community of
							changemakers.
						</p>
					</div>

					{/* Community Image */}
					<div className="relative mb-12 rounded-2xl overflow-hidden shadow-lg">
						<Image
							src={`${STATIC_IMAGE_HOST}home-page/aids/shiksha.webp`}
							alt="Diverse community of people working together"
							width={800}
							height={400}
							className="w-full h-[300px] object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
						<div className="absolute bottom-6 left-6 right-6 text-white">
							<p className="text-xl font-semibold">
								Join our diverse community
							</p>
							<p className="text-sm opacity-90">
								Students, professionals, homemakers, seniors -
								join hands for impact
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
						<div className="space-y-6">
							{whoCanJoin.slice(0, 3).map((item, index) => (
								<div
									key={index}
									className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
								>
									<div className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-green-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
										<p className="text-gray-800 font-medium leading-relaxed">
											{item}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className="space-y-6">
							{whoCanJoin.slice(3).map((item, index) => (
								<div
									key={index}
									className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
								>
									<div className="flex items-start space-x-4">
										<div className="w-3 h-3 bg-gradient-to-r from-green-500 to-sky-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
										<p className="text-gray-800 font-medium leading-relaxed">
											{item}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="text-center">
						<div className="bg-gradient-to-r from-sky-100 to-green-100 rounded-2xl p-8 border border-sky-200 max-w-3xl mx-auto">
							<p className="text-xl font-bold text-gray-900 mb-3">
								If you can afford{" "}
								<span className="inline-flex items-baseline gap-1 align-baseline">
									<span className="inline-flex items-baseline gap-1">
										<IndianRupee className="w-4 h-4 text-gray-900 relative top-[1px]" />
										100
									</span>
								</span>{" "}
								a month - you can afford to be someone&apos;s
								blessing.
							</p>
						</div>
					</div>
				</div>

				{/* Share Movement Section */}
				<div className="mt-12 bg-gradient-to-r from-green-50 to-sky-50 rounded-2xl p-8 border border-green-200">
					<div className="text-center">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Share the Movement - Multiply the Impact
						</h3>
						<p className="text-gray-600 mb-6">
							Don&apos;t stop at giving. Be the voice of the
							movement. Invite your friends, family, team members,
							and colleagues to join the 100 Club.
						</p>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							<div className="bg-white rounded-lg p-4 shadow-sm">
								<p className="font-semibold text-gray-900">
									Post about it
								</p>
								<p className="text-sm text-gray-600">
									on social media
								</p>
							</div>
							<div className="bg-white rounded-lg p-4 shadow-sm">
								<p className="font-semibold text-gray-900">
									Add it to your
								</p>
								<p className="text-sm text-gray-600">
									WhatsApp status
								</p>
							</div>
							<div className="bg-white rounded-lg p-4 shadow-sm">
								<p className="font-semibold text-gray-900">
									Talk about it
								</p>
								<p className="text-sm text-gray-600">
									in your community
								</p>
							</div>
						</div>
						<p className="text-gray-600 mt-6 italic">
							&quot;One person giving is good. A thousand people
							giving is a revolution.&quot;
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
