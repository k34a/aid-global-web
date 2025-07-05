"use client";
import {
	Glasses,
	Eye,
	HandCoins,
	HeartHandshake,
	Bus,
	Link,
} from "lucide-react";

const contributions = [
	{
		icon: Glasses,
		title: "Sponsor a Vision Kit",
		description: "₹250 provides one pair of glasses.",
	},
	{
		icon: Eye,
		title: "Support a Cataract Surgery",
		description: "₹8,000 restores vision for one person.",
	},
	{
		icon: HandCoins,
		title: "Fund a Full Eye Camp",
		description: "₹25,000 supports a full day of free eye care.",
	},
	{
		icon: Bus,
		title: "Contribute to Vision Van Fund",
		description: "Any amount helps bring care to remote areas.",
	},
	{
		icon: HeartHandshake,
		title: "Volunteer or Partner with Us",
		description: "Share your time, skills, or CSR initiative.",
	},
];

export default function JoinUsSection() {
	return (
		<section className="relative my-4 mx-4 md:mx-20 rounded-3xl overflow-hidden bg-[#fbf6ff] py-10 px-6 md:px-24 shadow-lg">
			<div className="absolute right-[-300px] top-1/2 -translate-y-1/2 z-0 pointer-events-none">
				<div className="w-[600px] h-[600px] rounded-full bg-[#f3eaff] opacity-60" />

				<div className="absolute top-[60px] left-[60px] w-[480px] h-[480px] rounded-full bg-[#e5d4ff] opacity-50" />
				<div className="absolute top-[120px] left-[120px] w-[360px] h-[360px] rounded-full bg-[#d8beff] opacity-40" />
				<div className="absolute top-[180px] left-[180px] w-[240px] h-[240px] rounded-full bg-[#caa6ff] opacity-30" />
			</div>
			<div className="relative z-10">
				<h2 className="text-4xl  font-bold text-[#2f194d] mb-2">
					Be the Light in Someone’s Darkness
				</h2>
				<p className="text-xl text-[#5d3dc4] mb-4 max-w-2xl">
					You can be a part of this life-changing journey:
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
					{contributions.map(
						({ icon: Icon, title, description }, i) => (
							<div
								key={i}
								className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-[#f0e6ff]"
							>
								<Icon className="w-6 h-6 text-[#6a1e55] mb-3" />
								<h3 className="text-[#1a1a1d] font-semibold mb-1">
									{title}
								</h3>
								<p className="text-sm text-gray-700">
									{description}
								</p>
							</div>
						),
					)}
				</div>
				<div className="mb-4">
					<h3 className="text-xl font-semibold text-[#2f194d] mb-2">
						Connect with VisionAid Today
					</h3>
					<p className="text-base font-medium text-[#6a1e55] leading-relaxed">
						Let’s bring light back into someone’s world.
						<br />
						Be their hope. Be their vision.
					</p>
				</div>
				<div className="flex flex-wrap gap-4">
					<button className="bg-[#5d3dc4] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#6a1e55] transition-all">
						Donate Now
					</button>
					<button className="bg-white border-2 border-[#5d3dc4] text-[#5d3dc4] px-6 py-3 rounded-xl font-medium hover:bg-[#f3eaff] transition-all">
						<Link className="inline-block mr-2" />
						Connect with us
					</button>
				</div>
			</div>
		</section>
	);
}
