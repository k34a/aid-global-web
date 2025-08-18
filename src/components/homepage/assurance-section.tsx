"use client";
import { ShieldCheck, Receipt, Lock, Eye } from "lucide-react";
import { motion } from "motion/react";

const assurances = [
	{
		icon: ShieldCheck,
		title: "Empowered by You",
		text: "Your support fuels every initiative we undertake.",
		color: "from-blue-100 to-blue-300",
	},
	{
		icon: Receipt,
		title: "80G Certified",
		text: "Donations are tax-exempt under Section 80G.",
		color: "from-blue-300 to-blue-100",
	},
	{
		icon: Lock,
		title: "Secure Giving",
		text: "We ensure bank-grade security for every transaction.",
		color: "from-blue-100 to-blue-300",
	},
	{
		icon: Eye,
		title: "Transparent Impact",
		text: "You receive photo updates on how your donation helped.",
		color: "from-blue-300 to-blue-100",
	},
];

const AssuranceSection = () => {
	return (
		<>
			<section className="w-full py-16 px-5 sm:px-0">
				<h2 className="text-center w-fit text-3xl sm:text-4xl font-bold text-black mb-16 relative border-b-4 border-b-blue-300 pb-3 mx-auto">
					<span className="inline-block relative">
						Your <span className="text-blue-500">Assurance</span>,
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
									<Icon className="w-8 h-8 text-blue-500" />
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
