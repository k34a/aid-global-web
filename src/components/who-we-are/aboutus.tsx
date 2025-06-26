import React from "react";

function Aboutus() {
	return (
		<div>
			<section id="aboutus" className="pl-6 pr-4 mt-16">
				<h2 className="text-4xl font-bold text-blue-800 mb-6">
					About Us
				</h2>
				<div className="flex flex-col  lg:flex-row justify-between gap-6">
					<p>
						Our grassroots work is powered by purpose and designed
						for long-term impact. We operate directly within
						communities through a range of focused,
						life-transforming initiatives:
					</p>
					<p>
						We are driven by compassion, accountability, and a deep
						respect for human dignity. Every program, clinic, and
						partnership is a step forward in our mission to create a
						world where aid is delivered with heart and impact is
						made with purpose.
					</p>
				</div>
				<ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 mt-6 pl-6 list-disc">
					<li>
						<strong>ShikshaAid</strong> – Education for
						underprivileged children
					</li>
					<li>
						<strong>VisionAid</strong> – Eye care and vision
						restoration
					</li>
					<li>
						<strong>EnableAid</strong> – Empowering
						differently-abled individuals
					</li>
					<li>
						<strong>GharAid</strong> – Shelter for homeless/orphaned
						people
					</li>
					<li>
						<strong>CureAid</strong> – Primary healthcare services
					</li>
					<li>
						<strong>SakhiAid</strong> – Women’s empowerment
						initiatives
					</li>
				</ul>
			</section>
		</div>
	);
}

export default Aboutus;
