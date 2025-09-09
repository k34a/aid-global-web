import Image from "@/components/image";
import { Eye } from "lucide-react";
import { STATIC_IMAGE_HOST } from "@/config/config";
import Link from "next/link";
import { Button } from "@mantine/core";
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
					<Button
						component={Link}
						href="/donate?program=vision-aid"
						variant="filled"
						radius="xl"
						size="md"
						leftSection={<Eye size={18} />}
						styles={{
							root: {
								backgroundColor: "#6a1e55",
								"&:hover": { backgroundColor: "#5d3dc4" },
							},
						}}
					>
						Be Their Vision
					</Button>
				</div>

				{/* Image Side */}
				<div className="w-full md:w-1/2 flex justify-center relative">
					<div className="relative w-[500px] h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
						<Image
							src={`${STATIC_IMAGE_HOST}vision-aid/visionAid-2.webp`}
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
