import React from "react";
import Image from "next/image";
function Corevalues() {
	return (
		<div>
			<section
				id="core"
				className="px-6 py-12 bg-[url('/background.webp')]  sm:bg-[url('/background.webp')] bg-no-repeat    bg-cover bg-center"
			>
				<h2 className="text-3xl font-bold text-blue-500 mb-6">
					Core Values
				</h2>
				<div className="flex flex-row justify-between">
					<ul className="space-y-6">
						<li>
							<h3 className="text-lg font-bold ">GODLIKE</h3>
							<p>
								We serve with divine compassion, honoring the
								worth of every person.
							</p>
						</li>
						<li>
							<h3 className="text-lg font-bold ">CHILDLIKE</h3>
							<p>
								We live with wonder, humility, and a deep
								dependence on values greater than ourselves.
							</p>
						</li>
						<li>
							<h3 className="text-lg font-bold">INTEGRITY</h3>
							<p>
								We uphold honesty and accountability in all that
								we do.
							</p>
						</li>
						<li>
							<h3 className="text-lg font-bold">
								RESTORING THE BROKEN
							</h3>
							<p>
								We address the physical, emotional, and
								spiritual needs of those who are overlooked or
								suffering.
							</p>
						</li>
						<li>
							<h3 className="text-lg font-bold ">
								INTENTIONAL RELATIONSHIPS
							</h3>
							<p>
								We build authentic, trust-based partnerships to
								amplify our collective impact.
							</p>
						</li>
					</ul>
					<Image
						src="/coreval.webp"
						alt="core values"
						width={500}
						height={400}
						className=" block sm:block pr-8 w-full max-w-sm h-auto"
					/>
				</div>
			</section>
		</div>
	);
}

export default Corevalues;
