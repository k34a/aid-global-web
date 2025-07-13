import { LucideIcon } from "lucide-react";

interface InfoCardProps {
	icon: LucideIcon;
	title: string;
}

export default function InfoCard({ icon: Icon, title }: InfoCardProps) {
	return (
		<div className="flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 shadow-lg transition-transform hover:scale-105 border-b-4 border-b-[#003944]">
			<Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#8b3a2b]" />
			<h3 className="mt-3 sm:mt-4 text-center text-gray-800 font-semibold text-xs sm:text-sm md:text-base">
				{title}
			</h3>
			<div className="w-5 sm:w-6 h-1 bg-white mt-1 sm:mt-2" />
		</div>
	);
}
