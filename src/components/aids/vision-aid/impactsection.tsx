import { Eye, Glasses, Hospital, Megaphone } from "lucide-react";
const impactData = [
	{
		icon: Eye,
		title: "Thousands",
		description: "of individuals served with vision care",
		color: "#6a1e55",
	},
	{
		icon: Glasses,
		title: "Hundreds",
		description: "of spectacles distributed every month",
		color: "#5d3dc4",
	},
	{
		icon: Hospital,
		title: "Dozens",
		description: "of cataract surgeries completed each quarter",
		color: "#6a1e55",
	},
	{
		icon: Megaphone,
		title: "Widespread",
		description: "awareness drives across schools & communities",
		color: "#5d3dc4",
	},
];
export default function ImpactSection() {
	return (
		<section className="bg-gradient-to-b from-[#f8f2fc] to-[#fbeffc] py-10 sm:py-20 px-6 md:px-24">
			<div className="text-center mb-4 sm:mb-16 relative">
				<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2f194d] mb-3 inline-block relative">
					Impact Across <span className="text-[#5d3dc4]">India</span>
					<span className="block h-1 w-40 bg-[#5d3dc4] mx-auto mt-2 rounded-bl-2xl rounded-tr-xl"></span>
				</h2>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{impactData.map(
					({ icon: Icon, title, description, color }, index) => (
						<div
							key={index}
							className="bg-white shadow-md border border-[#e4d3fb] rounded-xl p-6 text-center hover:shadow-xl transition"
						>
							<Icon
								className={`w-10 h-10 mx-auto mb-4`}
								style={{ color }}
							/>
							<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2f194d]">
								{title}
							</h3>
							<p className="text-sm text-gray-700 mt-1">
								{description}
							</p>
						</div>
					),
				)}
			</div>
		</section>
	);
}
