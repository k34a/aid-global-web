import React from "react";
import Image from "next/image";

function Corevalues() {
	return (
		<div>
			<section
				id="core"
				className="px-4 py-12 bg-[url('/background.webp')] mx-20 gap-10 bg-no-repeat bg-cover bg-center"
			>
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
						Core Values
					</h2>

					<div className="flex flex-col lg:flex-row items-center gap-y-10 lg:gap-x-12">
						<div className="w-full lg:w-1/2">
							<ul className="space-y-6 text-base sm:text-lg text-gray-800">
								<li>
									<h3 className="text-lg font-bold text-blue-600">
										GODLIKE
									</h3>
									<p>
										We serve with divine compassion,
										honoring the worth of every person.
									</p>
								</li>
								<li>
									<h3 className="text-lg font-bold text-blue-600">
										CHILDLIKE
									</h3>
									<p>
										We live with wonder, humility, and a
										deep dependence on values greater than
										ourselves.
									</p>
								</li>
								<li>
									<h3 className="text-lg font-bold text-blue-600">
										INTEGRITY
									</h3>
									<p>
										We uphold honesty and accountability in
										all that we do.
									</p>
								</li>
								<li>
									<h3 className="text-lg font-bold text-blue-600">
										RESTORING THE BROKEN
									</h3>
									<p>
										We address the physical, emotional, and
										spiritual needs of those who are
										overlooked or suffering.
									</p>
								</li>
								<li>
									<h3 className="text-lg font-bold text-blue-600">
										INTENTIONAL RELATIONSHIPS
									</h3>
									<p>
										We build authentic, trust-based
										partnerships to amplify our collective
										impact.
									</p>
								</li>
							</ul>
						</div>

						<div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
							<div className="w-64 sm:w-80 md:w-96">
								<Image
									src="/whoweare/coreval.webp"
									alt="core values"
									width={400}
									height={400}
									className="w-full h-auto object-contain rounded-lg shadow-lg"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Corevalues;
