import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";

export const visionVanSteps = [
	{
		id: "01",
		title: "Conduct eye check-ups in remote villages",
	},
	{
		id: "02",
		title: "Provide on-the-spot glasses and treatment",
	},
	{
		id: "03",
		title: "Screen and refer cataract cases",
	},
	{
		id: "04",
		title: "Bring hope directly to the doorstep",
	},
];

export default function VisionVanSection() {
	return (
		<section className="bg-white py-5 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
			<div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-md">
				<Image
					src={`${STATIC_IMAGE_HOST}vision-aid/visionAid-1.webp`}
					alt="Vision Van Service"
					fill
					className="object-cover rounded-xl"
				/>
			</div>
			<div>
				<h2 className="text-3xl sm:text-4xl font-semibold text-[#1a1a1d] mb-3">
					Urgent Need:{" "}
					<span className="font-medium text-[#5d3dc4]">
						Vision Van
					</span>
				</h2>
				<p className="text-gray-700 text-base max-w-xl mb-4">
					To{" "}
					<span className="font-medium text-[#5d3dc4]">
						reach the unreached
					</span>
					,{" "}
					<strong>
						VisionAid urgently requires a fully equipped Mobile Eye
						Care Van
					</strong>
					.
				</p>
				<p className="text-gray-700 text-base max-w-xl mb-6">
					This <strong>Vision Van</strong> will allow our team to:
				</p>
				<div className="space-y-8">
					{visionVanSteps.map(({ id, title }) => (
						<div
							key={id}
							className="flex items-start gap-4 pb-4 border-b-1 border-black/40 last:border-b-0"
						>
							<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#e8d9f1] text-[#5d3dc4] font-bold flex items-center justify-center text-sm shrink-0">
								{id}
							</div>
							<div className="flex-1">
								<h3 className="text-lg font-semibold flex items-center gap-2 text-[#1a1a1d] mb-1">
									{title}
								</h3>
							</div>
						</div>
					))}
				</div>
				<p className="text-gray-700 text-base max-w-xl mt-2">
					Your support can put this mobile unit on the road - and
					bring sight where hospitals don&apos;t reach.
				</p>
			</div>
		</section>
	);
}
