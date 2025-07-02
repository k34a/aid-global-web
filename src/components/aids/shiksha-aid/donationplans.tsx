import { Search, School, Brush, Sparkles, HeartHandshake } from "lucide-react";
import DonateModalButton from "./donate-button";
const points = [
	{
		icon: Search,
		text: "Identify and enroll migrant, street, and dropout children",
	},
	{
		icon: Brush,
		text: "Teach through joyful methods like dance, drawing, and storytelling",
	},
	{
		icon: Sparkles,
		text: "Emphasize values, hygiene, confidence, and discipline",
	},
	{
		icon: HeartHandshake,
		text: "Host health camps, motivational sessions, and exposure tours",
	},
	{
		icon: School,
		text: "Facilitate re-entry into government or private school",
	},
];

const donations = [
	{
		title: "Educational Supplies",
		desc: "For 5 children to get notebooks, stationery, and more.",
		amount: "₹9,225",
	},
	{
		title: "Nutritious Meals",
		desc: "Feed 50 children 3x a week with healthy food.",
		amount: "₹12,000",
	},
	{
		title: "Health & Educational Tour",
		desc: "Organize a camp and real-world exposure.",
		amount: "₹33,000",
	},
	{
		title: "Teacher Honorarium",
		desc: "Support one month of dedicated teaching.",
		amount: "₹10,000",
	},
	{
		title: "Set Up a Shiksha Club",
		desc: "Launch a full local learning hub.",
		amount: "₹50,000",
	},
];
export default function Donationsection() {
	return (
		<section className="bg-[#eaf5ff]/20 px-4 py-6">
			<div className=" rounded-2xl  p-6">
				{/* Heading */}
				<h3 className="text-2xl font-bold text-[#003366] flex items-center mb-4">
					<span className="text-3xl mr-2">💡</span> Why ShikshaAid
					Centre?
				</h3>
				<p className="text-[#003366] font-bold mb-6">
					The ShikshaAid Centre is our innovative grassroots model for
					informal yet impactful education. It acts as a safe space
					for learning, healing, and growth for children who lack
					access to traditional classrooms.
				</p>
				<div className="flex flex-col lg:flex-row gap-2">
					<div className="flex-1 mt-10 ml-4">
						<div className="space-y-4">
							{points.map((item, index) => {
								const Icon = item.icon;
								return (
									<div
										key={index}
										className="flex items-start gap-3"
									>
										<Icon className="mt-1 text-orange-400" />

										<span className="text-[#003366]">
											{item.text}
										</span>
									</div>
								);
							})}
						</div>
					</div>

					<div className="flex-1 border border-orange-300 rounded-2xl shadow-md p-2 bg-white">
						<h3 className="text-2xl font-bold text-orange-600 flex items-center mb-2">
							<span className="text-3xl mr-2">🎯</span> Donation
							Plans – ShikshaAid Centre
						</h3>
						<table className="w-full text-[#003366] text-sm md:text-base">
							<thead className="border-b border-[#004466]">
								<tr>
									<th className="py-1 text-left font-semibold">
										Support For
									</th>
									<th className="py-1 text-right font-semibold">
										Amount (INR)
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-b">
									<td className="py-1">
										Educational supplies for 5 children
									</td>
									<td className="py-1 text-right font-medium">
										₹9,225
									</td>
								</tr>
								<tr className="border-b">
									<td className="py-1">
										Nutritious meals for 50 children (3x a
										week)
									</td>
									<td className="py-1 text-right font-medium">
										₹12,000
									</td>
								</tr>
								<tr className="border-b">
									<td className="py-1">
										Health camp & educational tour
									</td>
									<td className="py-1 text-right font-medium">
										₹33,000
									</td>
								</tr>
								<tr className="border-b">
									<td className="py-1">
										Teacher{"'"}s honorarium (monthly)
									</td>
									<td className="py-2 text-right font-medium">
										₹10,000
									</td>
								</tr>
								<tr>
									<td className="py-1">
										Set up a new Shiksha Club
									</td>
									<td className="py-1 text-right font-medium">
										₹50,000
									</td>
								</tr>
							</tbody>
						</table>
						<p className="mt-4 italic text-sm text-[#444]">
							Every rupee you contribute turns the street into a
							stepping stone for a better life.
						</p>
						<div className="mt-2 flex items-center justify-center">
							<DonateModalButton />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
