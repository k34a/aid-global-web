import Image from "next/image";
import { Eye } from "lucide-react";
import { STATIC_IMAGE_HOST } from "@/config/config";
import Link from "next/link";
export default function VisionAidHero() {
	return (
		<section className="relative w-full overflow-hidden">
			{/* Background Split */}
			<div className="absolute inset-0 z-0 flex flex-col sm:flex-row">
				<div className="w-full sm:w-2/3 h-1/2 sm:h-full bg-[#f6f3fc] " />
				<div className="hidden sm:block sm:w-1/3 sm:h-full bg-[#cfb4f5]" />
			</div>

			{/* Main Content */}
			<div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 sm:py-20 gap-12">
				{/* Text Side */}
				<div className="w-full md:w-1/2 text-gray-800 space-y-6">
					{/* Tagline */}
					<p className="text-sm font-semibold uppercase tracking-wide text-[#6a1e55] border-l-4 pl-3 border-[#6a1e55]">
						&ldquo;Restoring Sight. Renewing Hope.&rdquo;
					</p>

					{/* Heading */}
					<h1 className="text-4xl  font-extrabold leading-snug text-[#2f194d]">
						VisionAid - A Life-Changing Initiative by{" "}
						<span className="text-[#5d3dc4]">
							Aid Global Foundation
						</span>
					</h1>

					{/* Sub Quote */}
					<p className="text-lg text-[#6a1e55] font-medium italic">
						&ldquo;Clear Sight is a Clear Right.&rdquo;
					</p>

					{/* CTA */}
					<Link
						href="/donate?program=vision-aid"
						className="w-fit mt-4 px-8 py-3 rounded-full bg-[#6a1e55] hover:bg-[#5d3dc4] text-white font-semibold shadow-lg transition-transform transform hover:scale-105 duration-300 flex items-center gap-2"
					>
						<Eye className="w-5 h-5" />
						Be Their Vision
					</Link>
				</div>

				{/* Image Side */}
				<div className="w-full md:w-1/2 flex justify-center relative">
					<div className="relative w-[500px] h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
						<Image
							src={`${STATIC_IMAGE_HOST}vision-aid/vision.webp`}
							alt="VisionAid Hero"
							fill
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
