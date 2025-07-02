import { Bike } from "lucide-react";
export default function Campaignsection() {
	return (
		<section className="py-8 bg-[#e6faff]">
			<div className="max-w-5xl mx-auto px-6 text-center">
				<div className="inline-flex items-center gap-3 mb-6 justify-center">
					<h2 className="flex text-3xl font-extrabold text-[#003366]">
						<Bike className="w-20 h-20 sm:w-10 sm:h-10 text-[#007799]" />{" "}
						Let’s reCYCLE – A Bicycle Can Change Her Future
					</h2>
				</div>
				<p className="text-lg text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
					Launched on{" "}
					<span className="font-semibold text-orange-400">
						Women’s Day 2022
					</span>
					, this campaign supports girl students in tribal and remote
					areas who walk{" "}
					<span className="font-semibold text-[#007799]">
						8–10 km daily
					</span>{" "}
					to attend school.
				</p>
				<p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
					Your donation of a{" "}
					<span className="font-semibold text-[#004466]">
						new or pre-loved bicycle
					</span>{" "}
					can eliminate that barrier—and open the road to education.
				</p>
			</div>
		</section>
	);
}
