"use client";
import { ShieldCheck, Receipt, Lock, Eye } from "lucide-react";

const assurances = [
	{
		icon: <ShieldCheck className="mx-auto h-10 w-10 text-blue-400" />,

		text: "All Our Efforts Are Made Possible Only Because Of Your Efforts.",
	},
	{
		icon: <Receipt className="mx-auto h-10 w-10 text-blue-400" />,

		text: "All Donations Are Tax Deductible Under Section 80G Of Income Tax Act.",
	},
	{
		icon: <Lock className="mx-auto h-10 w-10 text-blue-400" />,
		text: "Your Donation Transactions Are Completely Safe and Secure.",
	},
	{
		icon: <Eye className="mx-auto h-10 w-10 text-blue-400" />,
		text: "100% transparency with photo proof and sponsor recognition.",
	},
];

const AssuranceSection = () => (
	<section className="bg-white pb-10 w-full">
		<div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 shadow-xl">
			<h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-10 mt-2 text-gray-900">
				Your Assurance, Our Priority
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
				{assurances.map((item, idx) => (
					<div
						key={idx}
						className={`bg-white rounded-xl shadow-md flex flex-col items-center p-6 border-b-4 text-blue-400 transition hover:shadow-lg`}
					>
						{item.icon}
						<p className="mt-4 text-gray-800 text-base font-semibold leading-snug">
							{item.text}
						</p>
					</div>
				))}
			</div>
		</div>
	</section>
);

export default AssuranceSection;
