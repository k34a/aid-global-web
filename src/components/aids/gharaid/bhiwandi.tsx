import React from "react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
import {
	Home,
	HeartPulse,
	Users,
	Baby,
	BookOpenText,
	ShieldCheck,
	TreePalm,
	UtensilsCrossed,
} from "lucide-react";

function Bhiwandi() {
	return (
		<div className="bg-gradient-to-br from-sky-100 to-slate-50 py-10 px-6 sm:px-10 md:px-16 lg:px-24 font-serif">
			<div className="max-w-7xl mx-auto text-center">
				<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sky-800 mb-3">
					Permanent Shelter Home In Bhiwandi
				</h2>
				<p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
					While rescue operations are conducted throughout
					Maharashtra, we are building a permanent shelter home in
					Bhiwandi to care for all rescued individuals.
				</p>
			</div>

			<div className="mt-16 flex flex-col lg:flex-row gap-12 items-stretch">
				<div className="w-full lg:w-1/2 flex justify-center">
					<div className="w-full h-full">
						<Image
							src={`${STATIC_IMAGE_HOST}ghar-aid/gharAid-3.webp`}
							alt="Shelter Home"
							width={700}
							height={700}
							className="rounded-xl shadow-xl object-cover w-full h-full"
						/>
					</div>
				</div>

				<div className="w-full lg:w-1/2 flex flex-col justify-between space-y-10">
					<div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
						<h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-4">
							Separate Units For
						</h3>
						<ul className="space-y-3 text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
							<li className="flex items-start gap-3">
								<Home className="w-5 h-5 text-sky-600 mt-1" />
								Homeless men and women
							</li>
							<li className="flex items-start gap-3">
								<Users className="w-5 h-5 text-sky-600 mt-1" />
								Elderly individuals
							</li>
							<li className="flex items-start gap-3">
								<Baby className="w-5 h-5 text-sky-600 mt-1" />
								Orphaned and abandoned children
							</li>
							<li className="flex items-start gap-3">
								<HeartPulse className="w-5 h-5 text-sky-600 mt-1" />
								Medical care and psychological support rooms
							</li>
						</ul>
					</div>

					<div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
						<h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-4">
							Additional Facilities
						</h3>
						<ul className="space-y-3 text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
							<li className="flex items-start gap-3">
								<BookOpenText className="w-5 h-5 text-sky-600 mt-1" />
								Learning and activity spaces
							</li>
							<li className="flex items-start gap-3">
								<UtensilsCrossed className="w-5 h-5 text-sky-600 mt-1" />
								Clean bathrooms and hygienic kitchens
							</li>
							<li className="flex items-start gap-3">
								<TreePalm className="w-5 h-5 text-sky-600 mt-1" />
								Outdoor healing gardens
							</li>
							<li className="flex items-start gap-3">
								<ShieldCheck className="w-5 h-5 text-sky-600 mt-1" />
								24/7 safety, supervision, and care
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bhiwandi;
