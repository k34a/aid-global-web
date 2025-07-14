import React from "react";
import { STATIC_IMAGE_HOST } from "@/config/config";
function Yourhelp() {
	return (
		<div
			className="relative font-serif mx-4 sm:mx-6 md:mx-10 lg:mx-16 py-20 mt-8 rounded-2xl overflow-hidden  bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: `url(${STATIC_IMAGE_HOST}ghar-aid/help.webp)`,
			}}
		>
			<div className="absolute inset-0 bg-black/60 backdrop-brightness-75"></div>

			<div className="relative z-10 text-white text-center space-y-10">
				<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-md">
					How You Can Help
				</h2>

				<div className="flex justify-center px-4">
					<div className="bg-white/90 text-black rounded-xl p-6 sm:p-8 max-w-4xl w-full shadow-2xl space-y-6 text-left">
						<h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
							GharAid invites everyone to be a part of this
							transformation. You can:
						</h3>

						<ul className="list-disc list-inside space-y-3 text-base sm:text-lg leading-relaxed">
							<li>Donate for food, shelter, or medicines</li>
							<li>Sponsor a child, elderly person, or patient</li>
							<li>
								Volunteer in rescue operations, teaching, or
								healthcare
							</li>
							<li>
								Support infrastructure: Help us acquire land and
								build better facilities in Bhiwandi
							</li>
							<li>
								Partner with us for CSR or NGO collaborations
							</li>
						</ul>
					</div>
				</div>

				<p className="text-lg sm:text-xl font-medium px-6 sm:px-16 leading-relaxed">
					Lets build homes of hope {"-"}starting from{" "}
					<span className="font-semibold ">Bhiwandi</span>, reaching
					across Maharashtra.
					<br />
					<span className="text-white/90 font-semibold">
						Together, we can bring dignity back to every life.
					</span>
				</p>
			</div>
		</div>
	);
}

export default Yourhelp;
