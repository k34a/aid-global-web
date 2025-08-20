"use client";
import { ShieldCheck, Receipt, Lock, Eye } from "lucide-react";
import { motion } from "motion/react";

const assurances = [
	{
		icon: ShieldCheck,
		title: "Empowered by You",
		text: "All Our Efforts Are Made Possible Only Because Of Your Efforts.",
		color: "from-sky-100 to-sky-300",
	},
	{
		icon: Receipt,
		title: "80G Certified",
		text: "All Donations Are Tax Deductible Under Section 80G Of Income Tax Act",
		color: "from-sky-300 to-sky-100",
	},
	{
		icon: Lock,
		title: "Secure Giving",
		text: "Your Donation Transactions Are Completely Safe and Secure",
		color: "from-sky-100 to-sky-300",
	},
	{
		icon: Eye,
		title: "Transparent Impact",
		text: "100% transparency with photo proof and sponsor recognition",
		color: "from-sky-300 to-sky-100",
	},
];

const AssuranceSection = () => {
	return (
		<>
			<section className="w-full py-16 px-5 sm:px-0">
				<h2 className="text-center w-fit text-3xl sm:text-4xl font-bold text-black mb-16 relative border-b-4 border-b-sky-300 pb-3 mx-auto">
					<span className="inline-block relative">
						Your <span className="text-sky-500">Assurance</span>,
						Our Priority
					</span>
				</h2>

				<div className="flex w-full flex-wrap justify-center gap-6">
					{assurances.map((item, index) => {
						const Icon = item.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: index * 0.2,
								}}
								viewport={{ once: true }}
								className={`flex flex-col items-center text-center rounded-2xl shadow-lg bg-gradient-to-br ${item.color} p-6 w-72`}
							>
								<div className="p-2 rounded-full bg-white shadow-md mb-4 border-2">
									<Icon className="w-8 h-8 text-sky-500" />
								</div>
								<h3 className="text-lg font-semibold text-gray-800 mb-2">
									{item.title}
								</h3>
								<p className="text-gray-600 text-sm">
									{item.text}
								</p>
							</motion.div>
						);
					})}
				</div>
			</section>
		</>
	);
};

export default AssuranceSection;
