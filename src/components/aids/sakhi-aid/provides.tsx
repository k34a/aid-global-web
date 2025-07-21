import Image from "next/image";
import { Droplet, Users, Hammer, HeartHandshake } from "lucide-react";
import { STATIC_IMAGE_HOST } from "@/config/config";

export default function SakhiAidProvides() {
	return (
		<section className="relative bg-gray-100 pb-0 pt-4 px-4 sm:px-6 lg:px-24 overflow-hidden">
			{/* Heading */}
			<h2 className="text-rose-900 text-center uppercase font-serif text-xl sm:text-2xl lg:text-2xl font-bold leading-tight relative z-10">
				How SakhiAid Uplifts Women and Girls
			</h2>

			{/* Horizontal Scrollable Content */}
			<div className="flex flex-row lg:justify-center gap-6 sm:gap-10 md:gap-20 overflow-x-auto scrollbar-thin scrollbar-thumb-rose-300 scrollbar-track-rose-100 items-stretch w-full px-1 sm:px-4 relative z-10">
				{/* Left Icons */}
				<div className="flex flex-col items-center justify-center gap-8 min-w-[120px] flex-shrink-0">
					<div className="flex flex-col items-center text-center max-w-[160px]">
						<Droplet className="w-10 h-10 text-rose-800 fill-current mb-2" />
						<p
							className="text-black font-bold drop-shadow leading-tight"
							style={{
								textShadow: "1px 1px 2px rgba(255,255,255,0.6)",
							}}
						>
							Menstrual Health &<br /> Hygiene Awareness
						</p>
					</div>
					<div className="flex flex-col items-center text-center max-w-[160px]">
						<Users className="w-10 h-10 text-sky-700 fill-current mb-2" />
						<p
							className="text-black font-bold drop-shadow leading-tight"
							style={{
								textShadow: "1px 1px 2px rgba(255,255,255,0.6)",
							}}
						>
							SHGs for Economic &<br /> Social Upliftment
						</p>
					</div>
				</div>

				{/* Center Image */}
				<div className="flex items-center justify-center min-w-[180px] sm:min-w-[220px] md:min-w-[250px] lg:min-w-[320px] flex-shrink-0">
					<Image
						src={`${STATIC_IMAGE_HOST}sakhi-aid/girl.webp`}
						alt="SakhiAid Girl"
						width={400}
						height={500}
						className="object-contain w-full h-auto"
						priority
					/>
				</div>

				{/* Right Icons */}
				<div className="flex flex-col items-center justify-center gap-8 min-w-[120px] flex-shrink-0">
					<div className="flex flex-col items-center text-center max-w-[160px]">
						<Hammer className="w-10 h-10 text-yellow-900 fill-current mb-2" />
						<p
							className="text-black font-bold drop-shadow leading-tight"
							style={{
								textShadow: "1px 1px 2px rgba(255,255,255,0.6)",
							}}
						>
							Livelihood & Skill
							<br /> Development
						</p>
					</div>
					<div className="flex flex-col items-center text-center max-w-[160px]">
						<HeartHandshake className="w-10 h-10 text-green-600 fill-current mb-2" />
						<p
							className="text-black font-bold drop-shadow leading-tight"
							style={{
								textShadow: "1px 1px 2px rgba(255,255,255,0.6)",
							}}
						>
							Emotional Support
							<br /> & Counseling
						</p>
					</div>
				</div>
			</div>

			{/* Background Image (Bottom) */}
			<div className="absolute bottom-0 left-0 top-0 w-full z-0 hidden lg:block">
				<Image
					src={`${STATIC_IMAGE_HOST}sakhi-aid/village-bg.webp`}
					alt="Village Background"
					width={1200}
					height={400}
					className="w-full object-cover"
				/>
			</div>
		</section>
	);
}
