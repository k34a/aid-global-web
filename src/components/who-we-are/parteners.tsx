import React from "react";
import Image from "next/image";
import { partners } from "@/config/partners";

function Parteners() {
	return (
		<div>
			<section id="partners" className="px-3 py-6 sm:px-6 sm:py-12">
				<h2 className="text-center text-3xl sm:text-4xl font-bold text-blue-800 mb-6 sm:mb-10">
					Our Partners
				</h2>

				<div className="p-4 sm:p-6 rounded-xl shadow-lg flex flex-wrap justify-center gap-4 sm:gap-6">
					{partners.map((partner, index) => (
						<div
							key={index}
							className="p-2 sm:p-3 bg-white rounded-lg shadow-md hover:shadow-xl"
						>
							<Image
								src={partner.imageSrc}
								alt={partner.name}
								width={100}
								height={100}
								className="object-contain h-20 w-20 sm:h-32 sm:w-32"
							/>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

export default Parteners;
