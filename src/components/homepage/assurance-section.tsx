"use client";
import { ShieldCheck, Receipt, Lock, Eye } from "lucide-react";
import { motion } from "framer-motion";

const assurances = [
	{
		icon: ShieldCheck,
		title: "Empowered by You",
		text: "Your support fuels every initiative we undertake.",
		color: "from-blue-100 to-sky-100",
	},
	{
		icon: Receipt,
		title: "80G Certified",
		text: "Donations are tax-exempt under Section 80G.",
		color: "from-sky-100 to-cyan-100",
	},
	{
		icon: Lock,
		title: "Secure Giving",
		text: "We ensure bank-grade security for every transaction.",
		color: "from-cyan-100 to-indigo-100",
	},
	{
		icon: Eye,
		title: "Transparent Impact",
		text: "You receive photo updates on how your donation helped.",
		color: "from-indigo-100 to-blue-100",
	},
];

const AssuranceSection = () => {
	return (
		<section className="py-16 bg-white relative overflow-hidden">
			{/* Background decorative gradient */}
			<div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10 animate-pulse"></div>
			<div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-200 rounded-full blur-2xl opacity-30 -z-10 animate-pulse"></div>

			<div className="max-w-6xl mx-auto px-4">
				<h2 className="text-center text-3xl sm:text-4xl font-bold text-black mb-16 relative">
					<span className="inline-block relative">
						Your <span className="text-blue-500">Assurance</span>
						, Our Priority
						<span className="absolute left-1/2 -bottom-1 w-24 h-1 bg-blue-500 rounded-full -translate-x-1/2" />
					</span>
				</h2>

				<div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-10">
					{assurances.map((item, idx) => {
						const Icon = item.icon;
						return (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: idx * 0.2 }}
								viewport={{ once: true }}
								className={`group p-6 border border-white/30 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 text-center bg-white/20 backdrop-blur-lg bg-gradient-to-br ${item.color}`}
							>
								<div className="w-14 h-14 mx-auto mb-4 bg-white border-2 border-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
									<Icon className="w-6 h-6 text-black group-hover:text-blue-600 transition duration-300" />
								</div>
								<h3 className="text-lg font-bold text-black mb-2">
									{item.title}
								</h3>
								<p className="text-sm font-semibold text-gray-800 leading-snug">
									{item.text}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default AssuranceSection;
