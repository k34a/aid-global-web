import { Heart } from "lucide-react";
export default function Visionsection() {
	return (
		<section className="bg-[#f0f8ff]/40 py-6">
			<div className="max-w-4xl mx-auto px-6 text-center">
				<h2 className="text-2xl md:text-3xl font-extrabold text-[#004466] mb-6 flex items-center justify-center gap-2">
					<Heart className="w-7 h-7 fill-orange-400 text-orange-400" />
					<span>Our Vision</span>
				</h2>

				<p className="text-lg md:text-xl text-[#003355] leading-relaxed">
					To eliminate child illiteracy and restore dignity among the
					most vulnerable—
					<span className="font-semibold text-orange-400">
						street-connected children, migrant youth, and school
						dropouts
					</span>
					—by ensuring they receive the education they deserve.
				</p>
			</div>
		</section>
	);
}
