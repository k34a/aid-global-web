import { BookOpenCheck } from "lucide-react";
import Image from "next/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
export default function Introsection() {
	return (
		<section className="max-w-6xl mx-auto px-6 py-16 text-[#003366]">
			<h2 className="text-2xl md:text-3xl font-extrabold text-center text-orange-500 mb-10 leading-tight">
				Restoring Childhoods. Rebuilding Futures.
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[papayawhip]/60 p-8 rounded-3xl shadow-lg transition-all duration-300">
				<div className="space-y-6 text-[1.05rem] md:text-[1.1rem] leading-relaxed">
					<p>
						At{" "}
						<strong className="text-[#004466]">
							Aid Global Foundation
						</strong>
						, we believe that education is not a privilege — it is a
						basic right. Yet, for thousands of children living on
						the streets, in slums, construction sites, and migrating
						families, education remains out of reach.
					</p>
					<p>
						These are the children we serve — migrants, dropouts,
						street-connected youth, and vulnerable children who are
						often forced into child labor, begging, or early
						marriage due to extreme poverty and neglect.
					</p>
					<div className="space-y-3">
						<h3 className="text-2xl font-bold text-[#004466] flex items-center gap-2">
							<BookOpenCheck className="w-7 h-7 text-orange-500" />
							<span>
								What Is{" "}
								<span className="text-[#006699]">
									ShikshaAid?
								</span>
							</span>
						</h3>
						<p>
							<span className="font-semibold text-[#004466]">
								ShikshaAid
							</span>{" "}
							is Aid Global Foundation’s education-focused
							initiative that brings learning directly to
							underserved children in urban slums, railway
							stations, construction zones, and migrant
							communities.
						</p>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<Image
						src={`${STATIC_IMAGE_HOST}shiksha-aid/shiksha1.webp`}
						alt="Shiksha Aid Center"
						width={300}
						height={500}
						className="w-[350px] h-[400px] object-cover rounded-tr-[6rem] rounded-bl-[6rem] rounded-tl-sm rounded-br-sm shadow-lg transition-transform duration-300 hover:scale-105"
					/>
				</div>
			</div>
			<div className="mt-12 max-w-3xl mx-auto bg-sky-50 border-l-4 border-sky-400 rounded-xl p-6 shadow-md">
				<p className="text-lg font-semibold text-[#003366] text-center">
					Our mission is simple:
				</p>
				<p className="text-[#006699] font-bold text-lg pt-2 leading-relaxed text-center">
					To find these children. To support them. And to help them
					learn.
				</p>
			</div>
		</section>
	);
}
