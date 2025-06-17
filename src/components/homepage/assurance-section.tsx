"use client";
import { ShieldCheck, Receipt, Lock, Eye } from "lucide-react";

const assurances = [
	{
		icon: (
			<ShieldCheck className="mx-auto h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
		),
		text: "All Our Efforts Are Made Possible Only Because Of Your Efforts.",
	},
	{
		icon: (
			<Receipt className="mx-auto h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
		),
		text: "All Donations Are Tax Deductible Under Section 80G Of Income Tax Act.",
	},
	{
		icon: <Lock className="mx-auto h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
		text: "Your Donation Transactions Are Completely Safe and Secure.",
	},
	{
		icon: <Eye className="mx-auto h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
		text: "100% transparency with photo proof and sponsor recognition.",
	},
];

const AssuranceSection = () => (
	<section className="bg-[#eceaea] py-6 sm:py-8 md:py-10 w-full">
		<div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
			<h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 md:mb-10 mt-6 sm:mt-8 md:mt-10">
				We <span className="text-blue-500">assure</span> you that
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-15 text-center mx-2 sm:mx-4 md:mx-8 lg:mx-15">
				{assurances.map((item, idx) => (
					<div
						key={idx}
						className="flex flex-col items-center p-3 sm:p-4"
					>
						{item.icon}
						<p className="mt-3 sm:mt-4 text-gray-800 text-sm sm:text-base font-sm leading-relaxed">
							{item.text}
						</p>
					</div>
				))}
			</div>
		</div>
	</section>
);

export default AssuranceSection;
