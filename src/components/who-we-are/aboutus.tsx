import React from "react";

function Aboutus() {
	return (
		<section
			id="aboutus"
			className="pl-2 pr-2 mt-8 sm:pl-6 sm:pr-4 sm:mt-16 mx-14"
		>
			<h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4 sm:mb-6">
				About Us
			</h2>

			<div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 lg:gap-32">
				<p className="text-sm sm:text-base">
					Our grassroots work is powered by purpose and designed for
					long-term impact. We operate directly within communities
					through a range of focused, life-transforming initiatives:
					We are driven by compassion, accountability, and a deep
					respect for human dignity. Every program, clinic, and
					partnership is a step forward in our mission to create a
					world where aid is delivered with heart and impact is made
					with purpose.
				</p>
			</div>

			<ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mt-4 sm:mt-6 pl-4 sm:pl-6 list-disc text-sm sm:text-base">
				<li>
					<strong>ShikshaAid</strong> &ndash;Education for
					underprivileged children
				</li>
				<li>
					<strong>VisionAid</strong> &ndash; Eye care and vision
					restoration
				</li>
				<li>
					<strong>EnableAid</strong> &ndash; Empowering
					differently-abled individuals
				</li>
				<li>
					<strong>GharAid</strong> &ndash; Shelter for
					homeless/orphaned people
				</li>
				<li>
					<strong>CureAid</strong> &ndash; Primary healthcare services
				</li>
				<li>
					<strong>SakhiAid</strong> &ndash; Women&apos;s empowerment
					initiatives
				</li>
				<li>
					<strong>HungerAid</strong> &ndash; Nutritious meals and
					grocery support
				</li>
			</ul>
		</section>
	);
}

export default Aboutus;
