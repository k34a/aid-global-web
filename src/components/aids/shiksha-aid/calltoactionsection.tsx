import {
	HandCoins,
	Bike,
	Users,
	Handshake,
	Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";

const involvements = [
	{
		icon: HandCoins,
		label: "Donate to ShikshaAid",
	},
	{
		icon: Bike,
		label: "Gift a Bicycle",
	},
	{
		icon: Users,
		label: "Volunteer as Mentor",
	},
	{
		icon: Handshake,
		label: "Partner with Us",
	},
];
export default function CalltoActionSection() {
	return (
		<section className="py-6 bg-[#e6faff] rounded-3xl">
			<div className="max-w-6xl mx-auto px-6 text-center">
				<h2 className="text-3xl font-bold mb-10 flex items-center justify-center gap-3 text-[#004466]">
					<LinkIcon className="w-6 h-6 text-orange-500" />
					Get Involved
				</h2>
				<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
					{involvements.map((item, index) => {
						const Icon = item.icon;
						return (
							<div
								key={index}
								className="bg-white rounded-xl p-2 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-[#004466] border border-[#007799]/10"
							>
								<Icon className="w-6 h-6 mb-2 text-[#007799]" />
								<span className="font-semibold text-base">
									{item.label}
								</span>
							</div>
						);
					})}
				</div>
				<Link
					href="/donate?program=shiksha-aid"
					className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
				>
					Donate Now
				</Link>
			</div>
		</section>
	);
}
